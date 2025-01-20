import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Client {
  _id: string;
  id?: string; // O campo 'id' pode ser opcional, já que o '_id' do MongoDB é único
  nome: string;
  tipo: string;
  situacao: string;
  telefone: string;
  celular: string;
  email: string;
  cadastradoEm: string;
}

interface ClientsState {
  clientsData: Client[];
}

const initialState: ClientsState = {
  clientsData: [],
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    // Definir todos os dados de clientes
    setClientsData(state, action: PayloadAction<Client[]>) {
      state.clientsData = action.payload.map(client => ({
        ...client,
        id: client._id, // Sincroniza o 'id' com o '_id' do MongoDB
      }));
    },
    
    // Adicionar um novo cliente
    addClient(state, action: PayloadAction<Client>) {
      const client = action.payload;

      // Verifica se o cliente já existe
      const exists = state.clientsData.some(existingClient => existingClient.id === client.id);
      if (!exists) {
        state.clientsData.push(client); // Adiciona o cliente ao estado
      } else {
        console.warn(`Cliente com ID ${client.id} já existe!`);
      }
    },

    // Atualizar os dados de um cliente
    updateClient(state, action: PayloadAction<Client>) {
      const client = action.payload;
      
      // Garantir que temos o 'id' ou '_id' para atualização
      const index = state.clientsData.findIndex(
        (existingClient) => existingClient.id === client.id || existingClient._id === client._id
      );
      
      if (index !== -1) {
        state.clientsData[index] = client; // Atualiza o cliente
      } else {
        console.error(`Cliente com ID ${client.id || client._id} não encontrado!`);
      }
    },

    // Excluir um cliente
    deleteClient(state, action: PayloadAction<string>) {
      const clientId = action.payload;
      
      // Filtra a lista removendo o cliente pelo 'id'
      state.clientsData = state.clientsData.filter(client => client.id !== clientId);
    },
  },
});

export const { setClientsData, addClient, updateClient, deleteClient } = clientsSlice.actions;
export default clientsSlice.reducer;
