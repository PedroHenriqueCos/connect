import { useState } from 'react';
import { TopicCard } from './TopicCard';
import type { TopicProps } from './TopicCard';

const CATEGORIES = [
  'Em Alta',
  'Geral',
  'Estágios & Vagas',
  'Restaurante (RU)',
  'Disciplinas'
];

interface FeedProps {
  topics: TopicProps[];
}

export function Feed({ topics }: FeedProps) {
  const [selectedCategory, setSelectedCategory] = useState('Em Alta');

  const filteredTopics = selectedCategory === 'Em Alta'
    ? topics
    : topics.filter(topic => topic.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-6">
      
      {/* Botões de Filtro de Categorias */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-uerj-blue text-white shadow-sm scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-100'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Lista de Tópicos Filtrados */}
      <div className="space-y-4">
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic) => (
            <TopicCard key={topic.id} {...topic} />
          ))
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center space-y-2">
            <p className="text-sm font-semibold text-slate-700">Nenhum tópico encontrado nesta categoria</p>
            <p className="text-xs text-slate-400">Seja o primeiro a publicar clicando em "+ Novo Tópico"!</p>
          </div>
        )}
      </div>

    </div>
  );
}