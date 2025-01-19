import { useState } from "react";
import { Modal, Input, message } from "antd"; // Importando o 'message'
import { useDispatch } from "react-redux";
import axios from "axios";
import { deleteEmployee } from "../../../../redux/employeesSlice";
// IMPORT CSS
import "./DeleteOfficials.css";
import React from "react";

interface DeleteEmployeeProps {
  employeeId: string | null; // Substituindo 'clientId' por 'employeeId'
  onClose: () => void;
}

const DeleteEmployeeModal: React.FC<DeleteEmployeeProps> = ({ employeeId, onClose }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");

  const handleConfirmDelete = async () => {
    if (password === "admin") {
      try {
        if (employeeId) {
          await axios.delete(`http://localhost:3004/funcionarios/${employeeId}`);
          dispatch(deleteEmployee(employeeId)); // Atualiza o Redux
          message.success("Funcionário excluído com sucesso!"); // Mensagem de sucesso
        }
        onClose(); // Fecha o modal
        setPassword(""); // Reseta a senha
      } catch (error) {
        console.error("Erro ao deletar funcionário:", error);
        message.error("Erro ao excluir funcionário!"); // Mensagem de erro
      }
    } else {
      message.error("Senha incorreta!"); // Mensagem de erro para senha incorreta
    }
  };

  return (
    <Modal
      title="Confirmar Exclusão"
      open={!!employeeId}
      onCancel={onClose}
      footer={[
        <div className="modal-footer-buttons" key="buttons">
          <button key="cancel" className="ant-btn" onClick={onClose}>
            Cancelar
          </button>
          <button
            key="delete"
            className="ant-btn ant-btn-dangerous"
            onClick={handleConfirmDelete}
          >
            Excluir
          </button>
        </div>,
      ]}
    >
      <p>Tem certeza que deseja excluir este funcionário?</p>
      <form>
        <Input
          type="password"
          placeholder="Digite a senha para confirmar"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%" }}
          autoComplete="off" // Ajustando o atributo autocomplete
        />
      </form>
    </Modal>
  );
};

export default DeleteEmployeeModal;
