import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Client {
  id: string;
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
      state.clientsData = action.payload;
    },
    // Adicionar um novo cliente
    addClient(state, action: PayloadAction<Client>) {
      const exists = state.clientsData.some(client => client.id === action.payload.id);
      if (!exists) {
        state.clientsData.push(action.payload);
      } else {
        console.warn(`Client with ID ${action.payload.id} already exists!`);
      }
    },
    // Atualizar os dados de um cliente
    updateClient(state, action: PayloadAction<Client>) {
      const index = state.clientsData.findIndex(client => client.id === action.payload.id);
      if (index !== -1) {
        state.clientsData[index] = action.payload; // Atualiza o cliente
      } else {
        console.error(`Client with ID ${action.payload.id} not found!`);
      }
    },
    // Excluir um cliente
   // Em clientsSlice
deleteClient(state, action: PayloadAction<string>) {
  const initialLength = state.clientsData.length;
  state.clientsData = state.clientsData.filter(client => client.id !== action.payload);

  // Verifica se o cliente foi removido da lista
  if (state.clientsData.length === initialLength) {
    console.error(`Cliente com ID ${action.payload} não encontrado!`);
  }
}
,
  },
});

export const { setClientsData, addClient, updateClient, deleteClient } = clientsSlice.actions;
export default clientsSlice.reducer;
