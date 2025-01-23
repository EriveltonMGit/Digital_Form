import React, { useState } from "react";
import { Form, Input, Button, Table, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import './NoteComponent.css'
import CustomHeader from "../../../Page/CustomHeader/CustomHeader";
import { GrCatalog } from "react-icons/gr";
import { IoCartSharp, IoCubeSharp, IoHomeSharp } from "react-icons/io5";
const NoteComponent: React.FC = () => {
  const [form] = Form.useForm();
  const [notes, setNotes] = useState<any[]>([]);

  // Salvar uma nova nota
  const handleSave = (values: any) => {
    const newNote = {
      key: notes.length + 1,
      title: values.title,
      description: values.description,
      amount: parseFloat(values.amount).toFixed(2),
    };

    setNotes([...notes, newNote]);
    form.resetFields();

    notification.success({
      message: "Nota Emitida",
      description: "A nota foi salva com sucesso!",
      placement: "topRight",
    });
  };

  // Colunas para a tabela de notas
  const columns = [
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Valor (R$)",
      dataIndex: "amount",
      key: "amount",
      render: (value: string) => `R$ ${value}`,
    },
  ];

  return (
    <section className="container_noteComponent">
    

      <CustomHeader
        title="Emissão de Notas"
        icon={<GrCatalog />}
        breadcrumbs={[
          { label: "Início", icon: <IoHomeSharp />, link: "/" }, // Página inicial do sistema
          { label: "Catálogo", icon: <IoCubeSharp />, link: "/catalogo" }, // Seção de catálogo geral
          { label: "Produtos em Estoque", icon: <IoCartSharp /> }, // Página atual
        ]}
      />


      {/* Formulário para emissão de notas */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        className="container_note"
      >
        <Form.Item
          label="Título"
          name="title"
          rules={[{ required: true, message: "Por favor, insira o título da nota!" }]}
        >
          <Input placeholder="Título da nota" />
        </Form.Item>

        <Form.Item
          label="Descrição"
          name="description"
          rules={[{ required: true, message: "Por favor, insira a descrição!" }]}
        >
          <Input.TextArea rows={4} placeholder="Descrição da nota" />
        </Form.Item>

        <Form.Item
          label="Valor (R$)"
          name="amount"
          rules={[
            { required: true, message: "Por favor, insira o valor da nota!" },
            { pattern: /^\d+(\.\d{1,2})?$/, message: "Insira um valor válido!" },
          ]}
        >
          <Input placeholder="0.00" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="btn_note" icon={<PlusOutlined />}>
          Emitir Nota
        </Button>
      </Form>

      {/* Tabela de notas emitidas */}
      <Table
        dataSource={notes}
        columns={columns}
        pagination={{ pageSize: 5 }}
        bordered
        locale={{ emptyText: "Nenhuma nota emitida ainda." }}
        className="table_noteComponent"
      />
    </section>
  );
};

export default NoteComponent;
