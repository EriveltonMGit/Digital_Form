import React from 'react';
import { Modal, Form, Input, Select, notification, DatePicker, Button } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addEmployee } from "../../../../redux/employeesSlice";

import Address from '../../../Components/ClientFormModules/ListClients_1/Address/page'; // Importa o componente de endereço
import './ModalEmployee.css';

interface FormValues {
  nome: string;
  tipo: string;
  situacao: string;
  telefone: string;
  celular: string;
  email: string;
  dataAdmissao: string;
  idade: string;
  cargo: string;
  anexo?: string;
}

interface ModalEmployeeProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  onFinish: (values: FormValues) => void;
}

function ModalEmployee({ isModalOpen, handleCancel, onFinish }: ModalEmployeeProps) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleFormSubmit = async (values: FormValues) => {
    try {
      await form.validateFields();

      // Enviando os dados para o backend
      const response = await axios.post('http://localhost:3004/funcionarios', values);

      if (response.status === 201) {
        notification.success({
          message: 'Funcionário cadastrado com sucesso!',
          description: 'Os dados do funcionário foram cadastrados com sucesso.',
          placement: 'topRight',
        });
        dispatch(addEmployee(response.data)); // Adiciona o funcionário ao Redux
        onFinish(values);  // Chama a função para fechar o modal ou realizar outras ações
        form.resetFields();  // Limpa os campos do formulário
      }
    } catch (error) {
      notification.error({
        message: 'Erro no cadastro',
        description: 'Ocorreu um erro ao tentar cadastrar os dados do funcionário.',
        placement: 'topRight',
      });
    }
  };

  return (
    <Modal
      title="Cadastro de Funcionário"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      className="custom-modal"
    >
      <Form
        form={form}
        name="employee_form"
        onFinish={handleFormSubmit}
        layout="vertical"
        className="form_area_officials"
      >
        <div className="form-row">
          <Form.Item
            name="tipo"
            label="Tipo:"
            rules={[{ required: true, message: 'Por favor, selecione o tipo!' }]}
            className="form-col"
          >
            <Select placeholder="Selecione o tipo">
              <Select.Option value="contratado">Contratado</Select.Option>
              <Select.Option value="freelancer">Freelancer</Select.Option>
              <Select.Option value="estagiario">Estagiário</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="nome"
            label="Nome:"
            rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
            className="form-col"
          >
            <Input placeholder="Informe o nome completo" />
          </Form.Item>

          <Form.Item
            name="situacao"
            label="Situação:"
            rules={[{ required: true, message: 'Por favor, selecione a situação!' }]}
            className="form-col"
          >
            <Select placeholder="Selecione a situação">
              <Select.Option value="ativo">Ativo</Select.Option>
              <Select.Option value="inativo">Inativo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="cargo"
            label="Cargo:"
            rules={[{ required: true, message: 'Por favor, insira o cargo!' }]}
            className="form-col"
          >
            <Input placeholder="Informe o cargo do funcionário" />
          </Form.Item>
        </div>

        <div className="form-row">
          <Form.Item
            name="telefone"
            label="Telefone Comercial:"
            rules={[{ required: true, message: 'Por favor, insira o telefone comercial!' }]}
            className="form-col"
          >
            <Input placeholder="Informe o telefone comercial" />
          </Form.Item>

          <Form.Item
            name="celular"
            label="Celular:"
            rules={[{ required: true, message: 'Por favor, insira o celular!' }]}
            className="form-col"
          >
            <Input placeholder="Informe o celular" />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail:"
            rules={[{ required: true, message: 'Por favor, insira o e-mail!' }, { type: 'email', message: 'O e-mail inserido não é válido!' }]}
            className="form-col"
          >
            <Input placeholder="Informe o e-mail" />
          </Form.Item>

          <Form.Item
            name="dataAdmissao"
            label="Data de Admissão:"
            rules={[{ required: true, message: 'Por favor, insira a data de admissão!' }]}
            className="form-col"
          >
            <DatePicker format="DD/MM/YYYY" placeholder="DD/MM/YYYY" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="idade"
            label="Idade:"
            rules={[{ required: true, message: 'Por favor, insira a idade!' }]}
            className="form-col"
          >
            <Input placeholder="Informe a idade" />
          </Form.Item>
        </div>

        <div className="form-row">
        

          <Address form={form} /> {/* Componente de endereço */}

        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-button">
            Cadastrar Funcionário
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalEmployee;
