import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { message, Input, Button, Spin } from 'antd';
import './EditClient.css';
import React from 'react';
import axios from 'axios';
const baseURL = "https://clientes-production-df47.up.railway.app"; 
// Em ambos os arquivos, modifique a definição da interface Client
interface Client {
  _id: string;
  id: string;  // Certifique-se de que id é obrigatório aqui
  nome: string;
  tipo: string;
  situacao: string;
  telefone: string;
  celular: string;
  email: string;
  cadastradoEm: string;
}

interface EditClientProps {
  client: Client | null;
  onClose: () => void;
  onSave: (updatedClient: Client) => void;
}

const EditClient: React.FC<EditClientProps> = ({ client, onClose, onSave }) => {
  const [editedClient, setEditedClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (client) {
      setEditedClient(client);
    }
  }, [client]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedClient) {
      const updatedClient = { ...editedClient, [e.target.name]: e.target.value };
      setEditedClient(updatedClient);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editedClient && editedClient._id) {
      setLoading(true);
      try {
        if (!editedClient.email || !editedClient.nome) {
          message.error("Nome e E-mail são obrigatórios!");
          return;
        }
  
        // Verifique o payload
        const updatedClient = {
          nome: editedClient.nome,
          email: editedClient.email,
          telefone: editedClient.telefone,
          celular: editedClient.celular,
          situacao: editedClient.situacao,
          idade: 45 // Se for necessário, adicione o campo de idade
        };
  
        const response = await axios.put(
          `https://clientes-production-df47.up.railway.app/clientes/${editedClient._id}`,
          updatedClient,
          { headers: { "Content-Type": "application/json" } }
        );
  
        onSave(response.data.client);
        // message.success("Cliente atualizado com sucesso!");
        onClose();
      } catch (error: any) {
        console.error("Erro ao atualizar cliente:", error);
        message.error(error.response?.data?.message || "Erro ao atualizar cliente!");
      } finally {
        setLoading(false);
      }
    } else {
      message.error("Dados do cliente ou ID inválido!");
    }
  };
  

  if (!editedClient) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        <h3>Editar Cliente</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome">Nome</label>
            <Input
              type="text"
              id="nome"
              name="nome"
              value={editedClient.nome}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="telefone">Telefone</label>
            <Input
              type="text"
              id="telefone"
              name="telefone"
              value={editedClient.telefone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={editedClient.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              className="btn_edit"
              disabled={loading}
              style={{ marginRight: '10px' }}
            >
              {loading ? <Spin size="small" /> : 'Salvar alterações'}
            </Button>
            <Button type="default" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default EditClient;
