import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import autorService from "../services/autorService";

interface AutorFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  autorIdParaEditar?: number | null;
}

export function AutorForm({
  onSuccess,
  onCancel,
  autorIdParaEditar,
}: AutorFormProps) {
  const isEditMode = !!autorIdParaEditar;

  const [nome, setNome] = useState("");
  const [livroId, setLivroId] = useState("");
  const [nacionalidade, setNacionalidade] = useState("");
  const [biografia, setBiografia] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && autorIdParaEditar) {
      autorService.livroId(autorIdParaEditar).then((autor) => {
        setNome(autor.nome);
        setBiografia(autor.biografia);
        setNacionalidade(autor.nacionalidade);
        setLivroId(autor.livro[0].id.toString());
      });
    } else {
      setNome("");
      setLivroId("");
    }
  }, [autorIdParaEditar, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const livroIdNumero = Number(livroId);

    const dadosEnvio = {
      nome: nome,
      biografia: biografia,
      nacionalidade: nacionalidade,
      livro: livroIdNumero ? [livroIdNumero] : [],
    };

    try {
      if (isEditMode && autorIdParaEditar) {
        const autorCompleto = {
          nome: nome,
          biografia: biografia,
          nacionalidade: nacionalidade,
          livro: [Number(livroId)],
        };
        await autorService.atualizarAutor(autorIdParaEditar, autorCompleto);
        toast.success("Autor atualizado!");
      } else {
        await autorService.criarAutor(dadosEnvio);
        toast.success("Autor criado!");
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Erro ao salvar.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          ID Livro
        </label>
        <input
          type="text"
          value={livroId}
          onChange={(e) => setLivroId(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nacionalidade
        </label>
        <input
          type="text"
          value={nacionalidade}
          onChange={(e) => setNacionalidade(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Biografia
        </label>
        <input
          type="text"
          value={biografia}
          onChange={(e) => setBiografia(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex gap-3 justify-end pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {loading ? "Salvando..." : "Salvar Autor"}
        </button>
      </div>
    </form>
  );
}
