const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  preco: { type: Number, required: true },
  quantidade: { type: Number, required: true },
  categoria: { type: String, required: true },
  status: { type: String, required: true },
  desconto: { type: Number, default: 0 }, // Desconto em percentual
  peso: { type: Number, default: 0 }, // Peso do produto em kg
  cadastradoEm: { type: Date, default: Date.now }, // Data de cadastro
  imagem: { type: String, required: false },  // Novo campo para armazenar a URL da imagem
});

module.exports = mongoose.model("Product", ProductSchema);
