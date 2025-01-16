// src/types.ts

export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  categoria: string;
  imagem?: string | File; // Adicione a propriedade com o tipo adequado
}

  