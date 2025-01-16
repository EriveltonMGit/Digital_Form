const clientSchema = new mongoose.Schema({
  nome: String,
  tipo: String,
  situacao: String,
  telefone: String,
  celular: String,
  email: String,
  cadastradoEm: Date,
  idade: String,
  fax: String,
  anexo: String,
});

export default mongoose.model('Client', clientSchema);
