// const clientSchema = new mongoose.Schema({
//   nome: String,
//   tipo: String,
//   situacao: String,
//   telefone: String,
//   celular: String,
//   email: String,
//   cadastradoEm: Date,
//   idade: String,
//   fax: String,
//   anexo: String,
// });

// export default mongoose.model('Client', clientSchema);
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tipo: { type: String, required: false },  // Opcional
  situacao: { type: String, required: false },  // Opcional
  telefone: { type: String, required: false },
  celular: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  idade: { type: Number, min: 0, required: false },  // Opcional
  fax: { type: String, required: false },  // Opcional
  cadastradoEm: { type: Date, default: Date.now }
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;


