import React, { useState, useEffect } from "react";
import { Table, Input, message, Skeleton } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./ProductsInStock.css";
import CustomHeader from "../../Page/CustomHeader/CustomHeader";
import { GrCatalog } from "react-icons/gr";
import { IoHomeSharp, IoCartSharp, IoCubeSharp } from "react-icons/io5";

const ProductsInStock: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Começa como 'true' para mostrar o skeleton inicialmente

  // Função para buscar os produtos do backend
  const fetchProducts = async () => {
    setLoading(true); // Inicia o carregamento
    try {
      const response = await fetch("https://produtosform-production.up.railway.app/produtos");
      if (!response.ok) {
        throw new Error("Erro ao buscar os produtos");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      message.error("Erro ao buscar os produtos.");
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Hook para buscar os produtos ao carregar o componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtrar produtos em estoque e aplicar a busca
  const filteredProducts = products.filter((product: any) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      product.quantidade > 0 && // Apenas produtos com estoque
      (product.nome?.toLowerCase().includes(searchTermLower) ||
        product.descricao?.toLowerCase().includes(searchTermLower) ||
        product.categoria?.toLowerCase().includes(searchTermLower) ||
        product.marca?.toLowerCase().includes(searchTermLower))
    );
  });

  // Configurações das colunas da tabela
  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
      width: 200,
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
      width: 300,
    },
    {
      title: "Preço (R$)",
      dataIndex: "preco",
      key: "preco",
      width: 150,
      render: (price: number) => price.toFixed(2), // Exibir com 2 casas decimais
    },
    {
      title: "Quantidade",
      dataIndex: "quantidade",
      key: "quantidade",
      width: 150,
      render: (quantidade: number) => (
        <span style={{ color: quantidade < 10 ? "red" : "inherit" }}>
          {quantidade}
        </span>
      ),
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria",
      width: 200,
    },
    {
      title: "Marca",
      dataIndex: "marca",
      key: "marca",
      width: 150,
    },
    {
      title: "Imagem",
      dataIndex: "imagem",
      key: "imagem",
      render: (url: string) => {
        if (!url) {
          return <span>Sem imagem</span>;
        }
        return <img src={url} alt="Produto" style={{ width: 50, height: 50, objectFit: "cover" }} />;
      },
    },
  ];

  return (
    <div className="products-in-stock-container">
      <CustomHeader
        title="Produtos em Estoque"
        icon={<GrCatalog />}
        breadcrumbs={[
          { label: "Início", icon: <IoHomeSharp />, link: "/" }, // Página inicial do sistema
          { label: "Catálogo", icon: <IoCubeSharp />, link: "/catalogo" }, // Seção de catálogo geral
          { label: "Produtos em Estoque", icon: <IoCartSharp /> }, // Página atual
        ]}
      />

      <Input
        placeholder="Pesquisar produtos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        prefix={<SearchOutlined />}
        style={{ marginBottom: 20 }}
      />

      {/* Exibir o Skeleton enquanto os dados estão sendo carregados */}
      {loading ? (
        <Skeleton active paragraph={{ rows: 14 }} />
      ) : (
        <Table
          dataSource={filteredProducts}
          columns={columns}
          rowKey={(record: any) => record._id}
          pagination={{ pageSize: 10 }}
          className="products-table"
        />
      )}
    </div>
  );
};

export default ProductsInStock;
