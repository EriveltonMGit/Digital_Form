const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tipo: { type: String, required: true },
  situacao: { type: String, required: true },
  telefone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  idade: { type: Number, min: 0, max: 150, required: false }, // Validação adicional
  fax: { type: String, required: false },  // Campo opcional, sem validação
  cadastradoEm: { type: Date, default: Date.now }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
