import  { useState, useEffect } from "react";
import { Table, message, Input, Empty } from "antd"; // Adicionando o componente Empty do Ant Design
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import ListSuppliersHeader from "../../../Page/ListSuppliers/page";
import './SupplierListForm.css';
import React from "react";

interface PaginationConfig {
  current: number;
  pageSize: number;
  total?: number;
}

const SupplierList: React.FC = () => {
  const [suppliers, setSuppliers] = useState<any[]>([]);  // Dados recebidos da API
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<PaginationConfig>({
    current: 1,
    pageSize: 10,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchSuppliers = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3002/fornecedores?page=${page}&pageSize=${pageSize}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Verifique a resposta da API
        if (data.data && Array.isArray(data.data)) {
          setSuppliers(data.data); // Armazene os dados da API
          setPagination({
            current: page,
            pageSize: pageSize,
            total: data.total,
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
      render: (text: string) => moment(text).format("DD/MM/YYYY"),
    },
  ];

  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
    });
  };

  return (
    <section className="container_supplier">
      <ListSuppliersHeader />

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
          dataSource={filteredSuppliers} // Usando a lista filtrada
          rowKey="cnpj"
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
          }} // Configuração da paginação
          onChange={handleTableChange}
          bordered
        />
      )}
    </section>
  );
};

export default SupplierList;
