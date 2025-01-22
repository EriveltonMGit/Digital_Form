import { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, message } from "antd";
import { Product } from "../../../Components/Products/types";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  setProductsData,
} from "../../../../redux/productsSlice";
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
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.productsData);

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    } else {
      form.resetFields();
    }
  }, [product, form]);

  const handleSave = async () => {
    if (!product) {
      message.error("Produto não encontrado.");
      return;
    }

    const productId = product.id || product._id; // Usando id ou _id
    if (!productId) {
      message.error("ID do produto não encontrado.");
      return;
    }

    try {
      const updatedProduct = await form.validateFields();
      setLoading(true);

      const formData = new FormData();
      Object.entries(updatedProduct).forEach(([key, value]) => {
        if (key === "imagem" && value instanceof File) {
          formData.append(key, value);
        } else if (key !== "imagem") {
          formData.append(key, String(value));
        }
      });

      if (!form.getFieldValue("imagem") && product.imagem) {
        formData.append("imagem", product.imagem);
      }

      const response = await fetch(
        `https://produtosform-production.up.railway.app/produtos/${productId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar produto");
      }

      const { product: updatedProductFromServer } = await response.json(); // Acessando o produto na chave 'product'

      // Atualiza o Redux com o produto atualizado
      dispatch(updateProduct(updatedProductFromServer));

      // Atualiza a lista localmente (se necessário)
      const updatedProducts = products.map((prod: Product) =>
        prod.id === updatedProductFromServer.id ||
        prod._id === updatedProductFromServer._id
          ? updatedProductFromServer
          : prod
      );
      dispatch(setProductsData(updatedProducts));

      message.success("Produto atualizado com sucesso!");
      onSave(updatedProductFromServer);
      onClose();
    } catch (error: any) {
      message.error(`Erro ao salvar produto: ${error.message}`);
    } finally {
      setLoading(false);
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
          <Form.Item label="Imagem" name="imagem" valuePropName="fileList">
            <Upload
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  message.error("Apenas arquivos de imagem são permitidos.");
                  return Upload.LIST_IGNORE;
                }
                form.setFieldsValue({ imagem: [file] });
                return false;
              }}
              showUploadList={true}
              fileList={form.getFieldValue("imagem") || []}
            >
              <Button icon={<UploadOutlined />}>Selecionar Imagem</Button>
            </Upload>
          </Form.Item>
        </Form>
      </section>
    </Modal>
  );
};

export default EditProductModal;
