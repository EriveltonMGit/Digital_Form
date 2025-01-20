import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClientsData, updateClient, deleteClient } from "../../../../redux/clientsSlice";
import axios from "axios";
import { FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { message, Input } from "antd"; // Importando Input do Ant Design
import "./ListClients_2.css";
import EditClient from "../ListClients_2/EditClient/EditClient";
import DeleteClient from "../ListClients_2/DeleteClient/DeleteClient";
import React from "react";

// Definindo a URL base para a API
const baseURL = "https://clientes-production-df47.up.railway.app"; // URL da API de produção

export interface Client {
  _id: any;
  id: string;
  nome: string;
  tipo: string;
  situacao: string;
  telefone: string;
  celular: string;
  email: string;
  cadastradoEm: string;
  anexo?: string; // URL do anexo
}

function ListClients_2() {
  const dispatch = useDispatch();
  const clientsData = useSelector(
    (state: { clients: { clientsData: Client[] } }) => state.clients.clientsData
  );
  const [loading, setLoading] = useState(true);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de busca

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${baseURL}/clientes`);
        dispatch(setClientsData(response.data)); // Armazena os clientes no Redux
      } catch (err) {
        console.error(err);
        message.error("Erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, [dispatch]);

  // Função para manipular a exclusão de um cliente
  const handleDeleteClient = async (clientId: string) => {
    try {
      await axios.delete(`${baseURL}/clientes/${clientId}`); // Deletar cliente do banco de dados
      dispatch(deleteClient(clientId)); // Remover o cliente do estado Redux
      message.success("Cliente excluído com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir cliente:", err);
      message.error("Erro ao excluir cliente.");
    }
  };

  // Função para editar cliente
  const handleUpdateClient = async (updatedClient: Client) => {
    setLoading(true);
    try {
      await axios.put(
        `${baseURL}/clientes/${updatedClient.id}`, // Corrigindo a URL para produção
        updatedClient // Dados que você quer atualizar
      );
      dispatch(updateClient(updatedClient)); // Atualiza os dados no Redux
      setEditingClient(null); // Fecha a janela de edição
      message.success("Cliente atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      message.error("Erro ao atualizar cliente!");
    } finally {
      setLoading(false);
    }
  };

  // Função para a busca de clientes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Atualiza o termo de pesquisa
  };

  // Filtrando os clientes conforme o termo de busca
  const filteredClients = clientsData.filter(
    (client) =>
      client.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.telefone.includes(searchTerm) ||
      client.celular.includes(searchTerm)
  );

  return (
    <section className="container_list_clients_2">
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <>
          {editingClient && (
            <EditClient
              client={editingClient}
              onClose={() => setEditingClient(null)}
              onSave={handleUpdateClient}
            />
          )}

          {clientToDelete && (
            <DeleteClient
            clientId={clientToDelete.id}
            onClose={() => setClientToDelete(null)}
            onDelete={handleDeleteClient} // Passando a função handleDeleteClient como onDelete
          />
          )}

          <div className="search_container_input">
            <Input
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search_input"
              prefix={<FaSearch />}
            />
          </div>

          <table className="clients_table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Situação</th>
                <th>Telefone</th>
                <th>Celular</th>
                <th>E-mail</th>
                <th>Data de Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client: Client, index: number) => {
                  const clientKey =
                    client.id || `${index}-${client.nome}-${client.email}`;
                  return (
                    <tr key={clientKey}>
                      <td>{client._id ? client._id.slice(0, 6) : "Carregando..."}</td>
                      <td>{client.nome}</td>
                      <td>{client.tipo}</td>
                      <td>
                        {client.situacao === "ativo" ? <FaCheck /> : "Inativo"}
                      </td>
                      <td>{client.telefone}</td>
                      <td>{client.celular}</td>
                      <td>{client.email}</td>
                      <td>
                        {new Date(client.cadastradoEm).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="action_btn">
                        {/* Botão de Editar */}
                        <button
                          className="edit_btn"
                          onClick={() => setEditingClient(client)}
                        >
                          <FaEdit />
                        </button>
                        {/* Botão de Deletar */}
                        <button
                          className="delete_btn"
                          onClick={() => setClientToDelete(client)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9}>Nenhum cliente encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}

export default ListClients_2;
