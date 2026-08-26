import { useState } from 'react';
import { 
  BookOpen, 
  MessageSquare, 
  Bookmark, 
  MapPin, 
  Calendar, 
  Edit2,
  Heart
} from 'lucide-react';
import { TopicCard } from './TopicCard';
import type { TopicProps } from './TopicCard';
import mascoteModImg from '../assets/mascote_mod.png';

interface ProfileProps {
  onBackToFeed: () => void;
}

const MY_TOPICS: TopicProps[] = [
  {
    id: '101',
    author: 'Pedro Henrique Andrade',
    course: 'Ciência da Computação',
    category: 'Disciplinas',
    title: 'Dúvida sobre topologia de redes e subnetting em Redes I (UERJ-ZO)',
    content: 'Alguém com o material do semestre passado sobre cálculo de sub-redes VLSM e configuração de switches? O drive da matéria foi atualizado?',
    likesCount: 15,
    createdAt: 'Há 2 dias',
    initialComments: [
      {
        id: 'c101',
        author: 'Lucas Silva',
        course: 'Engenharia de Produção',
        content: 'Tem um PDF excelente no drive de materiais da FCEE!',
        createdAt: 'Ontem'
      }
    ]
  },
  {
    id: '102',
    author: 'Pedro Henrique Andrade',
    course: 'Ciência da Computação',
    category: 'Geral',
    title: 'Horários de monitoria no laboratório de informática de Campo Grande',
    content: 'Pessoal, as monitorias de algoritmos e programação começam a partir de que horas na próxima semana?',
    likesCount: 9,
    createdAt: 'Há 5 dias',
    initialComments: []
  }
];

export function Profile({ onBackToFeed }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'topics' | 'replies' | 'saved'>('topics');

  return (
    <div className="space-y-6">
      
      {/* Botão de Retorno */}
      <button
        onClick={onBackToFeed}
        className="inline-flex items-center gap-2 text-xs font-semibold text-uerj-blue hover:text-uerj-blue-dark bg-white px-3.5 py-2 rounded-xl shadow-sm border border-slate-100 transition-colors cursor-pointer"
      >
        ← Voltar ao Feed Principal
      </button>

      {/* Cartão de Perfil Principal */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Banner Superior */}
        <div className="h-32 bg-gradient-to-r from-uerj-blue to-uerj-blue-dark relative">
          <div className="absolute right-4 top-4">
            <button className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer border border-white/20">
              <Edit2 className="h-3.5 w-3.5" />
              <span>Editar Perfil</span>
            </button>
          </div>
        </div>

        {/* Informações do Usuário */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          
          {/* Avatar & Badges */}
          <div className="-mt-14 mb-4 flex items-end justify-between">
            <div className="w-24 h-24 rounded-2xl bg-uerj-blue text-white text-3xl font-black flex items-center justify-center border-4 border-white shadow-md">
              P
            </div>
            
            <div className="flex items-center gap-2.5">
              
              {/* Selo Oficial de Moderador com o Mascote */}
              <div className="flex items-center gap-2 bg-uerj-blue text-white border border-blue-400/30 pl-2 pr-3 py-1 rounded-2xl shadow-sm">
                <img 
                  src={mascoteModImg} 
                  alt="Mascote Moderador" 
                  className="w-5 h-5 object-contain scale-125"
                />
                <span className="text-xs font-bold tracking-tight">
                  Moderador UERJ-ZO
                </span>
              </div>

              {/* Badge de Reconhecimento */}
              <span className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1 rounded-2xl shadow-xs">
                <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
                <span>49 Curtidas</span>
              </span>

            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <h2 className="text-xl font-bold text-slate-900">Pedro Henrique Andrade</h2>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5 text-uerj-blue" />
                Ciência da Computação • UERJ Zona Oeste (FCEE)
              </span>
            </div>

            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Estudante de Ciência da Computação na UERJ-ZO (Campo Grande). Focado em infraestrutura de redes, suporte técnico e desenvolvimento da plataforma Connect UERJ.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                Matrícula: 2021****
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                Campus Zona Oeste • Av. Manuel Caldeira de Alvarenga, 1203
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                No Connect UERJ desde Fev 2026
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Abas de Navegação */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('topics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'topics'
              ? 'bg-uerj-blue text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-100'
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
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-100'
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
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-100'
          }`}
        >
          <Bookmark className="h-4 w-4" />
          <span>Salvos (2)</span>
        </button>
      </div>

      {/* Conteúdo da Aba */}
      <div className="space-y-4">
        {activeTab === 'topics' && (
          MY_TOPICS.map((topic) => (
            <TopicCard key={topic.id} {...topic} />
          ))
        )}

        {activeTab === 'replies' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center text-xs text-slate-500">
            Você participou das discussões sobre o Cardápio do RU (Campo Grande) e Vagas de Estágio na PGE-RJ.
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center text-xs text-slate-500">
            Você salvou o Guia de Provas Antigas de Redes I e o Aviso de Renovação de Matrícula.
          </div>
        )}
      </div>

    </div>
  );
}