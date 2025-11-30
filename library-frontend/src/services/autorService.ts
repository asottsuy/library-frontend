import axios from "axios";
import type { AutorPayload, AutorPut } from "../types";

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
  const response = await axios.get(`${baseURL}/autores`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function autorId(id: number) {
  const response = await axios.get(`${baseURL}/autores/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function criarAutor(Autor: AutorPayload) {
  const response = await axios.post(`${baseURL}/autores`, Autor, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function atualizarAutor(id: number, dadosAtt: AutorPut) {
  const response = await axios.put(`${baseURL}/autores/${id}`, dadosAtt, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function removerAutor(id: number) {
  const response = await axios.delete(`${baseURL}/autores/${id}`, {
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
