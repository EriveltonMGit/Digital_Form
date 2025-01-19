
import { Modal, Form, Input, Select, notification, DatePicker } from "antd";
import "./ModalCli.css";
import Address from "../Address/page";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addClient } from "../../../../../redux/clientsSlice";
import FileUpload from "../FileUpload/page";
import React from "react";

interface FormValues {
  codigo: string;
  nome: string;
  tipo: string;
  situacao: string;
  telefone: string;
  celular: string;
  email: string;
  cadastradoEm: string;
  idade: string;
  fax?: string;
}

interface ModalCliProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  onFinish: (values: FormValues) => void;
}

function ModalCli({ isModalOpen, handleCancel, onFinish }: ModalCliProps) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleFormSubmit = async (values: FormValues) => {
    try {
      await form.validateFields();  
      // Enviando os dados para o backend
      // const response = await axios.post("http://localhost:3001/clientes", values);
      const response = await axios.post("https://clientes-production-df47.up.railway.app/clientes", values);
      
      if (response.status === 201) {
        notification.success({
          message: "Cadastro realizado com sucesso!",
          description: "Os dados do cliente foram cadastrados com sucesso no sistema.",
          placement: "topRight",
        });
        dispatch(addClient(response.data)); // Adicionando cliente ao Redux
        onFinish(values);  // Fechar o modal ou realizar outras ações
        form.resetFields();  // Limpar os campos
      }
    } catch (error) {
      console.error("Erro na validação ou no envio dos dados:", error);
      notification.error({
        message: "Erro no cadastro",
        description: "Ocorreu um erro ao tentar cadastrar os dados do cliente.",
        placement: "topRight",
      });
    }
  };
  
  

  return (
    <Modal
      title="Cadastro de Cliente"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      className="custom-modal"
    >
      <Form
        form={form}
        name="client_form"
        onFinish={handleFormSubmit}
        layout="vertical"
        className="form_area"
      >
        <div className="form-row">
          <Form.Item
            name="tipo"
            label="Tipo :"
            className="form-col"
            rules={[{ required: true, message: "Por favor selecione o tipo!" }]} >
            <Select placeholder="Selecione o tipo">
              <Select.Option value="pessoa_fisica">Pessoa Física</Select.Option>
              <Select.Option value="pessoa_juridica">Pessoa Jurídica</Select.Option>
              <Select.Option value="estrangeiro">Estrangeiro</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="nome"
            label="Nome :"
            className="form-col"
            rules={[{ required: true, message: "Por favor insira o nome!" }]} >
            <Input placeholder="Informe o nome completo" />
          </Form.Item>

          <Form.Item
            name="situacao"
            label="Situação :"
            className="form-col"
            rules={[{ required: true, message: "Por favor selecione a situação!" }]} >
            <Select placeholder="Selecione a situação">
              <Select.Option value="ativo">Ativo</Select.Option>
              <Select.Option value="inativo">Inativo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="fax"
            label="Fax:"
            className="form-col"
          >
            <Input placeholder="Informe o fax" />
          </Form.Item>
        </div>

        <div className="form-row">
          <Form.Item
            name="telefone"
            label="Telefone Comercial :"
            className="form-col"
            rules={[{ required: true, message: "Por favor insira o telefone comercial!" }]} >
            <Input placeholder="Informe o telefone comercial" />
          </Form.Item>

          <Form.Item
            name="celular"
            label="Celular :"
            className="form-col"
            rules={[{ required: true, message: "Por favor insira o celular!" }]} >
            <Input placeholder="Informe o celular" />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail :"
            className="form-col"
            rules={[
              { required: true, message: "Por favor insira o e-mail!" },
              { type: "email", message: "O e-mail inserido não é válido!" },
            ]} >
            <Input placeholder="Informe o e-mail" />
          </Form.Item>

          <Form.Item
            name="cadastradoEm"
            label="Data de cadastro do cliente :"
            className="form-col"
            rules={[{ required: true, message: "Por favor insira a data de cadastro!" }]} >
            <DatePicker format="DD/MM/YYYY" placeholder="DD/MM/YYYY" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="idade"
            label="Idade :"
            className="form-col"
            rules={[{ required: true, message: "Por favor insira a idade!" }]} >
            <Input placeholder="Informe a idade" />
          </Form.Item>
        </div>

        <Address form={form} />

        <Form.Item name="anexo" label="Anexo" className="upload">
          <FileUpload onFileChange={(file) => form.setFieldsValue({ anexo: file })} />
        </Form.Item>

        <Form.Item>
          <button type="submit" className="ant-btn ant-btn-primary">Cadastrar</button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalCli;
