import React from "react";
import axios from "axios";
import {
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  message,
} from "antd";
import "./BudgetForm.css";
import CustomHeader from "../../Page/CustomHeader/CustomHeader";
import { FaPlusCircle } from "react-icons/fa";
import { IoHomeSharp, IoPeopleSharp, IoSearchSharp } from "react-icons/io5";

const { Option } = Select;
const { TextArea } = Input;

const BudgetForm: React.FC = () => {
  const [form] = Form.useForm();

  // Função para enviar os dados do formulário para a API
  const handleGenerateBudget = async (values: any) => {
    // Validação de telefone e email no front-end
    const phonePattern = /^\d{2} \d{9}$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!phonePattern.test(values.telefone)) {
      message.error("Telefone deve ser no formato: DD NÚMERO (ex: 71 987348610)");
      return;
    }

    if (!emailPattern.test(values.email)) {
      message.error("Email deve ser válido!");
      return;
    }

    try {
      const response = await axios.post(
        "https://orcamentosbeck-production.up.railway.app/orcamentos",
        values
      );
      message.success("Orçamento criado com sucesso!");
      form.resetFields();
    } catch (error: any) {
      message.error("Erro ao criar orçamento.");
    }
  };

  return (
    <section className="budget_form_container">
      <CustomHeader
        title="Orçamento"
        icon={<FaPlusCircle />}
        breadcrumbs={[
          { label: "Início", icon: <IoHomeSharp />, link: "/clientes" },
          {
            label: "Lista orçamentos",
            icon: <IoPeopleSharp />,
            link: "/BudgetTable",
          },
          { label: "Listar", icon: <IoSearchSharp /> },
        ]}
      />
      <Form
        form={form}
        onFinish={handleGenerateBudget}
        layout="vertical"
        className="budget_form"
      >
        {/* Informações do Cliente */}
        <div className="form_row">
          <Form.Item
            label="Nome do Cliente"
            name="cliente"
            rules={[{ required: true, message: "Nome do cliente é obrigatório!" }]}

            className="form_item"
          >
            <Input placeholder="Digite o nome completo" />
          </Form.Item>

          <Form.Item
            label="Email"
            className="form_item"
            name="email"
            rules={[
              { required: true, message: "Email é obrigatório!" },
              { type: "email", message: "Digite um email válido!" },
            ]}
          >
            <Input placeholder="Digite o email" />
          </Form.Item>

          <Form.Item
            label="Telefone"
            name="telefone"
            rules={[
              { required: true, message: "Telefone é obrigatório!" },
              { pattern: /^\d{2} \d{9}$/, message: "Telefone deve ser válido!" },
            ]}
          >
            <Input
              placeholder="Digite o telefone"
              maxLength={15} // Limite para o formato adequado
              onChange={(e) => {
                // Formata o telefone para o formato DD NÚMERO
                const value = e.target.value.replace(/\D/g, "");
                const formatted = value.length > 2 ? `${value.substring(0, 2)} ${value.substring(2, 11)}` : value;
                e.target.value = formatted;
              }}
            />
          </Form.Item>

          <Form.Item
            label="Descrição do Serviço"
            name="descricao"
            rules={[{ required: true, message: "A descrição do serviço é obrigatória!" }]}

            className="form_item full_width"
          >
            <TextArea rows={3} placeholder="Explique o que precisa ser orçado..." />
          </Form.Item>
        </div>

        {/* Detalhes do Orçamento */}
        <div className="form_row">
          <Form.Item
            label="Valor Total (R$)"
            name="valor"
            rules={[{ required: true, message: "O valor total é obrigatório!" }]}

            className="form_item"
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              step={0.01}
              placeholder="Digite o valor total"
            />
          </Form.Item>

          <Form.Item
            label="Desconto (R$)"
            name="desconto"
            className="form_item"
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              step={0.01}
              placeholder="Digite o valor do desconto, se houver"
            />
          </Form.Item>

          <Form.Item
            label="Data de Validade"
            name="prazoEntrega"
            rules={[{ required: true, message: "A data de validade é obrigatória!" }]}

            className="form_item"
          >
            <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Form.Item>
        </div>

        <div className="form_row">
          <Form.Item
            label="Categoria"
            name="categoria"
            rules={[{ required: true, message: "A categoria é obrigatória!" }]}

            className="form_item"
          >
            <Select placeholder="Selecione a categoria">
              <Option value="Serviço">Serviço</Option>
              <Option value="Produto">Produto</Option>
              <Option value="Outro">Outro</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "O status é obrigatório!" }]}

            className="form_item"
          >
            <Select placeholder="Selecione o status">
              <Option value="Pendente">Pendente</Option>
              <Option value="Aprovado">Aprovado</Option>
              <Option value="Recusado">Recusado</Option>
              <Option value="Concluído">Concluído</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="form_row">
          <Form.Item
            label="Observações Adicionais"
            name="observacoes"
            className="form_item full_width"
          >
            <TextArea
              rows={3}
              placeholder="Adicione observações, se necessário"
            />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="generate_button">
            Gerar Orçamento
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default BudgetForm;
