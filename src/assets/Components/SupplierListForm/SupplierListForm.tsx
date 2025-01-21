import { useState, useEffect } from "react";
import { Table, message, Input, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs"; 
import "./SupplierListForm.css";
import CustomHeader from "../../../Page/CustomHeader/CustomHeader";
// IMPORT REACT ICONS
import { IoHomeSharp, IoPeopleSharp, IoSearchSharp } from "react-icons/io5";
import { FaBox } from "react-icons/fa";
import React from "react";

const baseURL = "https://beckfornecedores-production.up.railway.app"; // URL da API de fornecedores

interface PaginationConfig {
  current: number;
  pageSize: number;
  total?: number;
}

const SupplierList: React.FC = () => {
  const [suppliers, setSuppliers] = useState<any[]>([]); // Dados recebidos da API
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<PaginationConfig>({
    current: 1,
    pageSize: 10,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Função para buscar fornecedores com paginação
  const fetchSuppliers = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseURL}/fornecedores?page=${page}&limit=${pageSize}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data)) {
          setSuppliers(data); // Armazene os dados da API
          setPagination({
            current: page,
            pageSize: pageSize,
            total: data.length, // Ajuste conforme o formato da resposta da API
          });
        } else {
          message.error("Formato de dados inválido.");
        }
      } else {
        message.error("Erro ao carregar os fornecedores.");
      }
    } catch (error) {
      message.error("Erro ao carregar os fornecedores.");
      console.error("Erro no frontend:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  // Função para filtrar os fornecedores
  const filteredSuppliers = suppliers.filter((supplier) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      supplier.nome.toLowerCase().includes(searchTermLower) ||
      supplier.cnpj.toLowerCase().includes(searchTermLower) ||
      supplier.telefone.toLowerCase().includes(searchTermLower) ||
      supplier.email.toLowerCase().includes(searchTermLower)
    );
  });

  // Função para formatar a data corretamente
  const parseDate = (date: string) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  // Definição das colunas da tabela
  const columns = [
    { title: "Nome", dataIndex: "nome", key: "nome" },
    { title: "CNPJ", dataIndex: "cnpj", key: "cnpj" },
    { title: "Telefone", dataIndex: "telefone", key: "telefone" },
    { title: "E-mail", dataIndex: "email", key: "email" },
    { title: "Endereço", dataIndex: "endereco", key: "endereco" },
    { title: "Número", dataIndex: "numero", key: "numero" },
    { title: "Bairro", dataIndex: "bairro", key: "bairro" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Data de Cadastro",
      dataIndex: "dataCadastro",
      key: "dataCadastro",
      render: (text: string) => {
        // Adicionando verificação para formato "DD/MM/YYYY"
        const parsedDate = dayjs(text, "DD/MM/YYYY", true); // 'true' faz uma verificação rigorosa
        return parsedDate.isValid() ? parsedDate.format("DD/MM/YYYY") : "Data inválida";
      },
    },
  ];

  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
    });
  };

  return (
    <section className="container_supplier">
      {/* header */}
      <CustomHeader
        title="Lista de Fornecedores"
        icon={<FaBox />}
        breadcrumbs={[
          { label: "Home", icon: <IoHomeSharp />, link: "/home" },
          {
            label: "Fornecedores",
            icon: <IoPeopleSharp />,
            link: "/suppliers",
          },
          { label: "Lista", icon: <IoSearchSharp />, link: "" },
        ]}
      />
      {/* Campo de filtro com input Ant Design e lupa */}
      <div className="area_list_suppliers_form">
        <Input
          placeholder="Pesquisar fornecedores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de pesquisa
          className="input_suppliers_list"
          prefix={<SearchOutlined />}
        />
      </div>

      {filteredSuppliers.length === 0 && searchTerm && !loading ? (
        <Empty description="Nenhum fornecedor encontrado" /> // Mensagem para quando não houver resultados
      ) : (
        <Table
          className="table_list_suppliers"
          columns={columns}
          dataSource={filteredSuppliers}
          rowKey={(record) => record.cnpj || record.nome + record.numero} // Combine fields as a fallback key
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
          }}
          onChange={handleTableChange}
          bordered
        />
      )}
    </section>
  );
};

export default SupplierList;
