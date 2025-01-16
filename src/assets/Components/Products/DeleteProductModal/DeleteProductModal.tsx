import { useState } from 'react';
import { Modal, Input, message } from 'antd';
import './DeleteProducts.css';
import React from 'react';

interface DeleteProductModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void; // Esta função deve ser chamada para deletar o produto
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  visible,
  onClose,
  onDelete,
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false); // Para controle do erro de senha

  const handleConfirmDelete = () => {
    if (password === "admin") {
      onDelete(); // Executa a função de exclusão no Redux
      setPassword(""); // Limpa o campo de senha
      onClose(); // Fecha o modal após a exclusão
      message.success("Produto excluído com sucesso!");
    } else {
      setError(true); // Exibe a mensagem de erro
      message.error("Senha incorreta!");
    }
  };

  return (
    <Modal
      open={visible}
      title="Excluir Produto"
      onCancel={onClose}
      onOk={handleConfirmDelete}
      okText="Excluir"
      cancelText="Cancelar"
      okButtonProps={{ danger: true }}
      footer={[
        <div className="modal-footer-buttons" key="buttons">
          <button className="ant-btn" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="ant-btn ant-btn-dangerous"
            onClick={handleConfirmDelete}
          >
            Excluir
          </button>
        </div>,
      ]}
    >
      <p>Tem certeza que deseja excluir este produto?</p>
      <Input.Password
        placeholder="Digite a senha para confirmar"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError(false); // Limpa o erro caso o usuário altere a senha
        }}
        style={{ marginTop: 16 }}
        status={error ? "error" : ""} // Aplica a classe de erro caso a senha seja inválida
      />
    </Modal>
  );
};


export default DeleteProductModal;
