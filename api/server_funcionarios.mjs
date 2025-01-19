import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Configuração do MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => {
    console.error('Erro na conexão com o MongoDB', err);
    process.exit(1); // Sai do processo se a conexão falhar
  });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Definição do Schema e Modelo de Funcionário
const employeeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tipo: { type: String, required: true },
  situacao: { type: String, required: true },
  telefone: { type: String, required: true },
  celular: { type: String, required: true },
  email: { type: String, required: true },
  cadastradoEm: { type: Date, default: Date.now },
  idade: { type: String },
  fax: { type: String },
  anexo: { type: String },
});
const Employee = mongoose.model('Employee', employeeSchema);

// Rotas para Funcionários

// Listar funcionários
app.get('/funcionarios', async (_req, res) => {
  try {
    const employees = await Employee.find();
    const employeesWithId = employees.map((employee) => ({
      id: employee._id.toString(),
      ...employee.toObject(),
    }));
    res.json(employeesWithId);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar funcionários', error: err });
  }
});

// Criar funcionário
app.post('/funcionarios', async (req, res) => {
  const newEmployee = new Employee(req.body);
  try {
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar funcionário', error: err.message });
  }
});

// Atualizar funcionário
app.put('/funcionarios/:id', async (req, res) => {
  const { id } = req.params;
  const updatedEmployee = req.body;
  try {
    const result = await Employee.findByIdAndUpdate(id, updatedEmployee, { new: true });
    if (!result) {
      return res.status(404).json({ message: 'Funcionário não encontrado' });
    }
    res.json(result);  // Retorne o resultado atualizado
  } catch (err) {
    console.error('Erro ao atualizar funcionário:', err);
    res.status(500).json({ message: 'Erro ao atualizar funcionário', error: err.message });
  }
});

// Deletar funcionário
app.delete('/funcionarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndDelete(id);
    res.json({ message: 'Funcionário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar funcionário', error: err });
  }
});

// Exportar como função serverless
export default (req, res) => {
  app(req, res);
};
