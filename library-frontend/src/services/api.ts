import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOjEsInVzdWFyaW9FbWFpbCI6ImFkbWluQGV4ZW1wbG8uY29tIiwiaWF0IjoxNzY0MzY1MDgwLCJleHAiOjE3NjQ0MDgyODB9.TmF-WIWtmVxWRE6g4pPtJBnYTudDO6bGsaD2SirQzfs'


async function listarLivros(){
    const response = await axios.get(`${baseURL}/livros`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log("A URL da API é:", baseURL);
    return response.data;
}

export default {
    listarLivros
}