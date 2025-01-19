import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definição da interface para o modelo de funcionário
export interface Employee {
  id: string;
  nome: string;
  tipo: string;
  situacao: string;
  telefone: string;
  celular: string;
  email: string;
  dataAdmissao: string;
  idade: number; // Tipo ajustado para "number"
  cargo: string;
}

// Definição do estado inicial
interface EmployeesState {
  employeesData: Employee[]; // Lista de funcionários
}

const initialState: EmployeesState = {
  employeesData: [], // Inicialmente, a lista está vazia
};

// Criação do slice de funcionários
const employeesSlice = createSlice({
  name: "employees", // Nome do slice
  initialState, // Estado inicial
  reducers: {
    /**
     * Define a lista completa de funcionários.
     * Substitui os dados existentes pelos novos fornecidos.
     */
    setEmployeesData(state, action: PayloadAction<Employee[]>) {
      state.employeesData = action.payload;
    },

    /**
     * Adiciona um novo funcionário à lista.
     * Certifica-se de que o funcionário não existe antes de adicionar.
     */
    addEmployee(state, action: PayloadAction<Employee>) {
      const exists = state.employeesData.some(
        (employee) => employee.id === action.payload.id
      );

      if (!exists) {
        state.employeesData.push(action.payload);
      } else {
        console.error(
          `Funcionário com ID ${action.payload.id} já existe!`
        );
      }
    },

    /**
     * Atualiza os dados de um funcionário existente.
     * Caso o ID não seja encontrado, emite um erro no console.
     */
    updateEmployee(state, action: PayloadAction<Employee>) {
      const index = state.employeesData.findIndex(
        (employee) => employee.id === action.payload.id
      );

      if (index !== -1) {
        state.employeesData[index] = action.payload;
      } else {
        console.error(
          `Funcionário com ID ${action.payload.id} não encontrado para atualização!`
        );
      }
    },

    /**
     * Remove um funcionário da lista com base no ID.
     * Caso o ID não exista, emite um erro no console.
     */
    deleteEmployee(state, action: PayloadAction<string>) {
      const exists = state.employeesData.some(
        (employee) => employee.id === action.payload
      );

      if (exists) {
        state.employeesData = state.employeesData.filter(
          (employee) => employee.id !== action.payload
        );
      } else {
        console.error(
          `Funcionário com ID ${action.payload} não encontrado para exclusão!`
        );
      }
    },

    /**
     * Limpa a lista de funcionários.
     * Útil para operações de logout ou redefinição de estado.
     */
    clearEmployeesData(state) {
      state.employeesData = [];
    },
  },
});

// Exporta as ações geradas automaticamente pelo slice
export const {
  setEmployeesData,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  clearEmployeesData,
} = employeesSlice.actions;

// Exporta o reducer para uso no store
export default employeesSlice.reducer;
