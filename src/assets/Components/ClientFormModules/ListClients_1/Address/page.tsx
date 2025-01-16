import { Form, Input, message } from "antd";
import { FormInstance } from "antd/es/form"; // Importando FormInstance
import axios from "axios"; // Importando axios para substituir fetch
import "./Address.css";
import React from "react";

interface AddressProps {
  form: FormInstance; // Usando o tipo mais específico do Ant Design
}

function Address({ form }: AddressProps) {
  const handleCepSearch = async (cep: string) => {
    const formattedCep = cep.replace(/\D/g, ""); // Remove traços e espaços
    if (!formattedCep || formattedCep.length !== 8) {
      message.error("CEP inválido. Por favor, insira um CEP válido.");
      return;
    }
  
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${formattedCep}/json/`
      );
  
      if (!response.data.erro) {
        form.setFieldsValue({
          logradouro: response.data.logradouro,
          bairro: response.data.bairro,
          cidade: response.data.localidade,
          estado: response.data.uf,
          pais: "Brasil",
        });
      } else {
        message.error("CEP não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
      message.error("Erro ao buscar o CEP. Detalhes no console.");
    }
  };
  
  
  
  
  

  return (
    <div className="address-container">
      <h2>Endereço</h2>

      <div className="form-row">
        <Form.Item
          name="cep"
          label="CEP"
          rules={[{ required: true, message: "Por favor insira o CEP!" }]}
          className="form-col"
        >
          <Input
            placeholder="Informe o CEP"
            maxLength={8}
            onBlur={(e) => handleCepSearch(e.target.value)} // Dispara a busca do CEP ao sair do campo
          />
        </Form.Item>

        <Form.Item name="logradouro" label="Logradouro" className="form-col">
          <Input placeholder="Informe o logradouro" />
        </Form.Item>

        <Form.Item
          name="numero"
          label="Número"
          rules={[{ required: true, message: "Por favor insira o número!" }]}
          className="form-col"
        >
          <Input placeholder="Informe o número" />
        </Form.Item>

        <Form.Item name="complemento" label="Complemento" className="form-col">
          <Input placeholder="Informe o complemento" />
        </Form.Item>

        <Form.Item name="bairro" label="Bairro" className="form-col">
          <Input placeholder="Informe o bairro" />
        </Form.Item>

        <Form.Item name="cidade" label="Cidade" className="form-col">
          <Input placeholder="Informe a cidade" />
        </Form.Item>

        <Form.Item name="estado" label="Estado" className="form-col">
          <Input placeholder="Informe o estado" />
        </Form.Item>

        <Form.Item
          name="pais"
          label="País"
          rules={[{ required: true, message: "Por favor insira o país!" }]}
          className="form-col"
        >
          <Input placeholder="Informe o país" />
        </Form.Item>
      </div>
    </div>
  );
}

export default Address;
