import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import autorService from "../services/autorService";
import type { Autor } from "../types";
import { CardAutor } from "../components/CardAutor";
import { Modal } from "../components/Modal";
import { AutorForm } from "../components/AutorForm";

export function AuthorList() {
  const [autores, setAutores] = useState<Autor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadAuthors = async () => {
    try {
      const data = await autorService.listarAutores();
      setAutores(data);
    } catch (error) {
      toast.error("Erro ao carregar autores");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Deseja deletar este autor?")) {
      try {
        await autorService.removerAutor(id);
        toast.success("Autor removido.");
        setAutores((prev) => prev.filter((l) => l.id !== id));
      } catch (error) {
        console.log(error);
        toast.error("Não foi possível remover.");
      }
    }
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    loadAuthors();
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cabeçalho da Página */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <p className="text-gray-500">Gerencie seu acervo de autores</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2 font-medium"
        >
          <span>+</span> Novo Autor
        </button>
      </div>

      {autores.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">Nenhum autor encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {autores.map((autor) => (
            <CardAutor
              key={autor.id}
              autor={autor}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Editar Autor" : "Novo Autor"}
      >
        <AutorForm
          onSuccess={handleSuccess}
          onCancel={() => setIsModalOpen(false)}
          autorIdParaEditar={editingId}
        />
      </Modal>
    </div>
  );
}
