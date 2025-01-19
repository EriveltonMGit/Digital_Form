import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../src/assets/Components/Products/types';

interface ProductsState {
  productsData: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  productsData: [],
  loading: false,
  error: null,
};

// Ação assíncrona para buscar produtos
export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const response = await fetch('http://localhost:3003/produtos', {
      method: 'GET', // Ou 'POST' dependendo da sua API
    });
    if (!response.ok) {
      throw new Error('Falha ao carregar os produtos');
    }
    return await response.json(); // Retorna os dados da API
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsData: (state, action: PayloadAction<Product[]>) => {
      state.productsData = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.productsData.push(action.payload); // Adiciona um novo produto
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.productsData.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.productsData[index] = action.payload; // Atualiza o produto na lista
      } else {
        console.error(`Produto com ID ${action.payload.id} não encontrado!`);
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      const idToDelete = action.payload;
      state.productsData = state.productsData.filter(
        (product) => String(product.id) !== idToDelete
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true; // Carregando os dados
        state.error = null; // Resetando o erro, se houver
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.productsData = action.payload; // Dados recebidos da API
        state.loading = false; // Carregamento concluído
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false; // Erro ao carregar
        state.error = action.error.message || 'Falha ao carregar os produtos';
      });
  },
});

export const { setProductsData, addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
