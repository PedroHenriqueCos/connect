import { useState } from 'react';
import { TopicCard } from './TopicCard';
import type { TopicProps } from './TopicCard';

const MOCK_TOPICS: TopicProps[] = [
  {
    id: '1',
    author: 'Lucas Silva',
    course: 'Engenharia de Computação',
    category: 'Estágios',
    title: 'Vaga de Estágio em Suporte e Infraestrutura na PGE-RJ',
    content: 'Pessoal, abriram novas vagas de estágio para a área de TI na Procuradoria Geral do Estado! Alguém aqui já fez a prova de seleção deles para dar umas dicas?',
    likesCount: 12,
    commentsCount: 2,
    createdAt: 'Há 15 min',
    initialComments: [
      {
        id: 'c1',
        author: 'Pedro Andrade',
        course: 'Ciência da Computação',
        content: 'Vale muito a pena! O processo seletivo foca bastante nos conceitos de redes e suporte.',
        createdAt: 'Há 10 min'
      },
      {
        id: 'c2',
        author: 'Beatriz Lima',
        course: 'Engenharia de Computação',
        content: 'Também recomendo! A equipe de infraestrutura lá é excelente.',
        createdAt: 'Há 5 min'
      }
    ]
  },
  {
    id: '2',
    author: 'Mariana Souza',
    course: 'Medicina',
    category: 'RU',
    title: 'Cardápio do RU - Pavilhão João Lyra Filho',
    content: 'Alguém sabe dizer se a fila do RU tá muito grande agora pro almoço? E qual o cardápio de hoje?',
    likesCount: 24,
    commentsCount: 1,
    createdAt: 'Há 1 hora',
    initialComments: [
      {
        id: 'c3',
        author: 'Gabriel Lima',
        course: 'Ciência da Computação',
        content: 'A fila tá dobrando o bloco, mas tá andando rápido!',
        createdAt: 'Há 45 min'
      }
    ]
  },
  {
    id: '3',
    author: 'Gabriel Lima',
    course: 'Ciência da Computação',
    category: 'Disciplinas',
    title: 'Grupo de estudos para Algoritmos e Estruturas de Dados',
    content: 'Estamos montando um grupo no Discord para tirar dúvidas sobre a matéria da Prof. Ana. Quem tiver interesse em participar é só responder aqui!',
    likesCount: 8,
    commentsCount: 0,
    createdAt: 'Há 3 horas',
    initialComments: []
  }
];

const CATEGORIES = ['Em Alta', 'Geral', 'Estágios & Vagas', 'Restaurante (RU)', 'Disciplinas'];

export function Feed() {
  const [selectedCategory, setSelectedCategory] = useState('Em Alta');

  return (
    <div className="space-y-6">
      
      {/* Filtros de Categoria */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-uerj-blue text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-slate-100 border border-gray-100'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Lista de Tópicos Interativos */}
      <div className="space-y-4">
        {MOCK_TOPICS.map((topic) => (
          <TopicCard key={topic.id} {...topic} />
        ))}
      </div>

    </div>
  );
}