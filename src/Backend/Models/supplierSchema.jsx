import mongoose from 'mongoose';

// Definindo o esquema para fornecedores
const supplierSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cnpj: { type: String, required: true },
  endereco: String,
  telefone: String,
  email: String,
  id: String,
}, { collection: 'suppliers' }); // Especificando a coleção 'suppliers'

const Supplier = mongoose.model('Supplier', supplierSchema);

export default Supplier;
