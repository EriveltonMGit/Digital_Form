import { useState } from "react";
import { Modal, Input, message, Spin } from "antd";
import { useDispatch } from "react-redux"; // Importando useDispatch
import axios from "axios";
import { deleteClient } from "../../../../../redux/clientsSlice";
import "./DeleteClient.css";
import React from "react";
const baseURL = "https://clientes-production-df47.up.railway.app"; 
interface DeleteClientProps {
  clientId: string | null;
  onClose: () => void;
  onDelete: (clientId: string) => Promise<void>;
}

const DeleteClient: React.FC<DeleteClientProps> = ({ clientId, onClose, }) => {
  const dispatch = useDispatch(); // Inicializando o dispatch
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirmDelete = async () => {
    if (password === "admin") {
      setLoading(true);
      try {
        if (clientId) {
          // Atualiza Redux antes da requisição
          dispatch(deleteClient(clientId));
  
          const response = await axios.delete(`${baseURL}/clientes/${clientId}`);
          if (response.status === 200) {
            message.success("Cliente excluído com sucesso!");
          } else {
            message.error("Falha ao excluir cliente no servidor!");
          }
        }
      } catch (error: any) {
        console.error("Erro ao deletar cliente:", error);
        message.error(error.response?.data?.message || "Erro ao excluir cliente!");
      } finally {
        setLoading(false);
        onClose();
        setPassword("");
      }
    } else {
      message.error("Senha incorreta!");
    }
  };
  

  return (
    <Modal
      title="Confirmar Exclusão"
      open={clientId !== null}
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
            disabled={loading}
          >
            {loading ? <Spin size="small" /> : "Excluir"}
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
          autoComplete="off"
        />
      </form>
    </Modal>
  );
};

export default DeleteClient;
