import React from "react";
import { Card, Table, Calendar } from "antd";
import dayjs, { Dayjs } from "dayjs"; // Importando Dayjs
import "./FinancialDashboard.css";

const RecentTransactions: React.FC = () => {
  const dataSource = [
    {
      key: "1",
      date: "2025-01-22",
      type: "Recebimento",
      amount: "R$ 5.000,00",
      status: "Concluído",
    },
    {
      key: "2",
      date: "2025-01-21",
      type: "Pagamento",
      amount: "R$ 2.300,00",
      status: "Pendente",
    },
    {
      key: "3",
      date: "2025-01-20",
      type: "Recebimento",
      amount: "R$ 1.200,00",
      status: "Concluído",
    },
  ];

  const columns = [
    {
      title: "Data",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Valor",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  // Função para lidar com a seleção de datas no calendário
  const onSelect = (date: Dayjs) => {
    // Usando Dayjs em vez de Moment
    console.log("Data selecionada:", date.format("YYYY-MM-DD"));
    // Adicione a lógica que você precisa ao selecionar uma data
  };

  return (
    <Card className="tras_recentes" title="Transações Recentes">
      {/* Tabela de transações */}
      <Table
        className="tbl_trasacoes"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        size="small"
      />
      {/* Calendário abaixo da tabela */}
      <div className="calendario">
        <Calendar fullscreen={false} onSelect={onSelect} />
      </div>
    </Card>
  );
};

export default RecentTransactions;
