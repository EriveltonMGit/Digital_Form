import React, { useState } from "react";
import { Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import "./SalesOrderTable.css"; // Estilização opcional

// Definição do tipo de dados dos pedidos
interface SalesOrder {
  key: string;
  cliente: string;
  status: string;
  dataPedido: string;
  dataEntrega: string;
  descricao: string;
}

const SalesOrderTable: React.FC = () => {
  const [data, setData] = useState<SalesOrder[]>([
    {
      key: "1",
      cliente: "João Silva",
      status: "Pendente",
      dataPedido: moment().format("DD/MM/YYYY"),
      dataEntrega: moment().add(7, "days").format("DD/MM/YYYY"),
      descricao: "Pedido de desenvolvimento de site.",
    },
    {
      key: "2",
      cliente: "Maria Oliveira",
      status: "Concluído",
      dataPedido: moment().subtract(5, "days").format("DD/MM/YYYY"),
      dataEntrega: moment().format("DD/MM/YYYY"),
      descricao: "Manutenção no sistema interno.",
    },
    {
      key: "3",
      cliente: "Carlos Souza",
      status: "Cancelado",
      dataPedido: moment().subtract(10, "days").format("DD/MM/YYYY"),
      dataEntrega: moment().subtract(5, "days").format("DD/MM/YYYY"),
      descricao: "Configuração de servidor.",
    },
  ]);

  // Função para excluir um pedido
  const handleDelete = (key: string) => {
    setData(data.filter((item) => item.key !== key));
  };

  // Função para editar um pedido (simples placeholder)
  const handleEdit = (record: SalesOrder) => {
    alert(`Editar pedido do cliente: ${record.cliente}`);
  };

  // Colunas da tabela
  const columns: ColumnsType<SalesOrder> = [
    {
      title: "Cliente",
      dataIndex: "cliente",
      key: "cliente",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Concluído" ? "green" : status === "Cancelado" ? "red" : "gold";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Data do Pedido",
      dataIndex: "dataPedido",
      key: "dataPedido",
    },
    {
      title: "Data de Entrega",
      dataIndex: "dataEntrega",
      key: "dataEntrega",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Editar
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            Excluir
          </Button>
        </span>
      ),
    },
  ];

  return (
    <section className="container_SalesOrderTable">
      <h2>Lista de Pedidos de Venda</h2>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        rowKey="key"
        bordered
        className="table_container_SalesOrderTable"
      />
    </section>
  );
};

export default SalesOrderTable;
