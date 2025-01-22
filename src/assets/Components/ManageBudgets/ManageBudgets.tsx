import React, { useState, useEffect } from "react";
import { Table, Space, Tag, Button, Modal, Input, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FaPlusCircle, FaEye } from "react-icons/fa";
import "./ManageBudgets.css";
import CustomHeader from "../../../Page/CustomHeader/CustomHeader";
import { IoHomeSharp, IoPeopleSharp, IoSearchSharp } from "react-icons/io5";
import EditBudgetModal from "../ManageBudgets/EditarBudget/EditBudgetModal"; // Importe o modal de edição

interface Budget {
  key: string;
  cliente: string;
  descricao: string;
  valor: number;
  prazoEntrega: string;
  status: string;
  desconto?: number;
  categoria: string;
  observacoes: string;
  email: string;
  _id?: string;
}

const BudgetTable: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(""); // Estado para conteúdo do modal
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Estado para controle do modal de exclusão
  const [password, setPassword] = useState<string>(""); // Estado para a senha
  const [error, setError] = useState<string>(""); // Estado para erro de senha
  const [budgetToDelete, setBudgetToDelete] = useState<string | null>(null); // Orçamento a ser deletado

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await fetch(
          "https://orcamentosbeck-production.up.railway.app/orcamentos"
        );
        if (!response.ok) {
          throw new Error("Erro ao carregar orçamentos");
        }
        const data = await response.json();
        setBudgets(data);
      } catch (error) {
        console.error("Erro ao carregar orçamentos", error);
      }
    };
    fetchBudgets();
  }, []);

  const handleDelete = async () => {
    if (password === "admin" && budgetToDelete) {
      try {
        const response = await fetch(
          `https://orcamentosbeck-production.up.railway.app/orcamentos/${budgetToDelete}`,
          { method: "DELETE" }
        );
        if (!response.ok) {
          throw new Error("Erro ao excluir orçamento");
        }
        setBudgets((prev) =>
          prev.filter((budget) => budget._id !== budgetToDelete)
        ); // Corrigir a filtragem
        notification.success({
          message: "Orçamento excluído com sucesso!",
        });
        setIsDeleteModalVisible(false); // Fecha o modal após exclusão
      } catch (error) {
        console.error("Erro ao excluir orçamento:", error);
        notification.error({
          message: "Erro",
          description: "Falha ao excluir orçamento.",
        });
      }
    } else {
      setError("Senha incorreta. Tente novamente.");
    }
  };

  const handleEdit = (record: Budget) => {
    if (!record._id) {
      notification.error({
        message: "Erro",
        description: "Orçamento sem um ID válido para edição.",
      });
      return;
    }
    setSelectedBudget(record);
    setIsModalVisible(true);
  };

  const handleSave = (updatedBudget: Budget) => {
    setBudgets((prev) =>
      prev.map((budget) =>
        budget.key === updatedBudget.key ? updatedBudget : budget
      )
    );
    setIsModalVisible(false);
    notification.success({
      message: "Orçamento editado com sucesso!",
    });
  };

  const handleDeleteModal = (key: string) => {
    setBudgetToDelete(key);
    setIsDeleteModalVisible(true); // Exibe o modal de confirmação de exclusão
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedBudget(null); // Limpa o orçamento selecionado
  };

  const showModal = (content: string) => {
    setModalContent(content); // Exibe o conteúdo no modal
    setIsModalVisible(true); // Abre o modal
  };

  const columns: ColumnsType<Budget> = [
    {
      title: "Cliente",
      dataIndex: "cliente",
      key: "cliente",
      width: "15%",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
      render: (descricao: string) => (
        <Button
          type="link"
          icon={<FaEye />}
          onClick={() => showModal(descricao)} // Chama o modal de visualização
          style={{ padding: 0, fontSize: "14px" }}
        />
      ),
      width: "5%",
    },
    {
      title: "Valor (R$)",
      dataIndex: "valor",
      key: "valor",
      render: (valor) => (valor ? `R$ ${valor.toFixed(2)}` : "R$ 0,00"),
      width: "10%",
    },
    {
      title: "Prazo de Entrega",
      dataIndex: "prazoEntrega",
      key: "prazoEntrega",
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "";
        switch (status) {
          case "Concluído":
            color = "green";
            break;
          case "Em andamento":
            color = "blue";
            break;
          case "Parado":
            color = "red";
            break;
          case "Pendente":
            color = "gray";
            break;
          default:
            color = "orange";
        }
        return <Tag color={color}>{status}</Tag>;
      },
      width: "10%",
    },
    {
      title: "Desconto (%)",
      dataIndex: "desconto",
      key: "desconto",
      render: (desconto) => (desconto ? `${desconto}%` : "N/A"),
      width: "4%",
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria",
      width: "15%",
    },
    {
      title: "Observações",
      dataIndex: "observacoes",
      key: "observacoes",
      render: (observacoes: string) => (
        <Button
          type="link"
          icon={<FaEye />}
          onClick={() => showModal(observacoes)} // Chama o modal de visualização
          style={{ padding: 0, fontSize: "14px" }}
        />
      ),
      width: "5%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => (
        <Button
          type="link"
          icon={<FaEye />}
          onClick={() => showModal(email)} // Chama o modal de visualização
          style={{ padding: 0, fontSize: "14px" }}
        />
      ),
      width: "12%",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Editar
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteModal(record._id || "")}
          >
            Excluir
          </Button>
        </Space>
      ),
      width: "15%",
    },
  ];

  return (
    <div className="manage_budgets_container">
      <CustomHeader
        title="Orçamento"
        icon={<FaPlusCircle />}
        breadcrumbs={[
          { label: "Início", icon: <IoHomeSharp />, link: "/clientes" },
          {
            label: "Cadastro Orçamen...",
            icon: <IoPeopleSharp />,
            link: "/budgetform",
          },
          { label: "Listar", icon: <IoSearchSharp /> },
        ]}
      />
      <Table
        className="budget_table"
        columns={columns}
        dataSource={budgets.map((budget, index) => ({
          ...budget,
          key: budget._id || index.toString(),
        }))}
        pagination={{ pageSize: 5 }}
      />

      {/* Modal de Edição */}
      <Modal
        open={isModalVisible && !selectedBudget} // Exibe apenas se for o modal de detalhes
        onCancel={handleModalClose}
        footer={null}
      >
        {modalContent && <p>{modalContent}</p>}
      </Modal>

      {/* Modal de Exclusão com Senha */}
      <Modal
        title="Confirmar Exclusão"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={handleDelete}
        okText="Excluir"
        cancelText="Cancelar"
      >
        <Input.Password
          placeholder="Digite a senha para confirmar a exclusão"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          status={error ? "error" : ""}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Modal>

      {/* Modal de Edição de Orçamento */}
      {selectedBudget && (
        <EditBudgetModal
          visible={isModalVisible} 
          currentBudget={selectedBudget} 
          onCancel={handleModalClose}
          onSave={handleSave} 
        />
      )}
    </div>
  );
};

export default BudgetTable;
