export interface Livro {
  id: number;
  titulo?: string;
  ano_publicacao?: number;
  genero?: string;
  quantidade_disponivel?: number;
  imagem_capa?: string;
  autores: Autor[];
}
export interface LivroPut {
  titulo: string;
  ano_publicacao: number;
  genero: string;
  quantidade_disponivel: number;
  autores: number[];
}

export interface LivroPayload {
  titulo: string;
  ano_publicacao: number;
  genero: string;
  quantidade_disponivel: number;
  autores: number[];
  imagem_capa?: string;
}

export interface Autor {
  id: number;
  nome?: string;
  nacionalidade?: string;
  biografia?: string;
  livros?: Livro[] | number[];
}

export interface Emprestimo {
  id: number;
  livro?: Livro;
  data_emprestimo?: Date;
  data_prevista_devolucao?: Date;
  data_devolucao?: Date;
  status?: "ATIVO" | "DEVOLVIDO" | "ATRASADO";
  user?: User;
}

export interface User {
  id: number;
  nome?: string;
  email?: string;
  senha?: string;
  emprestimos?: Emprestimo[];
}
