import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from '../redux/clientsSlice';
import suppliersReducer from '../redux/suppliersSlice';
import productsReducer from '../redux/productsSlice'; // Importar o reducer de produtos

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    suppliers: suppliersReducer,
    products: productsReducer, // Adicionar o reducer de produtos
  },
});

// Exportar o tipo RootState
export type RootState = ReturnType<typeof store.getState>;
