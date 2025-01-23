import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setClientsData,
  updateClient,
  deleteClient,
} from "../../../../redux/clientsSlice";
import axios from "axios";
import { FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { message, Input, Spin } from "antd"; // Importando Spin do Ant Design
import "./ListClients_2.css";
import EditClient from "../ListClients_2/EditClient/EditClient";
import DeleteClient from "../ListClients_2/DeleteClient/DeleteClient";
import React from "react";
import { Empty } from "antd";

const baseURL = "https://clientes-production-df47.up.railway.app";
const parseDate = (date: string) => {
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
};

export interface Client {
  _id: string;
  id: string; // Agora o 'id' é obrigatório
  nome: string;
  tipo: string;
  situacao: string;
  telefone: string;
  celular: string;
  email: string;
  cadastradoEm: string;
}

function ListClients_2() {
  const dispatch = useDispatch();
  const clientsData = useSelector(
    (state: { clients: { clientsData: Client[] } }) => state.clients.clientsData
  );
  const [loading, setLoading] = useState(true);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      if (loading) {
        try {
          const response = await axios.get(`${baseURL}/clientes`);
          dispatch(setClientsData(response.data));
        } catch (err: any) {
          if (err.response && err.response.status === 429) {
            const retryAfter = err.response.headers["retry-after"] || 5;
            message.error(
              `Muitas requisições. Tente novamente em ${retryAfter} segundos.`
            );
            setTimeout(fetchClients, retryAfter * 1000);
          } else {
            console.error("Erro ao carregar os dados:", err);
            message.error("Erro ao carregar os dados.");
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchClients();
  }, [dispatch, loading]);

  const handleDeleteClient = async (clientId: string) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${baseURL}/clientes/${clientId}`);
      if (response.status === 200) {
        dispatch(deleteClient(clientId));
        message.success("Cliente excluído com sucesso!");
      } else {
        message.error("Erro ao excluir cliente no servidor.");
      }
    } catch (err) {
      console.error("Erro ao excluir cliente:", err);
      message.error("Erro ao excluir cliente.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClient = async (updatedClient: Client) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${baseURL}/clientes/${updatedClient._id}`,
        updatedClient,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200 && response.data) {
        dispatch(updateClient(response.data.client));
        setEditingClient(null);
        message.success("Cliente atualizado com sucesso!");
      } else {
        message.error(`Erro ao atualizar cliente: ${response.statusText}`);
      }
    } catch (err) {
      console.error("Erro ao atualizar cliente:", err);
      message.error("Erro ao atualizar cliente!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredClients = clientsData.filter(
    (client) =>
      (client.nome &&
        client.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (client.email &&
        client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (client.telefone && client.telefone.includes(searchTerm)) ||
      (client.celular && client.celular.includes(searchTerm))
  );

  return (
    <section className="container_list_clients_2">
      {loading ? (
        <div className="loading_container">
        <Spin size="large" />
      </div>
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
              clientId={clientToDelete._id}
              onClose={() => setClientToDelete(null)}
              onDelete={handleDeleteClient}
            />
          )}

          <div className="search_container_input_cli">
            <Input
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search_input"
              prefix={<FaSearch />}
            />
          </div>

          {filteredClients.length > 0 ? (
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
                {filteredClients.map((client) => (
                  <tr key={client._id}>
                    <td>{client._id.slice(0, 6)}</td>
                    <td>{client.nome}</td>
                    <td>{client.tipo}</td>
                    <td>
                      {client.situacao === "ativo" ? <FaCheck /> : "Inativo"}
                    </td>
                    <td>{client.telefone}</td>
                    <td>{client.celular}</td>
                    <td>{client.email}</td>
                    <td>
                      {client.cadastradoEm && client.cadastradoEm.includes("/")
                        ? new Date(
                            parseDate(client.cadastradoEm)
                          ).toLocaleDateString("pt-BR")
                        : "Data inválida"}
                    </td>
                    <td className="action_btn">
                      <button
                        className="edit_btn"
                        onClick={() => setEditingClient(client)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="delete_btn"
                        onClick={() => setClientToDelete(client)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Empty description="Nenhum cliente encontrado." />
          )}
        </>
      )}
    </section>
  );
}

export default ListClients_2;
