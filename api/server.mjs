import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch((err) => {
    console.error('Erro ao conectar com o MongoDB:', err.message);
    process.exit(1); // Encerra o processo em caso de falha na conexão
  });

// Middlewares globais
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Schema e Modelo do Cliente
const clientSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tipo: { type: String, enum: ['Pessoa Física', 'Pessoa Jurídica'], required: true },
  situacao: { type: String, enum: ['Ativo', 'Inativo'], required: true },
  telefone: { type: String },
  celular: { type: String },
  email: { type: String, validate: /.+\@.+\..+/ },
  cadastradoEm: { type: Date, default: Date.now },
  idade: { type: Number },
  fax: { type: String },
  anexo: { type: String },
});
const Client = mongoose.model('Client', clientSchema);

// Rotas para CRUD de Clientes

// Listar clientes
app.get('/clientes', async (_req, res) => {
  try {
    const clients = await Client.find();
    res.json(
      clients.map((client) => ({
        id: client._id.toString(),
        ...client.toObject(),
      }))
    );
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar clientes', error: err.message });
  }
});

// Criar cliente
app.post('/clientes', async (req, res) => {
  try {
    const { nome, tipo, situacao, email } = req.body;

    // Validações básicas
    if (!nome || !tipo || !situacao) {
      return res.status(400).json({
        message: 'Os campos "nome", "tipo" e "situacao" são obrigatórios.',
      });
    }

    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar cliente', error: err.message });
  }
});

// Atualizar cliente
app.put('/clientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedClient = req.body;

    // Atualização e validação
    const client = await Client.findByIdAndUpdate(id, updatedClient, { new: true });
    if (!client) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    res.json(client);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar cliente', error: err.message });
  }
});

// Deletar cliente
app.delete('/clientes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    res.json({ message: 'Cliente deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar cliente', error: err.message });
  }
});

// Rota de fallback para APIs desconhecidas
app.use((_req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor backend rodando em: http://localhost:${port}`);
});
