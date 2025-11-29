import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import livroService from "../services/livroService";

// Novas props opcionais!
interface LivroFormProps {
  onSuccess?: () => void; // O que fazer quando salvar?
  onCancel?: () => void; // O que fazer quando cancelar?
  livroIdParaEditar?: number | null; // ID opcional vindo do pai
}

export function LivroForm({
  onSuccess,
  onCancel,
  livroIdParaEditar,
}: LivroFormProps) {
  const isEditMode = !!livroIdParaEditar;

  const [titulo, setTitulo] = useState("");
  const [autorId, setAutorId] = useState("");
  const [genero, setGenero] = useState("");
  const [imagem, setImagem] = useState("");
  const [anoPublicacao, setAnoPublicacao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [loading, setLoading] = useState(false);

  // Carregar dados se for edição
  useEffect(() => {
    if (isEditMode && livroIdParaEditar) {
      livroService.livroId(livroIdParaEditar).then((livro) => {
        setTitulo(livro.titulo);
        setAnoPublicacao(livro.ano_publicacao);
        setGenero(livro.genero);
        setQuantidade(livro.quantidade_disponivel);
        setImagem(livro.imagem_capa);
        setAutorId(livro.autores[0].id.toString());
      });
      // .catch(() => toast.error("Erro ao carregar dados."));
    } else {
      setTitulo("");
      setAutorId("");
    }
  }, [livroIdParaEditar, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const autorIdNumero = Number(autorId);
    const anoPublicacaoNumero = Number(anoPublicacao);
    const quantidadeNumero = Number(quantidade);

    const dadosEnvio = {
      titulo: titulo,
      ano_publicacao: anoPublicacaoNumero,
      genero: genero,
      quantidade_disponivel: quantidadeNumero,
      imagem_capa: imagem,
      autores: autorIdNumero ? [autorIdNumero] : [],
    };

    try {
      if (isEditMode && livroIdParaEditar) {
        const livroCompleto = {
          titulo: titulo,
          ano_publicacao: Number(anoPublicacao),
          genero: genero,
          quantidade_disponivel: Number(quantidade),
          autores: [Number(autorId)],
        };
        await livroService.atualizarLivro(livroIdParaEditar, livroCompleto);
        toast.success("Livro atualizado!");
      } else {
        await livroService.criarLivro(dadosEnvio);
        toast.success("Livro criado!");
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
          Título
        </label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          ID Autor
        </label>
        <input
          type="text"
          value={autorId}
          onChange={(e) => setAutorId(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Gênero
        </label>
        <input
          type="text"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ano Publicação
        </label>
        <input
          type="number"
          value={anoPublicacao}
          onChange={(e) => setAnoPublicacao(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      {!livroIdParaEditar && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Imagem Capa
          </label>
          <input
            type="text"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Quantidade Disponível
        </label>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex gap-3 justify-end pt-2">
        <button
          type="button"
          onClick={onCancel} // Chama a função de fechar o modal
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {loading ? "Salvando..." : "Salvar Livro"}
        </button>
      </div>
    </form>
  );
}
