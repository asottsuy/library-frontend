import type { Autor } from "../types";
interface AuthorCardProps {
  autor: Autor;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function CardAutor({ autor, onEdit, onDelete }: AuthorCardProps) {


  return (
    <div className="group relative flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-700 shadow-sm">
          #{autor.id}
        </div>
      </div>
      <div className="flex-1 p-5 flex flex-col">
        <h3
          className="text-lg font-bold text-gray-800 leading-tight mb-1 line-clamp-2"
          title={autor.nome}
        >
          {autor.nome}
        </h3>

        <p
          className="text-sm text-gray-500 font-medium"
          title={autor.livro[0]?.id.toString()}
        >
          Livro: {autor.livro[0]?.nome || "Livro Desconhecido"}
          <span className="pl-3">Id: {autor.livro[0]?.id}</span>
        </p>
        <p className="text-sm text-gray-500 font-medium">
          Nacionalidade: {autor.nacionalidade || "???"}
        </p>
        <p className="text-sm text-gray-500 font-medium mb-4">
          Biografia: {autor.biografia || "???"}
        </p>
        <div className="mt-auto flex items-center gap-2 text-xs text-gray-400 bg-gray-50 p-2 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </div>

      <div className="flex border-t border-gray-100 divide-x divide-gray-100">
        <button
          onClick={() => onEdit && onEdit(autor.id)}
          className="flex-1 py-3 text-sm font-medium text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 transition-colors flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
          Editar
        </button>

        <button
          onClick={() => onDelete && onDelete(autor.id)}
          className="flex-1 py-3 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
          Excluir
        </button>
      </div>
    </div>
  );
}
