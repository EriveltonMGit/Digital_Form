import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Client } from '../../ListClients_2/page';
import axios from 'axios';
import { message, Input, Button } from 'antd'; // Importando Input e Button do Ant Design
import './EditClient.css';
import React from 'react';

interface EditClientProps {
  client: Client | null;
  onClose: () => void;
  onSave: (updatedClient: Client) => void;
}

const EditClient: React.FC<EditClientProps> = ({ client, onClose, onSave }) => {
  const [editedClient, setEditedClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(false);  // Estado de carregamento
  const [, setHasSaved] = useState(false); // Flag para controlar a exibição da mensagem

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
    if (editedClient) {
      console.log("Client to be updated:", editedClient);
  
      if (!editedClient.id) {
        message.error('ID do cliente não encontrado');
        return;
      }
  
      setLoading(true);
      try {
        await axios.put(`http://localhost:3001/clientes/${editedClient.id}`, editedClient);
        onSave(editedClient); // Atualiza o Redux com o cliente editado
        setHasSaved(true);
        onClose();
      } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        message.error('Erro ao atualizar cliente!');
      } finally {
        setLoading(false);
      }
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
          <Button
            type="primary"
            htmlType="submit"
            className='btn_edit'
            disabled={loading}
            style={{ marginRight: '10px' }}
          >
            {loading ? 'Salvando...' : 'Salvar alterações'}
          </Button>
          <Button
            type="default"
            onClick={onClose}
          >
            Cancelar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditClient;
