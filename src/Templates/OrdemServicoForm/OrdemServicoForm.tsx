import React, { useState } from "react";
import { Form, Input, DatePicker, Button, Select, Row, Col } from "antd";
import { useForm } from "antd/es/form/Form";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import moment from "moment";
import "./OrdemServicoForm.css"; // Certifique-se de importar o arquivo de CSS para estilizar

const { Option } = Select;

const OrdemServicoForm: React.FC = () => {
  const [form] = useForm();

  // Função para submeter os dados do formulário
  const handleSubmit = (values: any) => {
    console.log("Ordem de Serviço Criada: ", values);
    form.resetFields(); // Resetando o formulário após o envio
  };

  return (
    <section className="container_OrdemServicoForm">
      <h2>Criar Ordem de Serviço</h2>

      {/* Formulário de Ordem de Serviço */}
      <Form
      className="form_order_service"
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{
          data_inicio: moment(),
          status: "Em Andamento",
          
        }}
      >
        <Row gutter={24}>
          <Col span={12}>
            {/* Campo para o nome do profissional ou responsável */}
            <Form.Item
              label="Responsável"
              name="responsavel"
              rules={[{ required: true, message: "Informe o responsável!" }]}
            >
              <Input placeholder="Nome do responsável" />
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* Campo para o status da Ordem de Serviço */}
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Selecione o status!" }]}
            >
              <Select>
                <Option value="Em Andamento">Em Andamento</Option>
                <Option value="Concluído">Concluído</Option>
                <Option value="Atrasado">Atrasado</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            {/* Campo para a data de início */}
            <Form.Item
              label="Data de Início"
              name="data_início"
              rules={[
                { required: true, message: "Informe a data de início!" },
              ]}
            >
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* Campo para a data de término */}
            <Form.Item
              label="Data de Término"
              name="data_termino"
              rules={[
                { required: true, message: "Informe a data de término!" },
              ]}
            >
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
        </Row>

        {/* Campo para descrição da Ordem de Serviço */}
        <Form.Item
          label="Descrição"
          name="descricao"
          rules={[{ required: true, message: "Informe a descrição!" }]}
        >
          <Input.TextArea rows={4} placeholder="Descrição do serviço" />
        </Form.Item>

        {/* Botões de envio */}
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<CheckOutlined />}>
            Criar OS
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

export default OrdemServicoForm;
