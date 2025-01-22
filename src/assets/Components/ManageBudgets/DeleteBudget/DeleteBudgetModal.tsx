import React, { useState } from "react";
import { Modal, Button, Input, notification } from "antd";
import { useDispatch } from "react-redux"; // Para despachar as ações do Redux
import { deleteBudget } from "../../../../redux/budgetSlice"; // Importe a ação do Redux

interface DeleteBudgetModalProps {
  visible: boolean;
  onCancel: () => void;
  onDelete: (key: string) => void; // Para exclusão do servidor
  budgetKey: string | null;
}

const DeleteBudgetModal: React.FC<DeleteBudgetModalProps> = ({
  visible,
  onCancel,
  onDelete,
  budgetKey,
}) => {
  const [password, setPassword] = useState<string>(""); // Estado para a senha
  const [error, setError] = useState<string>(""); // Estado para erros de senha
  const dispatch = useDispatch(); // Usando o dispatch do Redux

  const handleDelete = () => {
    if (password === "admin") {
      if (budgetKey) {
        // Exclui do servidor
        onDelete(budgetKey);

        // Atualiza o estado local para remover o item imediatamente
        dispatch(deleteBudget(budgetKey));

        // Fecha o modal e notifica
        onCancel();
        notification.success({
          message: "Sucesso",
          description: "Orçamento excluído com sucesso!",
        });
      }
    } else {
      setError("Senha incorreta. Tente novamente.");
    }
  };

  return (
    <Modal
      title="Confirmar Exclusão"
      visible={visible}
      onCancel={onCancel}
      onOk={handleDelete}
      okText="Excluir"
      cancelText="Cancelar"
      okButtonProps={{
        disabled: password !== "admin", // Desabilita o botão de OK enquanto a senha estiver incorreta
      }}
    >
      <p>Tem certeza que deseja excluir este orçamento?</p>
      <Input
        type="password"
        placeholder="Digite a senha para confirmar"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Exibe erro caso senha esteja incorreta */}
    </Modal>
  );
};

export default DeleteBudgetModal;
