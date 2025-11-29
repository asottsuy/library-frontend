import { useEffect, useState } from "react";
import api from "../services/livroService";
import type { Livro } from "../types";

export const BookList = () => {
  const [livros, setLivros] = useState<Livro[]>([]);

  useEffect(() => {
    api
      .listarLivros()
      .then((dados) => {
        console.log("Chegaram os livros!", dados);
        setLivros(dados);
      })
      .catch((erro) => console.error("Deu ruim:", erro));
  }, []);

  return (
    <div>
      <h1>Catálogo</h1>
      <ul className="bg-red">
        {livros.map((livro) => (
          <li key={livro.id}>
            <strong>{livro.id}</strong>
            <br></br>
            <strong>{livro.titulo}</strong>
            <br></br>
            <strong>{livro.quantidade_disponivel}</strong>
            <br></br>
            {livro.autores[0]?.nome}
          </li>
        ))}
      </ul>
    </div>
  );
};
