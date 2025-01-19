import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'; // Importe corretamente a função uuidv4

// Definição do tipo do serviço
export interface Service {
  id: string;
  name: string;
  email: string;
  description: string;
  price: number;
  message: string;
  serviceName: string;
  createdAt: string;
}

interface ServicesState {
  services: Service[];
}

const initialState: ServicesState = {
  services: [],
};

// Ações e reducers
const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    addService: (state, action: PayloadAction<Service>) => {
      const serviceWithId = { ...action.payload, id: uuidv4() }; // Adiciona um id único
      state.services.push(serviceWithId); // Adiciona o serviço à lista
    },
    removeService: (state, action: PayloadAction<string>) => {
      state.services = state.services.filter(service => service.id !== action.payload); // Remove o serviço pelo ID
    },
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload; // Define a lista de serviços
    },
  },
});

export const { addService, removeService, setServices } = servicesSlice.actions;

export default servicesSlice.reducer;
