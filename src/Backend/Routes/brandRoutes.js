const express = require("express");
const router = express.Router();
const Brand = require("../Models/brand");
const Product = require("../Models/product");  // Supondo que você tenha o modelo Product

// Rota para criar uma nova marca
router.post("/create", async (req, res) => {
  try {
    const { nome, descricao, imagem } = req.body;

    // Criando a nova marca
    const brand = new Brand({
      nome,
      descricao,
      imagem,
    });

    await brand.save();
    res.status(201).json({ message: "Marca criada com sucesso!", brand });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar a marca." });
  }
});

// Rota para listar todas as marcas com a quantidade de produtos e preço médio
router.get("/", async (req, res) => {
  try {
    const brands = await Brand.find({});

    // Para cada marca, buscamos a quantidade total de produtos e o preço médio
    const brandsWithProductData = await Promise.all(brands.map(async (brand) => {
      // Contar os produtos da marca
      const products = await Product.find({ marca: brand.nome });

      // Calcular a quantidade total de produtos (soma das quantidades dos produtos)
      const totalQuantidade = products.reduce((total, product) => {
        // Verifica se a quantidade do produto é válida e soma
        return total + (product.quantidade ? product.quantidade : 0);
      }, 0);

      // Calcular o preço médio dos produtos da marca (média dos preços)
      const precoMedio = products.length > 0
        ? products.reduce((total, product) => {
            return total + (product.preco ? product.preco : 0);
          }, 0) / products.length
        : 0;

      // Retornar a marca com a quantidade de produtos e o preço médio
      return {
        ...brand.toObject(),
        totalQuantidade,
        precoMedio: precoMedio.toFixed(2),  // Preço médio com duas casas decimais
      };
    }));

    res.json(brandsWithProductData);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar as marcas." });
  }
});

module.exports = router;
