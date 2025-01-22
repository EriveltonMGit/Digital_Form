// redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from '../redux/clientsSlice';
import suppliersReducer from '../redux/suppliersSlice';
import productsReducer from '../redux/productsSlice';
import employeesReducer from '../redux/employeesSlice';
import serviceReducer from '../redux/serviceSlice';  // Importe o serviceSlice
import budgetsReducer from '../redux/budgetSlice';   // Importe o budgetSlice

// Configurando o Redux store
export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    suppliers: suppliersReducer,
    products: productsReducer,
    employees: employeesReducer,
    services: serviceReducer,  // Adicionando o reducer de serviços
    budgets: budgetsReducer,   // Adicionando o reducer de orçamentos
  },
});

// Tipagem para o estado e dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;  // Tipando o dispatch
