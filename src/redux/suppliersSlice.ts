import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definir a interface do fornecedor (Supplier)
interface Supplier {
  id: string;
  nome: string;
  tipo: string;
  situacao: string;
  telefone: string;
  celular: string;
  email: string;
  cadastradoEm: string;
  anexo?: string;
}

// Definir a interface do estado
interface SuppliersState {
  suppliersData: Supplier[];
  loading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: SuppliersState = {
  suppliersData: [],
  loading: false,
  error: null,
};

// Criação do slice de fornecedores
const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    // Definir os reducers para modificar o estado
    setSuppliersData(state, action: PayloadAction<Supplier[]>) {
      state.suppliersData = action.payload;
    },

    // Adicionar um novo fornecedor à lista
    addSupplier(state, action: PayloadAction<Supplier>) {
      state.suppliersData.push(action.payload);
    },

    // Atualizar um fornecedor existente
    updateSupplier(state, action: PayloadAction<Supplier>) {
      const index = state.suppliersData.findIndex(supplier => supplier.id === action.payload.id);
      if (index !== -1) {
        // Atualiza os dados do fornecedor no índice encontrado
        state.suppliersData[index] = { ...state.suppliersData[index], ...action.payload };
      } else {
        console.error(`Fornecedor com id ${action.payload.id} não encontrado`);
      }
    },

    // Deletar um fornecedor pela ID
    deleteSupplier(state, action: PayloadAction<string>) {
      state.suppliersData = state.suppliersData.filter(supplier => supplier.id !== action.payload);
    },

    // Definir o estado de carregamento
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    // Definir erro
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

// Exportação das ações
export const { 
  setSuppliersData, 
  addSupplier, 
  updateSupplier, 
  deleteSupplier, 
  setLoading, 
  setError 
} = suppliersSlice.actions;

// Exportação do reducer
export default suppliersSlice.reducer;
