import React, { useState, useMemo } from "react";
import {
  Card,
  Input,
  Row,
  Col,
  Button,
  Modal,
  Typography,
  Tabs,
  Image,
  Form,
  Input as FormInput,
  message,
} from "antd";
import { SearchOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { GrCatalog } from "react-icons/gr";
import CustomHeader from "../../Page/CustomHeader/CustomHeader";
import techServices, {
  TechService,
} from "../../assets/Components/TechService/TechServiceList";
import { IoHomeSharp, IoPeopleSharp, IoSearchSharp } from "react-icons/io5";
import "./TechServiceCatalog.css";

const { Paragraph } = Typography;

const TechServiceCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedService, setSelectedService] = useState<TechService | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const filteredServices = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return techServices.filter((service) =>
      service.name.toLowerCase().includes(lowerSearchTerm)
    );
  }, [searchTerm]);

  const handleDetailsClick = (service: TechService) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    const { name, email, description, price } = values;
    const serviceName = selectedService?.name;

    const requestData = {
      name,
      email,
      description, // Alterado para 'description'
      serviceName,
      price,
    };

    try {
      const response = await fetch("http://localhost:3006/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData), // Envia os dados como JSON
      });

      const data = await response.json();
      if (response.ok) {
        message.success("Solicitação de serviço enviada com sucesso!");
        form.resetFields();
        handleCloseModal();
      } else {
        message.error(data.message || "Erro ao enviar a solicitação.");
      }
    } catch (error) {
      message.error("Erro ao enviar a solicitação.");
    } finally {
      setLoading(false);
    }
  };
  const tabItems = [
    {
      key: "1",
      label: "Detalhes",
      children: <Paragraph>{selectedService?.description}</Paragraph>,
    },
    {
      key: "2",
      label: "Contato",
      children: (
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Seu Nome"
            rules={[{ required: true, message: "Por favor, insira seu nome." }]}
          >
            <FormInput placeholder="Digite seu nome" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Seu E-mail"
            rules={[
              { required: true, message: "Por favor, insira seu e-mail." },
            ]}
          >
            <FormInput type="email" placeholder="Digite seu e-mail" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descrição do Serviço"
            rules={[
              { required: true, message: "Por favor, insira uma descrição." },
            ]}
          >
            <FormInput.TextArea
              rows={4}
              placeholder="Digite a descrição do serviço"
            />
          </Form.Item>

          <Form.Item
            name="price"
            label="Preço do Serviço"
            rules={[{ required: true, message: "Por favor, insira o preço." }]}
          >
            <FormInput type="number" placeholder="Digite o preço do serviço" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Enviar Solicitação
          </Button>
        </Form>
      ),
    },
  ];

  return (
    <section className="TechServiceCatalog">
      <CustomHeader
        title="Catálogo de Serviços"
        icon={<GrCatalog />}
        breadcrumbs={[
          { label: "Início", icon: <IoHomeSharp />, link: "/" },
          {
            label: "Lista de Serviços",
            icon: <IoPeopleSharp />,
            link: "/servicerequesttable",
          },
          { label: "Em breve", icon: <IoSearchSharp /> },
        ]}
      />
      <Input
        placeholder="Pesquisar serviços..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        prefix={<SearchOutlined />}
        className="input_services_catalog"
      />

      <Row gutter={[16, 16]} className="table_catalog_services">
        {filteredServices.map((service) => (
          <Col key={service.id} xs={24} sm={12} md={8} lg={6}>
            {" "}
            {/* Adicionando a chave única aqui */}
            <Card
              hoverable
              actions={[
                <Button
                  key="info"
                  type="link"
                  icon={<InfoCircleOutlined />}
                  onClick={() => handleDetailsClick(service)}
                >
                  Detalhes
                </Button>,
              ]}
            >
              <div className="card-icon">{service.icon}</div>
              <Card.Meta
                title={service.name}
                description={
                  <>
                    <p>{service.description}</p>
                    <p>
                      <strong>Preço:</strong> R$ {service.price.toFixed(2)}
                    </p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={selectedService?.name}
        open={!!selectedService}
        onCancel={handleCloseModal}
        footer={null}
        className="modal_services"
      >
        {selectedService && (
          <>
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <div className="modal-icon-large">{selectedService.icon}</div>
                <Paragraph>{selectedService.details}</Paragraph>
              </Col>
              <Col xs={24} md={12}>
                <Image.PreviewGroup>
                  {selectedService.gallery.map((url, index) => (
                    <Image
                      key={index}
                      src={url}
                      alt={`Galeria ${index + 1}`}
                      width="100%"
                    />
                  ))}
                </Image.PreviewGroup>
              </Col>
            </Row>
            <Tabs items={tabItems} className="modal-tabs" />
          </>
        )}
      </Modal>
    </section>
  );
};

export default TechServiceCatalog;
