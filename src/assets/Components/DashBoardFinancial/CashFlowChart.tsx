import React from "react";
import { Card } from "antd";
import { Column } from "@ant-design/charts";
import './FinancialDashboard.css';

const CashFlowChart: React.FC = () => {
  const data = [
    { month: "Jan", value: 12000 },
    { month: "Feb", value: 15000 },
    { month: "Mar", value: 10000 },
    { month: "Apr", value: 18000 },
    { month: "May", value: 20000 },
    { month: "Jun", value: 14000 },
    { month: "Jul", value: 17000 },
    { month: "Aug", value: 22000 },
    { month: "Sep", value: 16000 },
    { month: "Oct", value: 21000 },
    { month: "Nov", value: 19000 },
    { month: "Dec", value: 25000 },
  ];

  const config = {
    data,
    xField: "month",
    yField: "value",
    color: "#1890ff",
    columnWidthRatio: 0.6,
    autoFit: false, // Desativa o ajuste automático de tamanho
    width: 400, // Largura do gráfico
    height: 260, // Altura do gráfico
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.85,
      },
    },
    xAxis: {
      label: {
        style: {
          fontSize: 12,
          fontWeight: 600,
        },
      },
    },
    yAxis: {
      label: {
        formatter: (v: any) => `R$${v}`,
      },
    },
    tooltip: {
      formatter: (datum: any) => ({
        name: "Fluxo de Caixa",
        value: `R$${datum.value}`,
      }),
    },
  };

  return (
    <Card className="container_fluxo">
      <h2>Fluxo de Caixa Mensal</h2>
      <Column {...config} />
      <div className="graf_barr">
        <strong>Porcentagem Anual: </strong>
        <span style={{ color: "#52c41a", fontWeight: "bold" }}>15% ↑</span>
      </div>
      
    </Card>
  );
};

export default CashFlowChart;
