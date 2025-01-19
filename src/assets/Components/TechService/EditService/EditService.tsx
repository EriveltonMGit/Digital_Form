import React from "react";
import { Button } from "antd";
import { FiEdit } from "react-icons/fi"; // Ícone de edição

interface EditButtonProps {
  onClick: () => void; // Função chamada ao clicar no botão
}

const EditService: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      type="link"
      icon={<FiEdit />}
      style={{ display: "flex", alignItems: "center", gap: "4px" }}
    >
   
    </Button>
  );
};

export default EditService;
