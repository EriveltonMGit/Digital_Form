const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../Models/product");

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Pasta onde as imagens serão armazenadas
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renomeia o arquivo para evitar conflitos
  },
});

const upload = multer({ storage: storage });

// Rota para criar um novo produto com upload de imagem
router.post("/create", upload.single("imagem"), async (req, res) => {
  try {
    const { nome, descricao, preco, quantidade, categoria, marca, status, desconto, peso, cadastradoEm } = req.body;

    // Verificar se o campo 'marca' é obrigatório
    if (!marca) {
      return res.status(400).json({ error: "O campo 'marca' é obrigatório." });
    }

    // URL da imagem, se houver
    const imagem = req.file ? `/uploads/${req.file.filename}` : null;

    // Criando o novo produto com os dados recebidos
    const product = new Product({
      nome,
      descricao,
      preco,
      quantidade,
      categoria,
      marca, // Agora inclui o campo 'marca'
      status,
      desconto,
      peso,
      cadastradoEm,
      imagem,
    });

    await product.save();
    res.status(201).json({ message: "Produto criado com sucesso!", product });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o produto." });
  }
});

// Rota para listar os produtos
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o produto." });
  }
});

module.exports = router;
