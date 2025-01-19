import mongoose from 'mongoose';

// Definindo o schema da marca
const brandSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: true 
  },
  descricao: { 
    type: String, 
    required: true 
  },
  imagem: { 
    type: String, 
    default: null  // Caminho da imagem da marca (opcional)
  },
  // Caso queira adicionar mais campos no futuro, como status ou data de criação:
  status: {
    type: String,
    enum: ['ativa', 'inativa'],
    default: 'ativa'  // Exemplo de status para a marca
  },
  cadastradoEm: { 
    type: Date, 
    default: Date.now 
  }
});

// Criando o modelo para a marca
const Brand = mongoose.model('Brand', brandSchema);

export default Brand;
