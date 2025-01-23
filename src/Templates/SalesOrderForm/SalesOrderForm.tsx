import React, { useState } from "react";
import { Form, Input, DatePicker, Button, Select, Row, Col } from "antd";
import { useForm } from "antd/es/form/Form";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import moment from "moment";
import "./SalesOrderForm.css"; // Importe o CSS para personalização

const { Option } = Select;

const SalesOrderForm: React.FC = () => {
  const [form] = useForm();

  // Função para submeter os dados do formulário
  const handleSubmit = (values: any) => {
    console.log("Pedido de Venda Criado: ", values);
    form.resetFields(); // Resetando o formulário após o envio
  };

  return (
    <section className="container_SalesOrderForm">
      <h2>Criar Pedido de Venda</h2>

      {/* Formulário de Pedido de Vendas */}
      <Form
        className="form_sales_order"
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{
          order_date: moment(),
          status: "Pendente",
        }}
      >
        <Row gutter={24}>
          <Col span={12}>
            {/* Campo para o nome do cliente */}
            <Form.Item
              label="Cliente"
              name="customer"
              rules={[{ required: true, message: "Por favor, insira o nome do cliente!" }]}
            >
              <Input placeholder="Nome do cliente" />
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* Campo para o status do pedido */}
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Por favor, selecione o status do pedido!" }]}
            >
              <Select>
                <Option value="Pendente">Pendente</Option>
                <Option value="Concluído">Concluído</Option>
                <Option value="Cancelado">Cancelado</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            {/* Campo para a data do pedido */}
            <Form.Item
              label="Data do Pedido"
              name="order_date"
              rules={[{ required: true, message: "Por favor, selecione a data do pedido!" }]}
            >
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* Campo para a data de entrega */}
            <Form.Item
              label="Data de Entrega"
              name="delivery_date"
              rules={[{ required: true, message: "Por favor, selecione a data de entrega!" }]}
            >
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
        </Row>

        {/* Campo para descrição do pedido */}
        <Form.Item
          label="Descrição"
          name="description"
          rules={[{ required: true, message: "Por favor, insira a descrição do pedido!" }]}
        >
          <Input.TextArea rows={4} placeholder="Descrição do pedido" />
        </Form.Item>

        {/* Botões de envio */}
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<CheckOutlined />}>
            Criar Pedido
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => form.resetFields()} // Limpa o formulário
            icon={<CloseOutlined />}
          >
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default SalesOrderForm;
