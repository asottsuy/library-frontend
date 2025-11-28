export interface Livro {
  id: number;
  titulo: string;
  isbn: string;
  dataPublicacao?: string; // O '?' indica que é opcional
}