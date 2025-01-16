import { useState, useEffect } from "react";
import { Modal, Form, Input, message } from "antd";
import { Fornecedor } from "../types"; // Ajuste o caminho para 'types' conforme necessário
import "./EditSuppliers.css";
import React from "react";

interface EditSupplierModalProps {
  visible: boolean;
  onClose: () => void;
  supplier: Fornecedor | null;
  onSave: (updatedSupplier: Fornecedor) => void;
}

const EditSupplierModal: React.FC<EditSupplierModalProps> = ({
  visible,
  onClose,
  supplier,
  onSave,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (supplier) {
      form.setFieldsValue(supplier);
    } else {
      form.resetFields();
    }
  }, [supplier, form]);

  const handleSave = async () => {
    if (!supplier || !supplier.id) {
      message.error("ID do fornecedor não encontrado.");
      return;
    }

    try {
      const updatedSupplier = await form.validateFields();
      setLoading(true);

      const response = await fetch(
        `http://localhost:3002/fornecedores/${supplier.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSupplier),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar fornecedor");
      }

      const data = await response.json();
      onSave(data); 
      message.success("Fornecedor atualizado com sucesso!");
      onClose();
    } catch (error) {
      message.error("Erro ao salvar fornecedor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={visible}
      title="Editar Fornecedor"
      onCancel={onClose}
      onOk={handleSave}
      okText="Salvar"
      confirmLoading={loading}
      className="container_edit_suppliers"
      width={800}
    >
      <section className="modal-content-section">
        <Form form={form} layout="vertical">
          <Form.Item
            label="Nome"
            name="nome"
            rules={[{ required: true, message: "Nome é obrigatório!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="CNPJ"
            name="cnpj"
            rules={[{ required: true, message: "CNPJ é obrigatório!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Telefone"
            name="telefone"
            rules={[{ required: true, message: "Telefone é obrigatório!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email é obrigatório!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Endereço"
            name="endereco"
            rules={[{ required: true, message: "Endereço é obrigatório!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </section>
    </Modal>
  );
};

export default EditSupplierModal;
