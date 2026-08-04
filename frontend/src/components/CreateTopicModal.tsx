import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

interface CreateTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTopicModal({ isOpen, onClose }: CreateTopicModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Geral');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica futura de integração com o Back-end (Spring Boot)
    console.log({ title, category, content });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-uerj-blue">Criar Novo Tópico</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Título do Tópico</label>
            <input 
              type="text" 
              required
              placeholder="Ex: Dúvida sobre a matéria de Calc I"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-uerj-blue focus:ring-1 focus:ring-uerj-blue transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Categoria</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-uerj-blue focus:ring-1 focus:ring-uerj-blue transition-all bg-white"
            >
              <option value="Geral">Geral</option>
              <option value="Estágios">Estágios & Vagas</option>
              <option value="RU">Restaurante (RU)</option>
              <option value="Disciplinas">Disciplinas</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Conteúdo</label>
            <textarea 
              required
              rows={4}
              placeholder="Escreva os detalhes da sua mensagem..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-uerj-blue focus:ring-1 focus:ring-uerj-blue transition-all resize-none"
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-uerj-blue hover:bg-uerj-blue-dark text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-colors"
            >
              <Send className="h-3.5 w-3.5" /> Publicar
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}