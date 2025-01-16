import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Upload,
  message,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";
// IMPORT CSS
import "./ProductForm.css";
import RegisterProductsHeader from "../../Page/RegisterProductsHeader/page";

const { Option } = Select;

const ProductForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "imagem" && values.imagem?.[0]?.originFileObj) {
          formData.append("imagem", values.imagem[0].originFileObj);
        } else {
          formData.append(key, values[key]);
        }
      });

      const response = await fetch("http://localhost:3003/produtos", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        message.success("Produto cadastrado com sucesso!");
        form.resetFields();
      } else {
        message.error(data.message || "Erro ao cadastrar o produto.");
      }
    } catch (error) {
      message.error("Erro ao cadastrar o produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container_products">
      <RegisterProductsHeader />
      <Form
        form={form} // Passando a instância do form aqui
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ status: "ativo" }}
        className="form_products"
      >
        {/* Agrupando as primeiras seções do formulário */}
        <div className="form_group">
          <div className="form_section">
            <Form.Item
              label="Nome do Produto"
              name="nome"
              rules={[{ required: true, message: "Insira o nome do produto" }]}
            >
              <Input placeholder="Ex.: Notebook Dell Inspiron" />
            </Form.Item>

            <Form.Item
              label="Descrição"
              name="descricao"
              rules={[
                { required: true, message: "Insira a descrição do produto" },
              ]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Ex.: Notebook com processador Intel Core i7, 16GB RAM..."
              />
            </Form.Item>
          </div>

          {/* Preço, Quantidade, Desconto e Peso */}
          <div className="form_section_preco">
            <Form.Item
              label="Preço (R$)"
              name="preco"
              rules={[
                { required: true, message: "Insira o preço do produto" },
                {
                  type: "number",
                  min: 0,
                  message: "Preço deve ser maior ou igual a zero",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Ex.: 4500.00"
                step={0.01}
              />
            </Form.Item>

            <Form.Item
              label="Quantidade em Estoque"
              name="quantidade"
              rules={[
                { required: true, message: "Insira a quantidade em estoque" },
                {
                  type: "number",
                  min: 0,
                  message: "A quantidade deve ser maior ou igual a zero",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Ex.: 10"
                min={0}
              />
            </Form.Item>

            {/* Novo campo de Desconto */}
            <Form.Item
              label="Desconto (%)"
              name="desconto"
              rules={[
                { required: false, message: "Insira o valor do desconto" },
                {
                  type: "number",
                  min: 0,
                  max: 100,
                  message: "O desconto deve estar entre 0% e 100%",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Ex.: 10"
                min={0}
                max={100}
                step={1}
              />
            </Form.Item>

            {/* Novo campo de Peso */}
            <Form.Item
              label="Peso (kg)"
              name="peso"
              rules={[
                { required: false, message: "Insira o peso do produto" },
                {
                  type: "number",
                  min: 0,
                  message: "O peso deve ser maior ou igual a zero",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Ex.: 1.5"
                min={0}
                step={0.1}
              />
            </Form.Item>
          </div>
        </div>

        {/* Seção para Categoria, Status e Data */}
        <div className="form_section_2">
          <div className="form_row">
            <Form.Item
              label="Categoria"
              name="categoria"
              rules={[
                { required: true, message: "Selecione a categoria do produto" },
              ]}
              className="form_item_half"
            >
              <Select placeholder="Selecione uma categoria">
                <Option value="informatica">Informática</Option>
                <Option value="eletrodomesticos">Eletrodomésticos</Option>
                <Option value="moveis">Móveis</Option>
                <Option value="vestuario">Vestuário</Option>
                <Option value="alimentos">Alimentos</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              rules={[
                { required: true, message: "Selecione o status do produto" },
              ]}
              className="form_item_half"
            >
              <Select>
                <Option value="ativo">Ativo</Option>
                <Option value="inativo">Inativo</Option>
              </Select>
            </Form.Item>
          </div>

          {/* Campo de Data de Cadastro */}
          <div className="form_row">
            <Form.Item
              label="Data de Cadastro"
              name="dataCadastro"
              rules={[
                { required: true, message: "Selecione a data de cadastro" },
              ]}
              className="form_item_half"
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>

          {/* Novo campo para Imagem */}
          <div className="form_row">
            <Form.Item
              label="Imagem do Produto"
              name="imagem"
              valuePropName="fileList"
              getValueFromEvent={(e: any) =>
                Array.isArray(e) ? e : e?.fileList
              }
              extra="Carregue a imagem do produto (JPG, PNG, etc.)"
              rules={[
                {
                  required: true,
                  message: "Por favor, envie uma imagem do produto!",
                },
              ]}
            >
              <Upload
                name="file"
                listType="picture-card"
                beforeUpload={() => false} // Impede upload automático
              >
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Clique para carregar</div>
                </div>
              </Upload>
            </Form.Item>
          </div>
        </div>

        {/* Botão de submissão */}
        <Form.Item className="area_btn_products">
          <Button
            type="primary"
            htmlType="submit"
            className="btn_add_products"
            loading={loading}
            block
          >
            Cadastrar Produto
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default ProductForm;
