import { useState } from 'react';
import { X, Save, Loader2, User, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CURSOS_UERJ = [
  'Ciência da Computação',
  'Engenharia de Produção',
  'Administração',
  'Direito',
  'Ciências Biológicas',
  'Pedagogia',
  'Outro Curso'
];

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { usuario, atualizarDadosUsuario } = useAuth();

  const [nome, setNome] = useState(usuario?.nome || '');
  const [curso, setCurso] = useState(usuario?.curso || 'Ciência da Computação');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  if (!isOpen || !usuario) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) {
      setErro('O nome não pode ficar vazio.');
      return;
    }

    try {
      setLoading(true);
      setErro(null);

      const atualizado = await api.atualizarPerfil(usuario.id, {
        nome: nome.trim(),
        curso: curso.trim(),
      });

      atualizarDadosUsuario(atualizado);
      onClose();
    } catch (err) {
      console.error(err);
      setErro('Erro ao atualizar perfil. Verifique a conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        
        {/* Topo do Modal */}
        <div className="bg-uerj-blue p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-uerj-yellow" />
            <h2 className="text-base font-bold">Editar Perfil • Connect UERJ</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {erro && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl">
              {erro}
            </div>
          )}

          {/* Nome */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Nome Completo:
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-uerj-blue text-slate-800"
              required
            />
          </div>

          {/* Curso */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-uerj-blue" /> Curso:
            </label>
            <select
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-uerj-blue text-slate-800 cursor-pointer"
            >
              {CURSOS_UERJ.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Matrícula e E-mail (somente leitura para integridade) */}
          <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl space-y-1.5 text-xs text-slate-500">
            <p className="font-semibold text-slate-700">Dados Institucionais (Não alteráveis):</p>
            <p><strong>E-mail:</strong> {usuario.email}</p>
            <p><strong>Matrícula:</strong> {usuario.matricula}</p>
          </div>

          {/* Botões */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-uerj-blue hover:bg-uerj-blue-dark text-white transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              <span>Salvar Alterações</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}