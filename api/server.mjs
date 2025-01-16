import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = 3001;

// Configuração do MongoDB
// Configuração do MongoDB
mongoose
  .connect(process.env.MONGO_URI, { // Usando a variável de ambiente
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

// -----------------------------------------
// Definição dos Schemas e Modelos
// -----------------------------------------

// Modelo de Cliente
const clientSchema = new mongoose.Schema({
  nome: String,
  tipo: String,
  situacao: String,
  telefone: String,
  celular: String,
  email: String,
  cadastradoEm: Date,
  idade: String,
  fax: String,
  anexo: String,
});
const Client = mongoose.model('Client', clientSchema);

// -----------------------------------------
// Rotas para Clientes
// -----------------------------------------

// Listar clientes
app.get('/clientes', async (_req, res) => {
  try {
    const clients = await Client.find();
    const clientsWithId = clients.map((client) => ({
      id: client._id.toString(),
      ...client.toObject(),
    }));
    res.json(clientsWithId);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar clientes', error: err });
  }
});

// Criar cliente
app.post('/clientes', async (req, res) => {
  const newClient = new Client(req.body);
  try {
    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar cliente', error: err.message });
  }
});

// Atualizar cliente
app.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const updatedClient = req.body;
  try {
    const result = await Client.findByIdAndUpdate(id, updatedClient, { new: true });
    if (!result) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar cliente', error: err });
  }
});

// Deletar cliente
app.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Client.findByIdAndDelete(id);
    res.json({ message: 'Cliente deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar cliente', error: err });
  }
});

// -----------------------------------------
// Iniciar o servidor
// -----------------------------------------
app.listen(port, () => {
  console.log(`Servidor backend rodando na porta ${port}`);
});
