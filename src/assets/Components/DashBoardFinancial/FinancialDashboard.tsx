import React, { useState, useEffect } from "react";
import { Card, Button, Typography } from "antd";
import { Pie } from "@ant-design/charts";
import "./FinancialDashboard.css";
const { Title, Text } = Typography;

function FinancialDashboard() {
  const [data, setData] = useState({
    toReceiveToday: 0,
    toPayToday: 0,
    receivedThisMonth: 0,
    receivedData: [] as { type: string; value: number }[],
  });

  useEffect(() => {
    // Simulação de requisição para buscar os dados financeiros
    // Substitua com a API real conforme necessário
    setData({
      toReceiveToday: 0,
      toPayToday: 0,
      receivedThisMonth: 0,
      receivedData: [
        { type: "Recebido", value: 70 },
        { type: "Pendente", value: 30 },
      ],
    });
  }, []);

  // Configuração do gráfico de pizza
  const pieConfig = {
    data: data.receivedData,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "spider",
      labelHeight: 28,
      content: "{name}\n{percentage}",
    },
    interactions: [{ type: "element-active" }],
  };

  return (
    <section className="container_dashFinancial">
      {/* Card 1: A Receber Hoje */}
      <Card className="row_dash_finan">
        <h1>A Receber Hoje</h1>
        <p>R$ {data.toReceiveToday.toFixed(2)}</p>
        <br />
        <Button>Ir para Contas a Receber</Button>
      </Card>

      {/* Card 2: A Pagar Hoje */}
      <Card className="row_dash_finan">
        <h1>A Pagar Hoje</h1>
        <p>R$ {data.toPayToday.toFixed(2)}</p>
        <br />
        <Button>Ir para Contas a Pagar</Button>
      </Card>

      {/* Card 3: Recebidos do Mês */}
      <Card className="row_dash_finan">
    <h1>Recebidos do Mês</h1>
        
        <div className="pizza_finan">
          <Pie {...pieConfig} className="grafic_finan"
           height={140} 
           appendPadding={10}
          />
        </div>
      </Card>
    </section>
  );
}

export default FinancialDashboard;
