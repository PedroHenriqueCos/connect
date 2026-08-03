import { MessageSquare, ThumbsUp, Share2, Flame, Clock } from 'lucide-react';

// Dados simulados de tópicos do fórum
const MOCK_TOPICS = [
  {
    id: 1,
    author: 'Lucas Silva',
    course: 'Engenharia de Computação',
    time: 'Há 15 min',
    category: 'Estágios',
    title: 'Vaga de Estágio em Suporte e Infraestrutura na PGE-RJ',
    content: 'Pessoal, abriram novas vagas de estágio para a área de TI na Procuradoria Geral do Estado! Alguém aqui já fez a prova de seleção deles para dar umas dicas?',
    likes: 12,
    comments: 5,
  },
  {
    id: 2,
    author: 'Mariana Souza',
    course: 'Medicina',
    time: 'Há 1 hora',
    category: 'RU',
    title: 'Cardápio do RU - Pavilhão João Lyra Filho',
    content: 'Alguém sabe dizer se a fila do RU tá muito grande agora pro almoço? E qual o cardápio de hoje?',
    likes: 24,
    comments: 18,
  },
  {
    id: 3,
    author: 'Gabriel Lima',
    course: 'Ciência da Computação',
    time: 'Há 3 horas',
    category: 'Disciplinas',
    title: 'Dicas para a P1 de Estrutura de Dados',
    content: 'Estou montando um grupo de estudos na biblioteca no 5º andar para revisar ponteiros e alocação dinâmica. Quem quiser cola junto!',
    likes: 31,
    comments: 12,
  },
];

export function Feed() {
  return (
    <div className="space-y-6">
      
      {/* Filtros de Categoria */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button className="flex items-center gap-2 bg-uerj-blue text-white px-4 py-2 rounded-full font-semibold text-sm shadow-sm whitespace-nowrap">
          <Flame className="h-4 w-4 text-uerj-yellow" /> Em Alta
        </button>
        <button className="bg-white text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 transition-colors whitespace-nowrap">
          Geral
        </button>
        <button className="bg-white text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 transition-colors whitespace-nowrap">
          Estágios & Vagas
        </button>
        <button className="bg-white text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 transition-colors whitespace-nowrap">
          Restaurante (RU)
        </button>
        <button className="bg-white text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 transition-colors whitespace-nowrap">
          Disciplinas
        </button>
      </div>

      {/* Lista de Tópicos */}
      <div className="space-y-4">
        {MOCK_TOPICS.map((topic) => (
          <article 
            key={topic.id} 
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            {/* Cabeçalho do Card */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-uerj-blue/10 text-uerj-blue font-bold flex items-center justify-center text-sm border border-uerj-blue/20">
                  {topic.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{topic.author}</h4>
                  <p className="text-xs text-gray-500">{topic.course}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                <Clock className="h-3.5 w-3.5" /> {topic.time}
              </span>
            </div>

            {/* Conteúdo do Tópico */}
            <div className="mb-4">
              <span className="inline-block bg-uerj-yellow/20 text-uerj-blue-dark font-semibold text-xs px-2.5 py-1 rounded-md mb-2">
                {topic.category}
              </span>
              <h3 className="text-lg font-bold text-gray-800 hover:text-uerj-blue cursor-pointer transition-colors">
                {topic.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {topic.content}
              </p>
            </div>

            {/* Ações e Métricas */}
            <div className="flex items-center gap-6 pt-3 border-t border-gray-100 text-gray-500 text-xs font-medium">
              <button className="flex items-center gap-1.5 hover:text-uerj-blue transition-colors">
                <ThumbsUp className="h-4 w-4" />
                <span>{topic.likes} curtidas</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-uerj-blue transition-colors">
                <MessageSquare className="h-4 w-4" />
                <span>{topic.comments} comentários</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-uerj-blue transition-colors ml-auto">
                <Share2 className="h-4 w-4" />
                <span>Compartilhar</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}