import { useState } from 'react';
import { X, Send, BookOpen, AlertCircle, Briefcase, HelpCircle, Coffee } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface CreateTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTopic: (topic: { title: string; category: string; content: string }) => void;
}

const CATEGORIES = [
  { label: 'Geral', icon: HelpCircle },
  { label: 'Estágios & Vagas', icon: Briefcase },
  { label: 'Restaurante (RU)', icon: Coffee },
  { label: 'Disciplinas', icon: BookOpen },
  { label: 'Avisos Acadêmicos', icon: AlertCircle },
];

export function CreateTopicModal({ isOpen, onClose, onCreateTopic }: CreateTopicModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Geral');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onCreateTopic({
      title,
      category,
      content,
    });

    setTitle('');
    setContent('');
    setCategory('Geral');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        
        {/* Topo */}
        <div className="bg-uerj-blue p-6 text-white flex items-center justify-between">
          <h2 className="text-base font-bold">Criar Novo Tópico • UERJ-ZO</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Título do Tópico:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Grupo de estudos para Redes I ou Vaga de TI"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-uerj-blue transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Categoria:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat.label}
                  onClick={() => setCategory(cat.label)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    category === cat.label
                      ? 'bg-blue-50 border-uerj-blue text-uerj-blue shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <cat.icon className="h-4 w-4" />
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Mensagem / Descrição:
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Descreva sua dúvida, oportunidade de estágio ou comunicado para a comunidade da UERJ-ZO..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-uerj-blue transition-all resize-none"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-uerj-yellow hover:bg-yellow-400 text-uerj-blue-dark transition-colors shadow-sm cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Publicar Tópico</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}