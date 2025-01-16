import express from 'express';
import Supplier from '../Models/supplierModel';  // Certifique-se de que o caminho do modelo está correto

const router = express.Router();

// Gerar um ID simples e incremental
let supplierIdCounter = 1;  // Inicializamos o contador

// Criar fornecedor
router.post("/", async (req, res) => {
  try {
    // Criando um novo ID para o fornecedor com um formato simples de 5 caracteres
    const newSupplier = new Supplier({
      ...req.body,
      id: `F-${String(supplierIdCounter++).padStart(5, '0')}`,  // Garantindo que o ID tenha 5 caracteres
    });

    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (err) {
    res.status(400).json({ message: "Erro ao criar fornecedor" });
  }
});

// Obter todos os fornecedores
router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(400).json({ message: "Erro ao buscar fornecedores" });
  }
});

// Atualizar fornecedor
router.put("/:id", async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedSupplier);
  } catch (err) {
    res.status(400).json({ message: "Erro ao atualizar fornecedor" });
  }
});

// Deletar fornecedor
router.delete("/:id", async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Fornecedor deletado com sucesso!" });
  } catch (err) {
    res.status(400).json({ message: "Erro ao deletar fornecedor" });
  }
});

export default router;
