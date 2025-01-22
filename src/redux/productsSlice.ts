import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

// Ação assíncrona para buscar os produtos da API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch("https://produtosform-production.up.railway.app/produtos");
    if (!response.ok) {
      throw new Error("Erro ao buscar os produtos");
    }
    return await response.json();
  }
);

interface Product {
  _id: string;
  id?: string;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  categoria: string;
  imagem: string;
  marca: string;
}

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

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsData(state, action: PayloadAction<Product[]>) {
      state.productsData = action.payload.map(product => ({
        ...product,
        id: product._id,  // Mapeando corretamente o _id para id
      }));
    },
    addProduct(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const exists = state.productsData.some(existingProduct => existingProduct.id === product.id);
      if (!exists) {
        state.productsData.push(product);
      } else {
        console.warn(`Produto com ID ${product.id} já existe!`);
      }
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const product = action.payload;
      if (!product.id && !product._id) {
        console.error("Produto sem ID ou _id, não é possível atualizar!");
        return;
      }
      const index = state.productsData.findIndex(
        (existingProduct) => existingProduct.id === product.id || existingProduct._id === product._id
      );
      if (index !== -1) {
        state.productsData[index] = product;
      } else {
        console.error(`Produto com ID ${product.id || product._id} não encontrado!`);
      }
    },
    deleteProduct(state, action: PayloadAction<string>) {
      const productId = action.payload;
      state.productsData = state.productsData.filter(product => product.id !== productId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productsData = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro desconhecido";
      });
  },
});

export const { setProductsData, addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
