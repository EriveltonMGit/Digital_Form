import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definir a interface de orçamento (Budget)
interface Budget {
  _id: string;  // Usando _id como chave única
  cliente: string;
  descricao: string;
  valor: number;
  prazoEntrega: string;
  status: string;
  desconto?: number;
  categoria: string;
  observacoes: string;
  email: string;
}

// Definir a interface do estado
interface BudgetsState {
  budgetsData: Budget[];
  loading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: BudgetsState = {
  budgetsData: [],
  loading: false,
  error: null,
};

// Criação do slice de orçamentos
const budgetsSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    // Definir os reducers para modificar o estado

    // Definir os orçamentos
    setBudgetsData(state, action: PayloadAction<Budget[]>) {
      state.budgetsData = action.payload;
    },

    // Adicionar um novo orçamento à lista
    addBudget(state, action: PayloadAction<Budget>) {
        const existingIndex = state.budgetsData.findIndex(budget => budget._id === action.payload._id);
        if (existingIndex === -1) {
          state.budgetsData.push(action.payload);
        } else {
          console.error(`Orçamento com _id ${action.payload._id} já existe`);
        }
      },

    // Atualizar um orçamento existente
    updateBudget(state, action: PayloadAction<Budget>) {
        const index = state.budgetsData.findIndex(budget => budget._id === action.payload._id);
        if (index !== -1) {
          state.budgetsData[index] = { ...state.budgetsData[index], ...action.payload };
        } else {
          console.error(`Orçamento com _id ${action.payload._id} não encontrado`);
        }
      },

    // Deletar um orçamento pela _id
    deleteBudget(state, action: PayloadAction<string>) {
      state.budgetsData = state.budgetsData.filter(budget => budget._id !== action.payload);
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
  setBudgetsData, 
  addBudget, 
  updateBudget, 
  deleteBudget, 
  setLoading, 
  setError 
} = budgetsSlice.actions;

// Exportação do reducer
export default budgetsSlice.reducer;
