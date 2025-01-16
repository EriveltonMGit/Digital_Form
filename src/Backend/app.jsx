import express from 'express';
import Supplier from '../models/Supplier';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar fornecedores', error: err });
  }
});

router.post('/', async (req, res) => {
  console.log('Recebido POST em /fornecedores:', req.body);
  const newSupplier = new Supplier(req.body);
  try {
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (err) {
    console.error('Erro ao salvar fornecedor:', err);
    res.status(500).json({ message: 'Erro ao salvar fornecedor', error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedSupplier = req.body;
  try {
    const result = await Supplier.findByIdAndUpdate(id, updatedSupplier, { new: true });
    if (!result) {
      return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar fornecedor', error: err });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Supplier.findByIdAndDelete(id);
    res.json({ message: 'Fornecedor deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar fornecedor', error: err });
  }
});

export default router;
