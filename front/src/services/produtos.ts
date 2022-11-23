import api from "./api";

export interface Produto {
  id: number;
  descricao: string;
  estoque: number;
  preco: number;
}

export const findAllProdutos = async () => {
  return api.get<Produto[]>('/produto');
};

export const createProduto = async (data: {
  descricao: string;
  estoque: number;
  preco: number;
}) => {
  return api.post('/produto', { ...data });
};