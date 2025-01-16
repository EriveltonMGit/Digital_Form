import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../src/assets/Components/Products/types';

interface ProductsState {
  productsData: Product[];
}

const initialState: ProductsState = {
  productsData: [],
};

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
});

export const { setProductsData, addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
