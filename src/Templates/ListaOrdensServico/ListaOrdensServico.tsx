import React, { useState } from "react";
import { Table, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import './ListaOrdensServico.css'
// Definindo o tipo para as ordens de serviço
interface OrdemServico {
  id: number;
  responsavel: string;
  status: string;
  data_inicio: string;
  data_termino: string;
  descricao: string;
}

const ListaOrdensServico: React.FC = () => {
  // Estado que mantém a lista de ordens de serviço
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);

  // Função para remover uma ordem de serviço
  const handleDelete = (id: number) => {
    setOrdens(ordens.filter((ordem) => ordem.id !== id));
  };

  // Função para editar uma ordem de serviço (esta pode ser uma implementação de exemplo)
  const handleEdit = (id: number) => {
    console.log("Editar Ordem de Serviço: ", id);
    // Você pode implementar a lógica para editar uma ordem aqui.
  };

  // Colunas para a tabela
  const columns = [
    {
      title: "Responsável",
      dataIndex: "responsavel",
      key: "responsavel",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Data de Início",
      dataIndex: "data_inicio",
      key: "data_inicio",
    },
    {
      title: "Data de Término",
      dataIndex: "data_termino",
      key: "data_termino",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (text: any, record: OrdemServico) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
          >
            Editar
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Excluir
          </Button>
        </span>
      ),
    },
  ];

  return (
    <section className="container_lista_ordens">
      <h2>Lista de Ordens de Serviço</h2>

      {/* Tabela de ordens de serviço */}
      <Table
        columns={columns}
        dataSource={ordens}
        rowKey="id" // Utilizando o 'id' para garantir que cada linha seja única
        pagination={{ pageSize: 5 }}
        className="container_lista_ordens_table"
      />

      {/* Exemplo de um botão para adicionar uma ordem de serviço */}
      <Button
        type="primary"
        onClick={() =>
          setOrdens([
            ...ordens,
            {
              id: ordens.length + 1,
              responsavel: "João Silva",
              status: "Em Andamento",
              data_inicio: "01/01/2025",
              data_termino: "05/01/2025",
              descricao: "Troca de peça",
            },
          ])
        }
      >
        Adicionar Ordem
      </Button>
    </section>
  );
};

export default ListaOrdensServico;
