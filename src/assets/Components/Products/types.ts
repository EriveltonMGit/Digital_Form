export interface Product {
  _id: any;
  id: string;
  nome: string;
  descricao: string;
  preco: number; // Certifique-se de que 'preco' seja do tipo 'number'
  quantidade: number;
  categoria: string;
  marca: string;
  status: string;
  imagem: string;
}