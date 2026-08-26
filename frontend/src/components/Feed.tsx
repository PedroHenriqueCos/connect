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

const MOCK_TOPICS: TopicProps[] = [
  {
    id: '1',
    author: 'Lucas Silva',
    course: 'Engenharia de Computação',
    category: 'Estágios & Vagas',
    title: 'Vaga de Estágio em Suporte e Infraestrutura na PGE-RJ',
    content: 'Pessoal, abriram novas vagas de estágio para a área de TI na Procuradoria Geral do Estado! Alguém aqui já fez a prova de seleção deles para dar umas dicas?',
    likesCount: 12,
    createdAt: 'Há 15 min',
    initialComments: [
      {
        id: 'c1',
        author: 'Pedro Henrique Andrade',
        course: 'Ciência da Computação',
        content: 'Fiz a prova no semestre passado! Cobram bastante sobre redes básicas, comandos de terminal e suporte ao usuário.',
        createdAt: 'Há 5 min'
      }
    ]
  },
  {
    id: '2',
    author: 'Mariana Souza',
    course: 'Medicina',
    category: 'Restaurante (RU)',
    title: 'Cardápio do RU - Pavilhão João Lyra Filho',
    content: 'Alguém sabe dizer se a fila do RU tá muito grande agora pro almoço? E qual o cardápio de hoje?',
    likesCount: 24,
    createdAt: 'Há 1 hora',
    initialComments: []
  },
  {
    id: '3',
    author: 'Gabriel Lima',
    course: 'Ciência da Computação',
    category: 'Disciplinas',
    title: 'Grupo de estudos para Algoritmos e Estruturas de Dados',
    content: 'Estamos montando um grupo no Discord para tirar dúvidas sobre a matéria da Prof. Ana. Quem tiver interesse em participar é só responder aqui!',
    likesCount: 8,
    createdAt: 'Há 3 horas',
    initialComments: []
  },
  {
    id: '4',
    author: 'Beatriz Costa',
    course: 'Direito',
    category: 'Geral',
    title: 'Achados e Perdidos: Carteirinha de estudante encontrada no 3º andar',
    content: 'Encontrei uma carteirinha da UERJ no bloco F perto dos elevadores. Deixei na secretaria acadêmica.',
    likesCount: 5,
    createdAt: 'Há 4 horas',
    initialComments: []
  }
];

export function Feed() {
  const [selectedCategory, setSelectedCategory] = useState('Em Alta');

  // Lógica de Filtragem: "Em Alta" mostra tudo, as outras filtram exatamente pela categoria
  const filteredTopics = selectedCategory === 'Em Alta'
    ? MOCK_TOPICS
    : MOCK_TOPICS.filter(topic => topic.category.toLowerCase() === selectedCategory.toLowerCase());

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
            <p className="text-sm font-semibold text-slate-700">Nenhum tópico encontrado</p>
            <p className="text-xs text-slate-400">Seja o primeiro a publicar nesta categoria!</p>
          </div>
        )}
      </div>

    </div>
  );
}