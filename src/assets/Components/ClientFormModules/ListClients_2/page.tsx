import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClientsData, updateClient } from "../../../../redux/clientsSlice";
import axios from "axios";
import { FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { message, Input } from "antd"; // Importando Input do Ant Design
import "./ListClients_2.css";
import EditClient from "../ListClients_2/EditClient/EditClient";
import DeleteClient from "../ListClients_2/DeleteClient/DeleteClient";
import React from "react";

export interface Client {
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
        const response = await axios.get("https://clientes-production-df47.up.railway.app/clientes");
        dispatch(setClientsData(response.data));
      } catch (err) {
        console.error(err); // Usando o 'err' para logar o erro
        message.error("Erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [dispatch]);

  // Na função handleUpdateClient
  const handleUpdateClient = async (updatedClient: Client) => {
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:3001/clientes/${updatedClient.id}`,
        updatedClient
      );
      dispatch(updateClient(updatedClient)); // Atualiza o cliente no Redux
      setEditingClient(null);
      message.success("Cliente atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        message.error(
          `Erro ao atualizar cliente: ${
            err.response?.data?.message || "Erro desconhecido"
          }`
        );
      } else {
        message.error("Erro desconhecido!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteButtonClick = (client: Client) => {
    setClientToDelete(client);
  };

  // Função para lidar com a busca
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

          <DeleteClient
            clientId={clientToDelete?.id || null}
            onClose={() => setClientToDelete(null)}
          />

          {/* Campo de busca com o Input do Ant Design */}
          <div className="search_container_input">
            <Input
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search_input"
              prefix={<FaSearch />} // Usando ícone de busca
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
                      <td>
                        {client.id ? client.id.slice(0, 6) : "Carregando..."}{" "}
                        {/* Exibe "Carregando..." enquanto o ID não estiver disponível */}
                      </td>

                      <td>{client.nome}</td>
                      <td>{client.tipo}</td>
                      <td>
                        {client.situacao === "ativo" ? <FaCheck /> : "Inativo"}
                      </td>
                      <td>{client.telefone}</td>
                      <td>{client.celular}</td>
                      <td>{client.email}</td>
                      <td>
                        {new Date(client.cadastradoEm).toLocaleDateString(
                          "pt-BR"
                        )}
                      </td>
                      <td className="action_btn">
                        <button
                          className="action_button search_button"
                          title="Visualizar cliente"
                        >
                          <FaSearch />
                        </button>
                        <button
                          className="action_button edit_button"
                          onClick={() => setEditingClient(client)}
                          title="Editar cliente"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="action_button delete_button"
                          onClick={() => handleDeleteButtonClick(client)}
                          title="Excluir cliente"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9}>Nenhum cliente encontrado</td>
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
