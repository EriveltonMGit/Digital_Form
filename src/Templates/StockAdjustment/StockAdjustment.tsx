import React, { useState, useEffect } from "react";
import { Select, InputNumber, Button, message, Card, Typography } from "antd";
import { SyncOutlined, ReloadOutlined } from "@ant-design/icons";
import "./StockAdjustment.css";

const { Option } = Select;
const { Title } = Typography;

// Define o tipo para o produto
interface Product {
  _id: string;
  nome: string;
  quantidade: number;
}

const ProductsManager: React.FC = () => {
  // Declara que products é um array de Product
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [adjustmentType, setAdjustmentType] = useState<"add" | "remove">("add");
  const [adjustmentAmount, setAdjustmentAmount] = useState<number>(0);

  // Função para buscar os produtos do backend
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://produtosform-production.up.railway.app/produtos");
      if (!response.ok) {
        throw new Error("Erro ao buscar os produtos");
      }
      const data: Product[] = await response.json(); // Especifica que o retorno é um array de Product
      setProducts(data.filter((product) => product.quantidade >= 0)); // Filtra produtos em estoque
    } catch (error) {
      message.error("Erro ao buscar os produtos.");
    }
  };

  // Hook para buscar os produtos ao carregar o componente
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdjustment = async () => {
    if (!selectedProductId) {
      message.error("Por favor, selecione um produto.");
      return;
    }

    const selectedProduct = products.find((product) => product._id === selectedProductId);

    if (!selectedProduct) {
      message.error("Produto não encontrado.");
      return;
    }

    const newQuantity =
      adjustmentType === "add"
        ? selectedProduct.quantidade + adjustmentAmount
        : selectedProduct.quantidade - adjustmentAmount;

    if (newQuantity < 0) {
      message.error("A quantidade não pode ser negativa.");
      return;
    }

    try {
      // Atualizar o estoque no backend
      const response = await fetch(
        `https://produtosform-production.up.railway.app/produtos/${selectedProductId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantidade: newQuantity }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar o estoque.");
      }

      // Atualizar a lista de produtos localmente
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === selectedProductId
            ? { ...product, quantidade: newQuantity }
            : product
        )
      );

      message.success("Estoque ajustado com sucesso!");
      resetForm();
    } catch (error) {
      message.error("Erro ao ajustar o estoque.");
    }
  };

  const resetForm = () => {
    setSelectedProductId(null);
    setAdjustmentType("add");
    setAdjustmentAmount(0);
  };

  return (
    <Card className="stock-adjustment-container">
      <Title level={3} style={{ textAlign: "center" }}>
        Gerenciar Estoque
      </Title>
      <div style={{ maxWidth: 500, margin: "0 auto" }}>
        <Select
          value={selectedProductId}
          onChange={(value) => setSelectedProductId(value)}
          placeholder="Selecione um produto"
          style={{ width: "100%", marginBottom: 20 }}
        >
          {products.map((product) => (
            <Option key={product._id} value={product._id}>
              {product.nome} (Estoque: {product.quantidade})
            </Option>
          ))}
        </Select>

        <Select
          value={adjustmentType}
          onChange={(value) => setAdjustmentType(value)}
          style={{ width: "100%", marginBottom: 20 }}
        >
          <Option value="add">Adicionar ao Estoque</Option>
          <Option value="remove">Remover do Estoque</Option>
        </Select>

        <InputNumber
          min={0}
          value={adjustmentAmount}
          onChange={(value) => setAdjustmentAmount(value || 0)}
          placeholder="Digite a quantidade"
          style={{ width: "100%", marginBottom: 20 }}
        />

        <div style={{ textAlign: "center" }}>
          <Button
            type="primary"
            icon={<SyncOutlined />}
            onClick={handleAdjustment}
            style={{ marginRight: 10 }}
          >
            Ajustar
          </Button>
          <Button
            type="default"
            icon={<ReloadOutlined />}
            onClick={resetForm}
            danger
          >
            Limpar
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductsManager;
