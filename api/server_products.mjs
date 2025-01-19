import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs'; 
import dotenv from 'dotenv';

dotenv.config();

// Configuração do armazenamento de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Note que isso pode não funcionar no Vercel
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const app = express();

// Configuração do MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => {
    console.error('Erro na conexão com o MongoDB', err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Definir o schema e o modelo para Produto
const productSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  preco: { type: Number, required: true },
  quantidade: { type: Number, required: true },
  desconto: { type: Number, default: 0 },
  peso: { type: Number, default: 0 },
  categoria: { type: String, required: true },
  marca: { type: String, required: true }, // Adicionando campo marca
  status: { type: String, default: 'ativo' },
  dataCadastro: { type: Date, default: Date.now },
  imagem: { type: String }, // URL ou caminho para a imagem do produto
});

const Product = mongoose.model('Product', productSchema);

// Rota para criar um produto
app.post('/produtos', upload.single('imagem'), async (req, res) => {
  const { nome, descricao, preco, quantidade, desconto, peso, categoria, marca, status } = req.body;
  const imagem = req.file ? `/uploads/${req.file.filename}` : null;

  if (!imagem) {
    return res.status(400).json({ message: 'Imagem é obrigatória' });
  }

  // Criando o novo produto com o campo marca
  const novoProduto = new Product({
    nome,
    descricao,
    preco,
    quantidade,
    desconto,
    peso,
    categoria,
    marca, // Marca está sendo incluída aqui
    status,
    imagem,
  });

  try {
    await novoProduto.save();
    res.status(201).json(novoProduto);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar produto', error: err.message });
  }
});

// Rota para listar todos os produtos
app.get('/produtos', async (req, res) => {
  try {
    const produtos = await Product.find();
    const formattedProducts = produtos.map(product => ({
      ...product.toObject(),
      id: product._id.toString(),
    }));
    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
  }
});

// Rota para atualizar um produto
app.put('/produtos/:id', upload.single('imagem'), async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, quantidade, desconto, peso, categoria, marca, status } = req.body;

  try {
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    const updatedData = {
      nome,
      descricao,
      preco,
      quantidade,
      desconto,
      peso,
      categoria,
      marca,  // Atualizando a marca
      status,
    };

    if (req.file) {
      updatedData.imagem = `/uploads/${req.file.filename}`;
    } else {
      updatedData.imagem = existingProduct.imagem;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar produto', error: err.message });
  }
});

// Rota para deletar um produto
app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    if (deletedProduct.imagem) {
      const path = `uploads/${deletedProduct.imagem.split('/')[2]}`;
      console.log(`Tentando excluir a imagem do produto: ${path}`);
      fs.unlinkSync(path); // Isto pode não funcionar no Vercel
    }

    return res.status(200).json({ message: 'Produto excluído com sucesso' });

  } catch (err) {
    console.error('Erro ao excluir produto:', err);
    return res.status(500).json({ message: 'Erro ao excluir produto', error: err.message });
  }
});

// Exportar como função serverless
export default (req, res) => {
  app(req, res);
};
