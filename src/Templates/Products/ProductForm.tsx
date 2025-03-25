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
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/productsSlice"; // Importando a ação para adicionar um produto
import "./ProductForm.css";
import CustomHeader from "../../Page/CustomHeader/CustomHeader";
import { IoHomeSharp, IoPeopleSharp, IoSearchSharp } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";

const { Option } = Select;

const ProductForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Se uma imagem for selecionada, passamos o arquivo diretamente no corpo da requisição
      const productData = {
        nome: values.nome,
        descricao: values.descricao,
        preco: values.preco,
        quantidade: values.quantidade,
        categoria: values.categoria,
        marca: values.marca,
        imagem: values.imagem[0]?.originFileObj, // Enviar o arquivo direto
        status: values.status,
        dataCadastro: values.dataCadastro,
        desconto: values.desconto,
        peso: values.peso,
      };

      // Substitua a URL para o seu endpoint de backend
      const response = await fetch(
        "https://produtosform-production.up.railway.app/produtos", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        const errorText = await response.json();
        console.error("Erro ao enviar os dados:", errorText);
        message.error(errorText.message || "Erro ao cadastrar o produto.");
        return;
      }

      const data = await response.json();
      if (response.ok) {
        message.success("Produto cadastrado com sucesso!");
        dispatch(addProduct(data)); // Adicionar o produto ao Redux
        form.resetFields();
      }
    } catch (error) {
    console.error("Erro ao enviar os dados:", error);
      message.error("Erro ao cadastrar o produto.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (info: any) => {
    let fileListTemp = [...info.fileList];
    // Limitar o número de arquivos (se necessário)
    fileListTemp = fileListTemp.slice(-1); // Apenas o último arquivo selecionado
    setFileList(fileListTemp);

    // Gerar a URL temporária para exibição da imagem
    const file = fileListTemp[0]?.originFileObj;
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url); // Usamos a URL temporária para exibir a imagem
    }
  };

  return (
    <section className="container_products">
      <CustomHeader
        title="Cadastro de Produtos"
        icon={<FaPlusCircle />}
        breadcrumbs={[
          { label: "Clientes", icon: <IoHomeSharp />, link: "/clients" },
          {
            label: "Lista de Produtos",
            icon: <IoPeopleSharp />,
            link: "/productList",
          },
          { label: "Listar", icon: <IoSearchSharp /> },
        ]}
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ status: "ativo" }}
        className="form_products"
      >
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
              rules={[{ required: true, message: "Insira a descrição do produto" }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Ex.: Notebook com processador Intel Core i7, 16GB RAM..."
              />
            </Form.Item>
          </div>

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

            <Form.Item
              label="Desconto (%)"
              name="desconto"
              rules={[
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

            <Form.Item
              label="Peso (kg)"
              name="peso"
              rules={[
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

        <div className="form_section_2_catetegory">
          <div style={{ width: "50%" }}>
            <Form.Item
              label="Categoria"
              name="categoria"
              rules={[{ required: true, message: "Selecione a categoria do produto" }]}
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
              rules={[{ required: true, message: "Selecione o status do produto" }]}
              className="form_item_half"
            >
              <Select>
                <Option value="ativo">Ativo</Option>
                <Option value="inativo">Inativo</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="form_row">
            <div style={{ width: "50%" }}>
              <Form.Item
                label="Data de Cadastro"
                name="dataCadastro"
                rules={[{ required: true, message: "Selecione a data de cadastro" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Marca"
                name="marca"
                rules={[{ required: true, message: "Insira a marca do produto" }]}
              >
                <Input placeholder="Ex.: Dell, Samsung, LG" />
              </Form.Item>
            </div>

            <Form.Item
              label="Imagem do Produto"
              name="imagem"
              valuePropName="fileList"
              getValueFromEvent={(e: any) =>
                Array.isArray(e) ? e : e?.fileList
              }
              extra="Carregue a imagem do produto (JPG, PNG, etc.)"
              rules={[{ required: true, message: "Por favor, envie uma imagem do produto!" }]}
            >
             <Upload
              name="file"
              listType="picture-card"
              beforeUpload={() => false}
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Clique para carregar</div>
              </div>
            </Upload>
            </Form.Item>
          </div>
        </div>

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
