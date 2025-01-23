import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./AccountsReceivable.css";
import CustomHeader from "../../Page/CustomHeader/CustomHeader";
import { GrCatalog } from "react-icons/gr";
import { IoHomeSharp, IoPeopleSharp, IoSearchSharp } from "react-icons/io5";
interface TableRow {
  key: string;
  customer: string;
  invoice: string;
  dueDate: string;
  amount: number;
  status: string;
}

const data: TableRow[] = [
  {
    key: "1",
    customer: "John Doe",
    invoice: "INV-001",
    dueDate: "2025-01-10",
    amount: 1500,
    status: "Paid",
  },
  {
    key: "2",
    customer: "Jane Smith",
    invoice: "INV-002",
    dueDate: "2025-01-15",
    amount: 2000,
    status: "Unpaid",
  },
];

const columns: ColumnsType<TableRow> = [
    {
      title: "Cliente",
      dataIndex: "customer",
      key: "customer",
      sorter: (a, b) => a.customer.localeCompare(b.customer),
    },
    {
      title: "Fatura",
      dataIndex: "invoice",
      key: "invoice",
    },
    {
      title: "Data de Vencimento",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Valor",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Pago", value: "Paid" },
        { text: "Não Pago", value: "Unpaid" },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

const AccountsReceivable: React.FC = () => {
  return (
    <>
      <section className="container_accountsReceivable">
      <CustomHeader
        title="Contas a Receber"
        icon={<GrCatalog />}
        breadcrumbs={[
          { label: "Início", icon: <IoHomeSharp />, link: "/" },
          {
            label: "Contas a pagar",
            icon: <IoPeopleSharp />,
            link: "/AccountsPayable",
          },
          { label: "Em breve", icon: <IoSearchSharp /> },
        ]}
      />
        <Table dataSource={data} columns={columns} className="table_accountsReceivable"/>;
      </section>
    </>
  );
};

export default AccountsReceivable;
