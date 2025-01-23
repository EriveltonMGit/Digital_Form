import React from "react";
import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import './InvoiceConsultation.css'
import CustomHeader from "../../../../Page/CustomHeader/CustomHeader";
import { GrCatalog } from "react-icons/gr";
import { IoCartSharp, IoCubeSharp, IoHomeSharp } from "react-icons/io5";
interface Invoice {
  key: number;
  title: string;
  description: string;
  amount: string;
}

interface InvoiceConsultationProps {
  invoices: Invoice[]; // Recebe as notas como props
}

const InvoiceConsultation: React.FC<InvoiceConsultationProps> = ({ invoices }) => {
  const [searchText, setSearchText] = React.useState<string>("");

  // Função para filtrar as notas com base no texto de pesquisa
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Filtrar as notas que correspondem ao texto de pesquisa
  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.title.toLowerCase().includes(searchText.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchText.toLowerCase())
  );

  // Definindo as colunas da tabela
  const columns = [
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Valor (R$)",
      dataIndex: "amount",
      key: "amount",
      render: (value: string) => `R$ ${value}`,
    },
  ];

  return (
    <div className="invoice-consultation-container">
      
      <CustomHeader
        title="Emissão de Notas"
        icon={<GrCatalog />}
        breadcrumbs={[
          { label: "Início", icon: <IoHomeSharp />, link: "/" }, // Página inicial do sistema
          { label: "Catálogo", icon: <IoCubeSharp />, link: "/catalogo" }, // Seção de catálogo geral
          { label: "Produtos em Estoque", icon: <IoCartSharp /> }, // Página atual
        ]}
      />
      {/* Campo de pesquisa */}
      <Input
        placeholder="Pesquisar notas"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={handleSearch}
        className="input_note"
       
      />

      {/* Tabela para exibir as notas */}
      <Table
        dataSource={filteredInvoices} // Passa as notas filtradas para a tabela
        columns={columns}
        pagination={{ pageSize: 5 }}
        bordered
        locale={{ emptyText: "Nenhuma nota encontrada." }}
        className="table-invoice-consultation"
      />
    </div>
  );
};

export default InvoiceConsultation;
