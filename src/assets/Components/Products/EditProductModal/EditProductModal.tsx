import { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, message } from "antd";
import { Product } from "../../../Components/Products/types";
import "./EditProducts.css";
import React from "react";

interface EditProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (updatedProduct: Product) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  visible,
  onClose,
  product,
  onSave,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    } else {
      form.resetFields();
    }
  }, [product, form]);

  const handleSave = async () => {
    if (!product || !product.id) {
      message.error("ID do produto não encontrado.");
      return;
    }
  
    try {
      const updatedProduct = await form.validateFields();
      setLoading(true);
  
      const formData = new FormData();
  
      // Adicionar campos ao FormData
      Object.entries(updatedProduct).forEach(([key, value]) => {
        if (key === "imagem" && value instanceof File) {
          formData.append(key, value); // Nova imagem
        } else if (key !== "imagem") {
          formData.append(key, String(value)); // Outros campos
        }
      });
  
      // Adicionar a imagem atual caso nenhuma nova tenha sido selecionada
      if (!form.getFieldValue("imagem") && product.imagem) {
        formData.append("imagem", product.imagem); // Imagem existente
      }
  
      const response = await fetch(
        `http://localhost:3003/produtos/${product.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error("Erro ao atualizar produto");
      }
  
      const data = await response.json();
      onSave(data);
      message.success("Produto atualizado com sucesso!");
      onClose();
    } catch (error: any) {
      message.error(`Erro ao salvar produto: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setFieldsValue({ imagem: file });
    }
  };

  return (
    <Modal
      open={visible}
      title="Editar Produto"
      onCancel={onClose}
      onOk={handleSave}
      okText="Salvar"
      confirmLoading={loading}
      className="container_edit_products"
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
            label="Descrição"
            name="descricao"
            rules={[{ required: true, message: "Descrição é obrigatória!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Preço (R$)"
            name="preco"
            rules={[{ required: true, message: "Preço é obrigatório!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Quantidade"
            name="quantidade"
            rules={[{ required: true, message: "Quantidade é obrigatória!" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Categoria"
            name="categoria"
            rules={[{ required: true, message: "Categoria é obrigatória!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Imagem"
            name="imagem"
            valuePropName="file"
          >
            <Input type="file" onChange={handleFileChange} />
          </Form.Item>
        </Form>
      </section>
    </Modal>
  );
};

export default EditProductModal;
