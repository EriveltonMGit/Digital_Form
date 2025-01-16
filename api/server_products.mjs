import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from "multer";
import fs from 'fs'; // Substituindo o require por import
import dotenv from 'dotenv';
dotenv.config();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Diretório onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Configuração do MongoDB
mongoose
  .connect(process.env.MONGO_URI, { // Usando a variável de ambiente
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => {
    console.error('Erro na conexão com o MongoDB', err);
    process.exit(1); // Sai do processo se a conexão falhar
  });

const app = express();

// Habilitar CORS
app.use(cors());

// Configuração do Body Parser
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
  status: { type: String, default: 'ativo' },
  dataCadastro: { type: Date, default: Date.now },
  imagem: { type: String }, // URL ou caminho para a imagem do produto
});

// Criar o modelo Produto
const Product = mongoose.model('Product', productSchema);

// Rota para criar um produto
app.post('/produtos', upload.single('imagem'), async (req, res) => {
  const { nome, descricao, preco, quantidade, desconto, peso, categoria, status } = req.body;
  const imagem = req.file ? `/uploads/${req.file.filename}` : null;

  if (!imagem) {
    return res.status(400).json({ message: 'Imagem é obrigatória' });
  }

  const novoProduto = new Product({
    nome,
    descricao,
    preco,
    quantidade,
    desconto,
    peso,
    categoria,
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
      ...product.toObject(),  // Converte o produto para um objeto simples
      id: product._id.toString(), // Adiciona um campo `id` para compatibilidade
    }));
    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
  }
});

// Rota para atualizar um produto
app.put('/produtos/:id', upload.single('imagem'), async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, quantidade, desconto, peso, categoria, status } = req.body;

  try {
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // Atualizar dados do produto
    const updatedData = {
      nome,
      descricao,
      preco,
      quantidade,
      desconto,
      peso,
      categoria,
      status,
    };

    // Se uma nova imagem foi enviada
    if (req.file) {
      updatedData.imagem = `/uploads/${req.file.filename}`;
    } else {
      // Manter a imagem existente
      updatedData.imagem = existingProduct.imagem;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

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

    // Se o produto tiver uma imagem, remova-a fisicamente do diretório de uploads
    if (deletedProduct.imagem) {
      const path = `uploads/${deletedProduct.imagem.split('/')[2]}`;
      console.log(`Tentando excluir a imagem do produto: ${path}`);
      fs.unlinkSync(path); // Remove a imagem do servidor
    }

    // Após excluir o produto e a imagem, envie a resposta de sucesso
    return res.status(200).json({ message: 'Produto excluído com sucesso' });

  } catch (err) {
    console.error('Erro ao excluir produto:', err);
    return res.status(500).json({ message: 'Erro ao excluir produto', error: err.message });
  }
});


// Iniciar o servidor
const port = 3003; // Certifique-se de usar a porta correta
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
