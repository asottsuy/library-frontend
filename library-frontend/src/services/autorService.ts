import axios from "axios";
import type { AutorPut } from "../types";

const baseURL = import.meta.env.VITE_API_URL;
const token = "";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("library_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function listarAutores() {
  const response = await axios.get(`${baseURL}/autor`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function autorId(id: number) {
  const response = await axios.get(`${baseURL}/autor/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function criarAutor(Autor: AutorPut) {
  const response = await axios.post(`${baseURL}/autor`, Autor, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function atualizarAutor(id: number, dadosAtt: AutorPut) {
  const response = await axios.put(`${baseURL}/autor/${id}`, dadosAtt, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function removerAutor(id: number) {
  const response = await axios.delete(`${baseURL}/autor/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export default {
  listarAutores,
  autorId,
  criarAutor,
  atualizarAutor,
  removerAutor,
};
