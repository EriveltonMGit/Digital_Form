import express from 'express';
import ServiceRequest from './models/serviceModel'; // Ajuste o caminho conforme necessário

const router = express.Router(); // Criação do roteador

router.post('/services', async (req, res) => {
  const { name, email, message, serviceName, description, price } = req.body;

  // Validação simples para garantir que todos os campos foram recebidos
  if (!name || !email || !message || !serviceName || !description || !price) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  const newRequest = new ServiceRequest({ 
    name, 
    email, 
    message, 
    serviceName, 
    description, 
    price 
  });

  try {
    // Salvando a nova solicitação no MongoDB
    const savedRequest = await newRequest.save();
    res.status(201).json({
      success: true,
      message: 'Solicitação criada com sucesso',
      data: savedRequest // Retorna a solicitação salva
    });
  } catch (err) {
    console.error("Erro ao salvar solicitação:", err);
    res.status(500).json({ message: 'Erro ao salvar solicitação', error: err.message });
  }
});

export default router; // Exportação correta do router
