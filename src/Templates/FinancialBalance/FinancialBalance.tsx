import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Button,
  Tooltip,
  Modal,
  Divider,
} from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Line } from "@ant-design/charts";
import "./FinancialBalance.css";
import CustomHeader from "../../Page/CustomHeader/CustomHeader";
import { IoCartSharp, IoCubeSharp, IoHomeSharp } from "react-icons/io5";
import { GrCatalog } from "react-icons/gr";

const AccountsPayable: React.FC = () => {
  const [balance, setBalance] = useState(35000);
  const [entradas, setEntradas] = useState(20000);
  const [saidas, setSaidas] = useState(10000);
  const [comparacaoMes, setComparacaoMes] = useState(5);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulando carregamento de dados
  }, []);

  const data = [
    { month: "Jan", value: 10000 },
    { month: "Feb", value: 15000 },
    { month: "Mar", value: 20000 },
    { month: "Apr", value: 25000 },
    { month: "May", value: 30000 },
    { month: "Jun", value: 35000 },
    { month: "Jul", value: 40000 },
  ];

  const config = {
    data,
    xField: "month",
    yField: "value",
    lineStyle: { lineWidth: 4 },
    color: "#4f9c93",
    tooltip: {
      formatter: (datum: any) => ({
        name: "Saldo",
        value: `R$${datum.value}`,
      }),
    },
    height: 250,
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="financial-balance-card">
      <CustomHeader
        title="Produtos em Estoque"
        icon={<GrCatalog />}
        breadcrumbs={[
          { label: "Início", icon: <IoHomeSharp />, link: "/" }, // Página inicial do sistema
          { label: "Catálogo", icon: <IoCubeSharp />, link: "/catalogo" }, // Seção de catálogo geral
          { label: "Produtos em Estoque", icon: <IoCartSharp /> }, // Página atual
        ]}
      />

      <Card className="header-card-balance" loading={loading} bordered={false}>
        <Row gutter={24}>
          <Col span={8}>
            <Card className="info-card">
              <Statistic
                title="Saldo Atual"
                value={`R$ ${balance.toFixed(2)}`}
                valueStyle={{
                  fontSize: 32,
                  fontWeight: "bold",
                  color: "#52c41a",
                }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="info-card">
              <Statistic
                title="Entradas Totais"
                value={`R$ ${entradas.toFixed(2)}`}
                valueStyle={{
                  fontSize: 32,
                  fontWeight: "bold",
                  color: "#1890ff",
                }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="info-card">
              <Statistic
                title="Saídas Totais"
                value={`R$ ${saidas.toFixed(2)}`}
                valueStyle={{
                  fontSize: 32,
                  fontWeight: "bold",
                  color: "#f5222d",
                }}
                prefix={<ArrowDownOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </Card>

      <Card className="graph-card" loading={loading} bordered={false}>
        <div className="chart-container">
          <Line {...config} />
        </div>
      </Card>

      <Row gutter={24} className="detail-card">
        <Col span={12}>
          <Card title="Comparação com o Mês Passado">
            <Statistic
              value={`${comparacaoMes}%`}
              valueStyle={{
                fontSize: 24,
                color: comparacaoMes >= 0 ? "#52c41a" : "#f5222d",
              }}
              prefix={
                comparacaoMes >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />
              }
            />
            <Button
              className="details-button"
              type="primary"
              onClick={showModal}
            >
              Ver Detalhes
            </Button>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Informações Financeiras">
            <ul>
              <li>Contas a Pagar: R$ 5,000</li>
              <li>Contas a Receber: R$ 12,000</li>
            </ul>
          </Card>
        </Col>
      </Row>

      {/* Modal */}
      <Modal
        title="Detalhes Financeiros"
        open={isModalVisible}
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
            <Statistic
              title="Entradas Totais"
              value={`R$ ${entradas.toFixed(2)}`}
            />
            <Statistic
              title="Saídas Totais"
              value={`R$ ${saidas.toFixed(2)}`}
            />
          </Col>
          <Col span={12}>
            <Statistic title="Contas a Pagar" value={`R$ 5,000`} />
            <Statistic title="Contas a Receber" value={`R$ 12,000`} />
            <Statistic
              title="Comparação com o Mês Passado"
              value={`${comparacaoMes}%`}
              valueStyle={{
                color: comparacaoMes >= 0 ? "#52c41a" : "#f5222d",
              }}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default AccountsPayable;
