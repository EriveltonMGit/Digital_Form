import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Client {
  id: string; // Alterado de 'codigo' para 'id'
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
    setClientsData(state, action: PayloadAction<Client[]>) {
      state.clientsData = action.payload;
    },
    addClient: (state, action: PayloadAction<Client>) => {
      state.clientsData.push(action.payload); // Garantir que a ação adicione cliente corretamente
    },
    updateClient(state, action: PayloadAction<Client>) {
      const index = state.clientsData.findIndex(client => client.id === action.payload.id);
      console.log("Updating client with ID:", action.payload.id);
      console.log("Found client index:", index);
      
      if (index !== -1) {
        state.clientsData[index] = action.payload;
      } else {
        console.error(`Client with ID ${action.payload.id} not found!`);
      }
    }
    ,
    deleteClient(state, action: PayloadAction<string>) { // Alterado para 'string' porque 'id' agora é string
      state.clientsData = state.clientsData.filter(client => client.id !== action.payload); // Alterado de 'codigo' para 'id'
    },
  },
});

export const { setClientsData, addClient, updateClient, deleteClient } = clientsSlice.actions;
export default clientsSlice.reducer;
