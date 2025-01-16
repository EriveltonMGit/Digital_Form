import  { useState } from 'react';
import { Modal, Input, message } from 'antd';
import './DeleteSuppliers.css';
import React from 'react';

interface DeleteSupplierModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteSupplierModal: React.FC<DeleteSupplierModalProps> = ({
  visible,
  onClose,
  onDelete,
}) => {
  const [password, setPassword] = useState("");

  const handleConfirmDelete = () => {
    if (password === "admin") {
      onDelete(); 
      setPassword(""); 
      onClose(); 
    } else {
      message.error("Senha incorreta!");
    }
  };

  return (
    <Modal
      open={visible}
      title="Excluir Fornecedor"
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
          <button className="ant-btn ant-btn-dangerous" onClick={handleConfirmDelete}>
            Excluir
          </button>
        </div>,
      ]}
    >
      <p>Tem certeza que deseja excluir este fornecedor?</p>
      <Input.Password
        placeholder="Digite a senha para confirmar"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginTop: 16 }}
      />
    </Modal>
  );
};

export default DeleteSupplierModal;
