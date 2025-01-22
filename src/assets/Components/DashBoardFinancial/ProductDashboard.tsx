import React, { useEffect, useState } from "react";
import { Table, Card, Spin } from "antd";
import axios from "axios";
import './FinancialDashboard.css';

interface Product {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
}

const ProductDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Função para buscar os dados dos produtos
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://produtosform-production.up.railway.app/produtos");
      setProducts(response.data); // Armazenando os dados na state 'products'
      setLoading(false); // Desabilita o carregamento
    } catch (error) {
      console.error("Erro ao carregar os produtos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Chama a função ao carregar o componente
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Preço",
      dataIndex: "preco",
      key: "preco",
      render: (text: number) => `R$ ${text.toFixed(2)}`,
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria",
    },
  ];

  return (
    <Card title="Dashboard de Produtos" className="product-dashboard-card"
    >
      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={products}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
          className="ant_dash_board_table"
        />
      )}
    </Card>
  );
};

export default ProductDashboard;
