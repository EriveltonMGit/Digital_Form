// import mongoose from 'mongoose';

// // Definindo o esquema para fornecedores
// const supplierSchema = new mongoose.Schema({
//   nome: { type: String, required: true },
//   cnpj: { type: String, required: true },
//   endereco: String,
//   telefone: String,
//   email: String,
//   id: String,
// }, { collection: 'suppliers' }); // Especificando a coleção 'suppliers'

// const Supplier = mongoose.model('Supplier', supplierSchema);

// export default Supplier;
const SupplierSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cnpj: { type: String },
  telefone: { type: String },
  endereco: { type: String },
  numero: { type: Number },
  bairro: { type: String },
  cidade: { type: String },
  estado: { type: String },
  dataCadastro: { type: Date, default: Date.now },
});

// Quando a data de cadastro for recebida no corpo da requisição, use-a
SupplierSchema.pre('save', function(next) {
  if (this.dataCadastro) {
    this.dataCadastro = new Date(this.dataCadastro); // Garante que a data seja convertida corretamente
  }
  next();
});

const Supplier = mongoose.model("Supplier", SupplierSchema);
module.exports = Supplier;
