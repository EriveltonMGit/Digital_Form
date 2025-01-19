import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tipo: { type: String, required: true },
  situacao: { type: String, required: true },
  telefone: { type: String, required: true },
  celular: { type: String, required: true },
  email: { type: String, required: true },
  cadastradoEm: { type: Date, default: Date.now },
  idade: { type: String },  // Verifique que o tipo está como String
  fax: { type: String },
  anexo: { type: String },
});

export default mongoose.model("Employee", employeeSchema);
