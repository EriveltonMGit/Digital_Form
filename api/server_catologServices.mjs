import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3006;

// Configuração do MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => {
    console.error("Erro na conexão com o MongoDB", err);
    process.exit(1); // Sai do processo se a conexão falhar
  });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Definição do Schema e Modelo de Serviços
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, default: "Sem descrição" },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  message: { type: String, required: false }, // Novo campo opcional
  serviceName: { type: String, required: false }, // Novo campo opcional
});

const ServiceRequest = mongoose.model("ServiceRequest", serviceSchema);

// Rotas para Serviços
app.post("/services", async (req, res) => {
  const { name, email, description, price, message, serviceName } = req.body;
  if (!name || !email || !price) {
    return res
      .status(400)
      .json({ message: "Campos obrigatórios estão faltando" });
  }

  const newService = new ServiceRequest({
    name,
    email,
    description,
    price,
    message,
    serviceName,
  });

  try {
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    console.error("Erro ao salvar serviço:", err);
    res
      .status(500)
      .json({ message: "Erro ao salvar serviço", error: err.message });
  }
});

// Listar serviços
app.get("/services", async (_req, res) => {
  try {
    const services = await ServiceRequest.find();
    res.json(services);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao buscar serviços", error: err.message });
  }
});

// Atualizar serviço
app.put("/services/:id", async (req, res) => {
  const { id } = req.params;
  const updatedService = req.body;

  try {
    const result = await ServiceRequest.findByIdAndUpdate(id, updatedService, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar serviço", error: err.message });
  }
});

// Deletar serviço
app.delete("/services/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await ServiceRequest.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }
    res.json({ message: "Serviço deletado com sucesso" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao deletar serviço", error: err.message });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor backend rodando na porta ${port}`);
});
