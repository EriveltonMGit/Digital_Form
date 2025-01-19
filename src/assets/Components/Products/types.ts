export interface Product {
  [x: string]: any;
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  categoria: string;
  marca: string; // Nova propriedade adicionada
  imagem?: string | File; // Imagem do produto como string (URL) ou arquivo
}
