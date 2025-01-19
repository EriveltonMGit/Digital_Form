import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Modal, Input, Form, Select, Space, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import CustomHeader from "../../../../Page/CustomHeader/CustomHeader";
import { GrCatalog } from "react-icons/gr";
import { IoHomeSharp, IoPeopleSharp, IoSearchSharp } from "react-icons/io5";

// Importação dos botões personalizados
import EditButton from "../EditService/EditService";
import DeleteButton from "../DeleteService/DeleteService";

import "./ServiceRequestTable.css";

interface ServiceRequest {
  id: string;
  name: string;
  email: string;
  description: string;
  price: number;
  status?: string;
  createdAt: string;
}
interface ServiceRequestTableProps {
  serviceRequests: ServiceRequest[];
}
const ServiceRequestTable: React.FC = () => {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [editingService, setEditingService] = useState<ServiceRequest | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(
    null
  );

  // Buscar dados da API
  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const response = await axios.get("http://localhost:3006/services");
        const adaptedData = response.data.map((service: any) => ({
          id: service._id,
          name: service.name,
          email: service.email,
          description:
            service.description || service.message || "Sem descrição",
          price: service.price || 0,
          status: service.status || "Em andamento",
          createdAt: new Date(service.createdAt).toLocaleDateString("pt-BR"),
        }));
        setServiceRequests(adaptedData);
      } catch (error) {
        console.error("Erro ao buscar as solicitações de serviço:", error);
      }
    };

    fetchServiceRequests();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingServiceId(id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    const adminPassword = "admin";
    if (password === adminPassword) {
      try {
        await axios.delete(
          `http://localhost:3006/services/${deletingServiceId}`
        );
        setServiceRequests(
          serviceRequests.filter((service) => service.id !== deletingServiceId)
        );
        setIsDeleteModalVisible(false);
        setPassword("");
        Modal.success({
          content: "Serviço deletado com sucesso!",
        });
      } catch (error) {
        console.error("Erro ao deletar o serviço:", error);
        Modal.error({
          content: "Erro ao deletar o serviço!",
        });
      }
    } else {
      Modal.error({
        content: "Senha incorreta!",
      });
    }
  };

  const handleEdit = (service: ServiceRequest) => {
    setEditingService(service);
    setIsEditing(true);
  };

  const handleUpdate = async (values: ServiceRequest) => {
    try {
      await axios.put(
        `http://localhost:3006/services/${editingService?.id}`,
        values
      );
      setServiceRequests(
        serviceRequests.map((service) =>
          service.id === editingService?.id
            ? { ...service, ...values }
            : service
        )
      );
      setIsEditing(false);
      setEditingService(null);
      Modal.success({
        content: "Serviço atualizado com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao atualizar o serviço:", error);
      Modal.error({
        content: "Erro ao atualizar o serviço!",
      });
    }
  };

  const columns: ColumnsType<ServiceRequest> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id: string) => (id ? id.slice(0, 4) : ""),
    },
    {
      title: "Nome do Serviço",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "E-mail do Cliente",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
      render: (price) => `R$ ${price.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Concluído" ? "green" : "blue";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Data de Criação",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Ações",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditButton onClick={() => handleEdit(record)} />
          <DeleteButton onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <CustomHeader
        title="Serviços Em andamento"
        icon={<GrCatalog />}
        breadcrumbs={[
          { label: "Início", icon: <IoHomeSharp />, link: "/" },
          { label: "Catálogo", icon: <IoPeopleSharp />, link: "/techcatalog" },
          { label: "Em breve", icon: <IoSearchSharp /> },
        ]}
        className="services_list_header"
      />
      <Table
        className="table_services_list"
        columns={columns}
        dataSource={serviceRequests}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Editar Serviço"
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={null}
      >
        {editingService && (
          <Form initialValues={editingService} onFinish={handleUpdate}>
            <Form.Item
              label="Nome do Serviço"
              name="name"
              rules={[{ required: true, message: "Por favor, insira o nome!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Descrição"
              name="description"
              rules={[
                { required: true, message: "Por favor, insira a descrição!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Preço"
              name="price"
              rules={[
                { required: true, message: "Por favor, insira o preço!" },
              ]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              initialValue={editingService?.status} // Verifique se está inicializado corretamente
            >
              <Select>
                <Select.Option value="Em andamento">Em andamento</Select.Option>
                <Select.Option value="Concluído">Concluído</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="btn_att">
                Atualizar Serviço
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
      <Modal
        title="Confirmação de Deletação"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={
          <div className="modal-footer">
            <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
              Cancelar
            </Button>
            <Button key="submit" type="primary" onClick={confirmDelete}>
              Deletar
            </Button>
          </div>
        }
      >
        <p>Para deletar este serviço, insira a senha de admin:</p>
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha de Admin"
        />
      </Modal>
    </>
  );
};

export default ServiceRequestTable;
