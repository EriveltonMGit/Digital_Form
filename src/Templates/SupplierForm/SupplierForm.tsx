import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Row,
  Col,
  message,
} from "antd";
// IMPORT REACT ICONS
import { IoSearchSharp } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { CiViewTable } from "react-icons/ci";
import "./SupplierForm.css";
import CustomHeader from "../../Page/CustomHeader/CustomHeader";

const { Option } = Select;

const SupplierForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);

    // Verifique se todos os campos obrigatórios estão preenchidos antes de enviar
    const requiredFields = [
      "nome",
      "cnpj",
      "telefone",
      "email",
      "endereco",
      "numero",
      "bairro",
      "cidade",
      "estado",
    ];
    const missingFields = requiredFields.filter((field) => !values[field]);

    if (missingFields.length > 0) {
      message.error(
        `Campos obrigatórios não preenchidos: ${missingFields.join(", ")}`
      );
      setLoading(false);
      return;
    }

    try {
      // Enviar os dados para o backend
      const response = await fetch("http://localhost:3002/fornecedores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        message.success("Fornecedor cadastrado com sucesso!");
        form.resetFields(); // Limpa o formulário após sucesso
      } else {
        message.error(data.message || "Erro ao cadastrar o fornecedor.");
      }
    } catch (error) {
      message.error("Erro ao cadastrar o fornecedor.");
      console.error("Erro no frontend:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container_supplier">
      {/* <Header /> */}
      <CustomHeader
        title="Cadastro de Fornecedores"
        icon={<FaPlusCircle />}
        breadcrumbs={[
          { label: "Clientes", icon: <FaHouseUser />, link: "/clients" },
          {
            label: "Lista de Forne...",
            icon: <CiViewTable />,
            link: "/listsuppliers",
          },
          { label: "Em breve", icon: <IoSearchSharp />, link: "" },
        ]}
      />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ status: "ativo" }}
        className="form_supplier"
      >
        {/* Agrupando as seções do formulário em colunas */}
        <Row gutter={24}>
          {/* Nome e CNPJ */}
          <Col span={12}>
            <Form.Item
              label="Nome do Fornecedor"
              name="nome"
              rules={[
                { required: true, message: "Insira o nome do fornecedor" },
              ]}
            >
              <Input placeholder="Ex.: Fornecedor XYZ Ltda." />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="CNPJ"
              name="cnpj"
              rules={[
                { required: true, message: "Insira o CNPJ do fornecedor" },
                {
                  pattern: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
                  message: "CNPJ inválido. Exemplo: 00.000.000/0000-00",
                },
              ]}
            >
              <Input placeholder="Ex.: 12.345.678/0001-99" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          {/* Telefone e E-mail */}
          <Col span={12}>
            <Form.Item
              label="Telefone"
              name="telefone"
              rules={[
                { required: true, message: "Insira o telefone do fornecedor" },
                {
                  pattern: /^\(\d{2}\) \d{4,5}-\d{4}$/,
                  message: "Telefone inválido. Exemplo: (11) 98765-4321",
                },
              ]}
            >
              <Input placeholder="Ex.: (11) 98765-4321" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                { required: true, message: "Insira o e-mail do fornecedor" },
                {
                  type: "email",
                  message: "E-mail inválido",
                },
              ]}
            >
              <Input placeholder="Ex.: fornecedor@empresa.com" />
            </Form.Item>
          </Col>
        </Row>

        {/* Endereço e Número */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Endereço"
              name="endereco"
              rules={[
                { required: true, message: "Insira o endereço do fornecedor" },
              ]}
            >
              <Input placeholder="Ex.: Rua dos Fornecedores, 123" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Número"
              name="numero"
              rules={[
                { required: true, message: "Insira o número do endereço" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="Ex.: 123" />
            </Form.Item>
          </Col>
        </Row>

        {/* Bairro, Cidade e Estado */}
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="Bairro"
              name="bairro"
              rules={[{ required: true, message: "Insira o bairro" }]}
            >
              <Input placeholder="Ex.: Centro" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Cidade"
              name="cidade"
              rules={[{ required: true, message: "Insira a cidade" }]}
            >
              <Input placeholder="Ex.: São Paulo" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Estado"
              name="estado"
              rules={[{ required: true, message: "Selecione o estado" }]}
            >
              <Select placeholder="Selecione um estado">
                <Option value="sp">São Paulo</Option>
                <Option value="rj">Rio de Janeiro</Option>
                <Option value="mg">Minas Gerais</Option>
                <Option value="pr">Paraná</Option>
                <Option value="sc">Santa Catarina</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Status e Data de Cadastro */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Selecione o status" }]}
            >
              <Select>
                <Option value="ativo">Ativo</Option>
                <Option value="inativo">Inativo</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Data de Cadastro"
              name="dataCadastro"
              rules={[
                { required: true, message: "Selecione a data de cadastro" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        {/* Botão de submissão */}
        <Form.Item className="area_btn_supplier">
          <button type="submit" className="btn_add_supplier" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar Fornecedor"}
          </button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default SupplierForm;
