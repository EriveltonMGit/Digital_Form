import  { useState } from "react";
import { Modal, Input, message } from "antd"; // Importando o 'message'
import { useDispatch } from "react-redux";
import axios from "axios";
import { deleteClient } from "../../../../../redux/clientsSlice";
// IMPORT CSS
import "./DeleteClient.css";
import React from "react";

interface DeleteClientProps {
  clientId: string | null;
  onClose: () => void;
}

const DeleteClient: React.FC<DeleteClientProps> = ({ clientId, onClose }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");

  const handleConfirmDelete = async () => {
    if (password === "admin") {
      try {
        if (clientId) {
          await axios.delete(`https://clientes-production-df47.up.railway.app/clientes/${clientId}`);
          dispatch(deleteClient(clientId)); // Atualiza o Redux
          message.success("Cliente excluído com sucesso!"); // Mensagem de sucesso
        }
        onClose(); // Fecha o modal
        setPassword(""); // Reseta a senha
      } catch (error) {
        console.error("Erro ao deletar cliente:", error);
        message.error("Erro ao excluir cliente!"); // Mensagem de erro
      }
    } else {
      message.error("Senha incorreta!"); // Mensagem de erro para senha incorreta
    }
  };

  return (
    <Modal
      title="Confirmar Exclusão"
      open={!!clientId}
      onCancel={onClose}
      footer={[
        <div className="modal-footer-buttons" key="buttons">
          <button key="cancel" className="ant-btn " onClick={onClose}>
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
      <p>Tem certeza que deseja excluir este cliente?</p>
      <form>
        <Input
          type="password"
          placeholder="Digite a senha para confirmar"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%" }}
          autoComplete="" // Adicionando o atributo autocomplete
        />
      </form>
    </Modal>
  );
};

export default DeleteClient;
