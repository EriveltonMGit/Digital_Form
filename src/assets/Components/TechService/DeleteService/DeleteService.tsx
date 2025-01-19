import React from "react";
import { Button } from "antd";
import { AiOutlineDelete } from "react-icons/ai"; // Ícone de exclusão
// IMPORT CSS 
import './DeleteService.css'

interface DeleteButtonProps {
  onClick: () => void; // Função chamada ao clicar no botão
}

const DeleteService: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      type="link"
      danger
      icon={<AiOutlineDelete />}
      className="btn_delete_service" // Classe para aplicar os estilos
    >
    </Button>
  );
};

export default DeleteService;
