import React, { useState, useEffect } from "react";
import { Modal, Input, notification } from "antd";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateBudget } from '../../../../redux/budgetSlice';

interface Budget {
  key: string; // A propriedade 'key' também deve ser aqui
  cliente: string;
  descricao: string;
  valor: number;
  prazoEntrega: string;
  status: string;
  desconto?: number;
  categoria: string;
  observacoes: string;
  email: string;
  _id?: string; // Se necessário, adicione '_id'
}

interface EditBudgetModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (updatedBudget: Budget) => void;
  currentBudget: Budget | null;
}

const EditBudgetModal: React.FC<EditBudgetModalProps> = ({
  visible,
  onCancel,
  onSave,
  currentBudget,
}) => {
  const [budget, setBudget] = useState<Budget | null>(currentBudget);
  const dispatch = useDispatch();  // Usando o hook useDispatch para acessar dispatch

  useEffect(() => {
    if (currentBudget) {
      if (currentBudget._id) {
        setBudget(currentBudget); // Atualiza o orçamento com o _id válido
      } else {
        console.error("Orçamento inválido ou sem _id");
        setBudget(null); // Define o estado como null, se o orçamento for inválido
      }
    }
  }, [currentBudget]);

  const handleSave = async () => {
    if (!budget || !budget._id) {
      notification.error({
        message: 'Erro',
        description: 'O orçamento não possui um _id válido.',
      });
      console.error("Orçamento com _id undefined não encontrado");
      return; // Impede a execução do código seguinte se o _id não for válido
    }
  
    try {
      const response = await axios.put(
        `https://orcamentosbeck-production.up.railway.app/orcamentos/${budget._id}`,
        budget
      );
  
      if (response.status === 200 && response.data) {
        dispatch(updateBudget(response.data)); // Atualiza o estado no Redux
        onCancel(); // Fecha o modal
        notification.success({
          message: 'Sucesso',
          description: 'Orçamento editado com sucesso!',
        });
      } else {
        throw new Error("Falha ao atualizar orçamento");
      }
    } catch (error) {
      console.error("Erro ao salvar orçamento:", error);
      notification.error({
        message: 'Erro',
        description: 'Ocorreu um erro ao editar o orçamento. Tente novamente.',
      });
    }
  };

  const handleChange = (field: keyof Budget, value: string | number) => {
    if (budget) {
      // Verificação para garantir que o tipo de valor está correto
      setBudget({ ...budget, [field]: value });
    }
  };

  return (
    <Modal
      title="Editar Orçamento"
      open={visible}
      onCancel={onCancel}
      onOk={handleSave}
    >
      {budget && (
        <>
          <Input
            value={budget.cliente}
            onChange={(e) => handleChange("cliente", e.target.value)}
            placeholder="Cliente"
          />
          <Input
            value={budget.descricao}
            onChange={(e) => handleChange("descricao", e.target.value)}
            placeholder="Descrição"
            style={{ marginTop: "10px" }}
          />
          <Input
            value={budget.valor}
            onChange={(e) =>
              handleChange("valor", parseFloat(e.target.value) || 0) // Garantir que seja um número
            }
            placeholder="Valor"
            style={{ marginTop: "10px" }}
          />
          <Input
            value={budget.prazoEntrega}
            onChange={(e) => handleChange("prazoEntrega", e.target.value)}
            placeholder="Prazo de Entrega"
            style={{ marginTop: "10px" }}
          />
          <Input
            value={budget.status}
            onChange={(e) => handleChange("status", e.target.value)}
            placeholder="Status"
            style={{ marginTop: "10px" }}
          />
          <Input
            value={budget.categoria}
            onChange={(e) => handleChange("categoria", e.target.value)}
            placeholder="Categoria"
            style={{ marginTop: "10px" }}
          />
          <Input
            value={budget.observacoes}
            onChange={(e) => handleChange("observacoes", e.target.value)}
            placeholder="Observações"
            style={{ marginTop: "10px" }}
          />
          <Input
            value={budget.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Email"
            style={{ marginTop: "10px" }}
          />
        </>
      )}
    </Modal>
  );
};

export default EditBudgetModal;
