import React, { useEffect, useState } from "react";
import { Form, Switch, Select, Button, Row, Col, Slider, notification } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./PreferencesSettings.css";

const { Option } = Select;

const PreferencesSettings: React.FC = () => {
  const [form] = Form.useForm();

  const [preferences, setPreferences] = useState({
    tema: "claro",
    idioma: "pt-BR",
    notificacoes: true,
    fonte: "Arial",
    tamanhoFonte: 14,
    acessibilidade: false,
  });

  // Aplica as configurações de tema, fonte e tamanho da fonte dinamicamente
  useEffect(() => {
    document.body.style.backgroundColor = preferences.tema === "escuro" ? "#333" : "#fff";
    document.body.style.color = preferences.tema === "escuro" ? "#fff" : "#000";
    document.body.style.fontFamily = preferences.fonte;
    document.body.style.fontSize = `${preferences.tamanhoFonte}px`;
  }, [preferences]);

  // Função para salvar as configurações
  const handleSave = (values: any) => {
    setPreferences(values);
    notification.success({
      message: "Configurações Salvas",
      description: "As preferências foram aplicadas com sucesso!",
      placement: "topRight",
      duration: 3,
    });
  };

  // Função para redefinir configurações para o estado inicial
  const handleReset = () => {
    const defaultPreferences = {
      tema: "claro",
      idioma: "pt-BR",
      notificacoes: true,
      fonte: "Arial",
      tamanhoFonte: 14,
      acessibilidade: false,
    };
    setPreferences(defaultPreferences);
    form.setFieldsValue(defaultPreferences);
  };

  // Atualiza o tamanho da fonte dinamicamente
  const handleFontSizeChange = (value: number) => {
    setPreferences((prev) => ({ ...prev, tamanhoFonte: value }));
  };

  return (
    <section className="container_PreferencesSettings">
      <h2>Configurações de Preferências</h2>
      <Form
        form={form}
        initialValues={preferences}
        onFinish={handleSave}
        layout="vertical"
        className="form_preferences"
      >
        <Row gutter={24}>
          <Col span={12}>
            {/* Tema */}
            <Form.Item
              label="Tema"
              name="tema"
              rules={[{ required: true, message: "Por favor, selecione um tema!" }]}
            >
              <Select placeholder="Selecione o tema">
                <Option value="claro">Claro</Option>
                <Option value="escuro">Escuro</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* Idioma */}
            <Form.Item
              label="Idioma"
              name="idioma"
              rules={[{ required: true, message: "Por favor, selecione um idioma!" }]}
            >
              <Select placeholder="Selecione o idioma">
                <Option value="pt-BR">Português (Brasil)</Option>
                <Option value="en-US">Inglês (EUA)</Option>
                <Option value="es-ES">Espanhol</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            {/* Notificações */}
            <Form.Item
              label="Notificações"
              name="notificacoes"
              valuePropName="checked"
            >
              <Switch
                checkedChildren="Ativado"
                unCheckedChildren="Desativado"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* Acessibilidade */}
            <Form.Item
              label="Modo de Acessibilidade"
              name="acessibilidade"
              valuePropName="checked"
            >
              <Switch
                checkedChildren="Ligado"
                unCheckedChildren="Desligado"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            {/* Fonte */}
            <Form.Item
              label="Fonte"
              name="fonte"
              rules={[{ required: true, message: "Por favor, selecione uma fonte!" }]}
            >
              <Select placeholder="Selecione a fonte">
                <Option value="Arial">Arial</Option>
                <Option value="Times New Roman">Times New Roman</Option>
                <Option value="Roboto">Roboto</Option>
                <Option value="Verdana">Verdana</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* Tamanho da Fonte */}
            <Form.Item
              label="Tamanho da Fonte"
              name="tamanhoFonte"
            >
              <Slider
                min={10}
                max={24}
                step={1}
                value={preferences.tamanhoFonte}
                onChange={handleFontSizeChange}
                tooltip={{ formatter: (value) => `${value}px` }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Botões */}
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<CheckOutlined />}>
            Salvar
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={handleReset}
            icon={<CloseOutlined />}
          >
            Redefinir
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default PreferencesSettings;
