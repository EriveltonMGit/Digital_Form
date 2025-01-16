import express from 'express';
import Client from '../Models/clientModel';  // Certifique-se de que o caminho do modelo está correto

const router = express.Router();

// Gerar um ID simples e incremental
let clientIdCounter = 1;  // Inicializamos o contador

// Criar cliente
router.post("/", async (req, res) => {
  try {
    // Criando um novo ID para o cliente com um formato simples de 5 caracteres
    const newClient = new Client({
      ...req.body,
      id: `C-${String(clientIdCounter++).padStart(5, '0')}`,  // Garantindo que o ID tenha 5 caracteres
    });
    
    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ message: "Erro ao criar cliente" });
  }
});

// Obter todos os clientes
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(400).json({ message: "Erro ao buscar clientes" });
  }
});

// Atualizar cliente
router.put("/:id", async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedClient);
  } catch (err) {
    res.status(400).json({ message: "Erro ao atualizar cliente" });
  }
});

// Deletar cliente
router.delete("/:id", async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Cliente deletado com sucesso!" });
  } catch (err) {
    res.status(400).json({ message: "Erro ao deletar cliente" });
  }
});

export default router;
