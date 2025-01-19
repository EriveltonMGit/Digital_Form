import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Employee } from '../../OfficialsList/ListOfficials';
import axios from 'axios';
import { message, Input, Button } from 'antd';
import './EditOfficials.css';
import React from 'react';

interface EditEmployeeProps {
  employee: Employee | null;
  onClose: () => void;
  onSave: (updatedEmployee: Employee) => void;
}

const EditOfficials: React.FC<EditEmployeeProps> = ({ employee, onClose, onSave }) => {
  const [editedEmployee, setEditedEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (employee) {
      setEditedEmployee(employee);
    }
  }, [employee]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedEmployee) {
      const updatedEmployee = { ...editedEmployee, [e.target.name]: e.target.value };
      setEditedEmployee(updatedEmployee);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editedEmployee) {
      setLoading(true);
      try {
        await axios.put(`http://localhost:3004/funcionarios/${editedEmployee.id}`, editedEmployee);
        onSave(editedEmployee);
        onClose();
        
      } catch (error) {
        console.error('Erro ao atualizar funcionário:', error);
        message.error('Erro ao atualizar funcionário!');
      } finally {
        setLoading(false);
      }
    }
  };

  if (!editedEmployee) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        <h3>Editar Funcionário</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome">Nome</label>
            <Input
              type="text"
              id="nome"
              name="nome"
              value={editedEmployee.nome}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="telefone">Telefone</label>
            <Input
              type="text"
              id="telefone"
              name="telefone"
              value={editedEmployee.telefone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={editedEmployee.email}
              onChange={handleInputChange}
            />
          </div>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            style={{ marginRight: '10px' }}
          >
            {loading ? 'Salvando...' : 'Salvar alterações'}
          </Button>
          <Button type="default" onClick={onClose}>
            Cancelar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditOfficials;
