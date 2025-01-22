import React, { useState, useEffect } from "react";
import { Card, Statistic, Row, Col, Button, Tooltip, Modal } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Line } from "@ant-design/charts"; // Se você quiser adicionar um gráfico de linha
import "./FinancialBalance.css";

const AccountsPayable: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [totalEntradas, setTotalEntradas] = useState(30000);
  const [totalSaidas, setTotalSaidas] = useState(15000);
  const [contasPagar, setContasPagar] = useState(5000);
  const [contasReceber, setContasReceber] = useState(12000);
  const [indiceLiquidez, setIndiceLiquidez] = useState(1.5);
  const [comparacaoMesAtual, setComparacaoMesAtual] = useState(8);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Simulação de dados vindos de uma API ou de algum backend
    setTimeout(() => {
      setBalance(50000); // Exemplo de saldo
      setPercentageChange(8); // Exemplo de variação percentual do saldo
      setLoading(false);
    }, 1000);
  }, []);

  const data = [
    { month: "Jan", value: 20000 },
    { month: "Feb", value: 25000 },
    { month: "Mar", value: 30000 },
    { month: "Apr", value: 35000 },
    { month: "May", value: 40000 },
    { month: "Jun", value: 45000 },
    { month: "Jul", value: 50000 },
  ];

  const config = {
    data,
    xField: "month",
    yField: "value",
    color: "#1890ff",
    lineStyle: { lineWidth: 3 },
    xAxis: {
      label: {
        style: {
          fontSize: 12,
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
        name: "Saldo",
        value: `R$${datum.value}`,
      }),
    },
  };

  // Função para abrir o modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Função para fechar o modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <section className="financial-balance-card">
      <Card className="form_financial-balance" title="Saldo Financeiro" loading={loading} bordered>
        <Row gutter={24} justify="space-between">
          <Col span={12}>
            <Statistic
              title="Saldo Atual"
              value={`R$ ${balance.toFixed(2)}`}
              precision={2}
              valueStyle={{ fontSize: "32px", fontWeight: "bold", color: "#52c41a" }}
              prefix={<ArrowUpOutlined />}
              suffix="BRL"
            />
            <Tooltip title="Variação percentual do saldo">
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "16px",
                  color: percentageChange >= 0 ? "#52c41a" : "#f5222d",
                }}
              >
                {percentageChange >= 0 ? (
                  <>
                    <ArrowUpOutlined />
                    {percentageChange}% de aumento
                  </>
                ) : (
                  <>
                    <ArrowDownOutlined />
                    {Math.abs(percentageChange)}% de diminuição
                  </>
                )}
              </div>
            </Tooltip>
            <Button type="primary" onClick={showModal}>
              Ver Detalhes
            </Button>
          </Col>
          <Col span={12}>
            <Line {...config} />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Statistic title="Total de Entradas" value={`R$ ${totalEntradas.toFixed(2)}`} />
            <Statistic title="Total de Saídas" value={`R$ ${totalSaidas.toFixed(2)}`} />
          </Col>
          <Col span={12}>
            <Statistic title="Contas a Pagar" value={`R$ ${contasPagar.toFixed(2)}`} />
            <Statistic title="Contas a Receber" value={`R$ ${contasReceber.toFixed(2)}`} />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Statistic title="Índice de Liquidez" value={`${indiceLiquidez.toFixed(2)}:1`} />
          </Col>
          <Col span={12}>
            <Statistic
              title="Comparação com o Mês Passado"
              value={`${comparacaoMesAtual}%`}
              precision={2}
              valueStyle={{
                color: comparacaoMesAtual >= 0 ? "#52c41a" : "#f5222d",
              }}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Card title="Categorias de Entradas">
              <ul>
                <li>Vendas: R$ 30,000</li>
                <li>Investimentos: R$ 5,000</li>
              </ul>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Categorias de Saídas">
              <ul>
                <li>Pagamentos de Fornecedores: R$ 10,000</li>
                <li>Impostos: R$ 2,000</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Modal com informações detalhadas */}
      <Modal
        title="Detalhes do Saldo Financeiro"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Fechar
          </Button>,
        ]}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Saldo Atual" value={`R$ ${balance.toFixed(2)}`} />
            <Statistic title="Total de Entradas" value={`R$ ${totalEntradas.toFixed(2)}`} />
            <Statistic title="Total de Saídas" value={`R$ ${totalSaidas.toFixed(2)}`} />
            <Statistic title="Contas a Pagar" value={`R$ ${contasPagar.toFixed(2)}`} />
            <Statistic title="Contas a Receber" value={`R$ ${contasReceber.toFixed(2)}`} />
          </Col>
          <Col span={12}>
            <Statistic title="Índice de Liquidez" value={`${indiceLiquidez.toFixed(2)}:1`} />
            <Statistic
              title="Comparação com o Mês Passado"
              value={`${comparacaoMesAtual}%`}
              valueStyle={{
                color: comparacaoMesAtual >= 0 ? "#52c41a" : "#f5222d",
              }}
            />
          </Col>
        </Row>
      </Modal>
    </section>
  );
};

export default AccountsPayable;
