import { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Calendar, 
  MapPin, 
  Edit3, 
  MessageSquare, 
  Bookmark 
} from 'lucide-react';
import { TopicCard } from './TopicCard';
import type { TopicProps } from './TopicCard';

interface ProfileProps {
  onBackToFeed: () => void;
}

const MY_TOPICS: TopicProps[] = [
  {
    id: '101',
    author: 'Pedro Henrique Andrade',
    course: 'Ciência da Computação - 8º Período',
    category: 'Estágios & Vagas',
    title: 'Dicas sobre o processo de estágio na PGE-RJ',
    content: 'Compartilhando um resumo dos temas mais cobrados nas seleções de infraestrutura e suporte de TI do estado para quem for prestar as próximas provas.',
    likesCount: 18,
    createdAt: 'Há 2 dias',
    initialComments: [
      {
        id: 'c101',
        author: 'Lucas Silva',
        course: 'Engenharia de Computação',
        content: 'Muito obrigado pelas dicas, ajudou demais a direcionar os estudos!',
        createdAt: 'Há 1 dia'
      }
    ]
  },
  {
    id: '102',
    author: 'Pedro Henrique Andrade',
    course: 'Ciência da Computação - 8º Período',
    category: 'Disciplinas',
    title: 'Material complementar para Redes de Computadores e Segurança',
    content: 'Disponibilizei no Drive alguns resumos sobre topologias de rede, roteamento e segurança lógica que usei no semestre passado.',
    likesCount: 31,
    createdAt: 'Há 1 semana',
    initialComments: []
  }
];

export function Profile({ onBackToFeed }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'topics' | 'replies' | 'saved'>('topics');

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Botão de Voltar ao Feed */}
      <button
        onClick={onBackToFeed}
        className="inline-flex items-center gap-2 text-xs font-semibold text-uerj-blue hover:text-uerj-blue-dark bg-white px-3.5 py-2 rounded-xl shadow-sm border border-slate-100 transition-colors cursor-pointer"
      >
        ← Voltar ao Feed Principal
      </button>

      {/* Card Principal do Perfil */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Banner de Capa */}
        <div className="h-32 bg-gradient-to-r from-uerj-blue to-uerj-blue-dark relative">
          <div className="absolute right-4 bottom-3 flex gap-2">
            <button className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-medium px-3 py-1.5 rounded-lg backdrop-blur-sm transition-colors">
              <Edit3 className="h-3.5 w-3.5" />
              <span>Editar Perfil</span>
            </button>
          </div>
        </div>

        {/* Informações do Usuário */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 gap-4 mb-4">
            
            {/* Avatar */}
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-md">
                <div className="w-full h-full rounded-xl bg-uerj-blue text-white flex items-center justify-center font-bold text-2xl border-2 border-white">
                  P
                </div>
              </div>
              <div className="pb-1">
                <h2 className="text-xl font-bold text-gray-900 leading-tight">
                  Pedro Henrique Andrade
                </h2>
                <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                  <GraduationCap className="h-4 w-4 text-uerj-blue" />
                  Ciência da Computação • UERJ Maracanã
                </p>
              </div>
            </div>

            {/* Badges / Estatísticas Rápidas */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-uerj-blue border border-blue-100">
                <Award className="h-3.5 w-3.5" />
                Membro Ativo
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                ⭐ 49 Curtidas
              </span>
            </div>
          </div>

          {/* Bio e Detalhes Institucionais */}
          <div className="space-y-3 pt-2 text-xs text-gray-600 border-t border-gray-100">
            <p className="leading-relaxed text-gray-700">
              Estudante de Ciência da Computação. Focado em infraestrutura, redes, suporte de TI e desenvolvimento web.
            </p>

            <div className="flex flex-wrap gap-4 text-gray-500 pt-1">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5 text-uerj-blue" />
                Matrícula: 2021****
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-uerj-blue" />
                Campus Maracanã - Pavilhão Reitor João Lyra Filho
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-uerj-blue" />
                No Connect UERJ desde Fev 2026
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Navegação por Abas */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('topics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'topics'
              ? 'bg-uerj-blue text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Meus Tópicos ({MY_TOPICS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('replies')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'replies'
              ? 'bg-uerj-blue text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          <span>Minhas Respostas (3)</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'saved'
              ? 'bg-uerj-blue text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-slate-100'
          }`}
        >
          <Bookmark className="h-4 w-4" />
          <span>Salvos (2)</span>
        </button>
      </div>

      {/* Conteúdo da Aba Selecionada */}
      <div className="space-y-4">
        {activeTab === 'topics' && (
          MY_TOPICS.map((topic) => (
            <TopicCard key={topic.id} {...topic} />
          ))
        )}

        {activeTab === 'replies' && (
          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center space-y-2">
            <p className="text-xs font-medium text-gray-600">
              Você participou das discussões sobre o Cardápio do RU e Vagas de Estágio.
            </p>
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center space-y-2">
            <p className="text-xs font-medium text-gray-600">
              Tópicos marcados para leitura rápida aparecerão listados aqui.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}