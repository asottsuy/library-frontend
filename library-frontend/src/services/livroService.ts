import axios from "axios";
import type { LivroPayload, LivroPut } from "../types";

const baseURL = import.meta.env.VITE_API_URL;
const token = "";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("library_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function listarLivros() {
  const response = await axios.get(`${baseURL}/livros`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function livroId(id: number) {
  const response = await axios.get(`${baseURL}/livros/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function criarLivro(livro: LivroPayload) {
  const response = await axios.post(`${baseURL}/livros`, livro, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function atualizarLivro(id: number, dadosAtt: LivroPut) {
  const response = await axios.put(`${baseURL}/livros/${id}`, dadosAtt, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function removerLivro(id: number) {
  const response = await axios.delete(`${baseURL}/livros/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export default {
  listarLivros,
  livroId,
  criarLivro,
  atualizarLivro,
  removerLivro,
};
