import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
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

// Definir o schema e o modelo para Fornecedor
const fornecedorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cnpj: { type: String, required: true },
  telefone: { type: String, required: true },
  email: { type: String, required: true },
  endereco: { type: String, required: true },
  numero: { type: Number, required: true },
  bairro: { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
  status: { type: String, default: 'ativo' },
  dataCadastro: { type: Date, default: Date.now },
});

const Fornecedor = mongoose.model('Fornecedor', fornecedorSchema);

// Rotas para Fornecedores

// Listar fornecedores
app.get('/fornecedores', async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  try {
    const fornecedores = await Fornecedor.find()
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));
    const total = await Fornecedor.countDocuments();

    const fornecedoresWithId = fornecedores.map((fornecedor) => ({
      id: fornecedor._id.toString(),
      ...fornecedor.toObject(),
    }));

    res.json({ data: fornecedoresWithId, total });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar fornecedores', error: err });
  }
});

// Criar fornecedor
app.post('/fornecedores', async (req, res) => {
  const newFornecedor = new Fornecedor(req.body);
  try {
    await newFornecedor.save();
    res.status(201).json(newFornecedor);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar fornecedor', error: err.message });
  }
});

// Atualizar fornecedor
app.put('/fornecedores/:id', async (req, res) => {
  const { id } = req.params;
  const updatedFornecedor = req.body;
  try {
    const result = await Fornecedor.findByIdAndUpdate(id, updatedFornecedor, { new: true });
    if (!result) {
      return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar fornecedor', error: err });
  }
});

// Deletar fornecedor
app.delete('/fornecedores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Fornecedor.findByIdAndDelete(id);
    res.json({ message: 'Fornecedor deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar fornecedor', error: err });
  }
});

// Exportar como função serverless
export default (req, res) => {
  app(req, res);
};
