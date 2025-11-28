import { useEffect, useState } from "react";
import api from "../services/api";
import type { Livro } from "../types";

export const BookList = () => {
  // 1. Tipamos o useState. Dizemos: "Isso é uma lista de Livros"
  const [livros, setLivros] = useState<Livro[]>([]);

useEffect(() => {
    // Chama a função que criamos acima
    api.listarLivros()
      .then(dados => {
        console.log("Chegaram os livros!", dados);
        setLivros(dados);
      })
      .catch(erro => console.error("Deu ruim:", erro));
  }, []);

  return (
    <div>
      <h1>Catálogo</h1>
      <ul>
        {livros.map((livro) => (
          <li key={livro.id}>
            <strong>{livro.titulo}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};