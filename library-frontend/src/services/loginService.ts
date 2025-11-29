import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

async function login(email: string, senha:string) {
    const response = await axios.post(`${baseURL}/login`, {email, senha})
    const token = response.data.token;

    if (token) {
        localStorage.setItem("library_token", token);
        console.log(token)
    }
    return response.data;
}

const getToken = () => {
    return localStorage.getItem("library_token");
}

const logout = () => {
  localStorage.removeItem("library_token");
};

export default {
    login,
    logout,
    getToken
}