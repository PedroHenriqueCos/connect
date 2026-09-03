import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  MessageSquare, 
  Bookmark, 
  MapPin, 
  Calendar, 
  Edit2,
  Heart,
  Loader2
} from 'lucide-react';
import { TopicCard } from './TopicCard';
import type { TopicProps } from './TopicCard';
import mascoteModImg from '../assets/mascote_mod.png';
import { useAuth } from '../context/AuthContext';
import { api, type TopicoResponse } from '../services/api';

interface ProfileProps {
  onBackToFeed: () => void;
}

export function Profile({ onBackToFeed }: ProfileProps) {
  const { usuario } = useAuth();
  const [activeTab, setActiveTab] = useState<'topics' | 'replies' | 'saved'>('topics');
  const [meusTopicos, setMeusTopicos] = useState<TopicProps[]>([]);
  const [carregandoTopicos, setCarregandoTopicos] = useState(true);

  const nomeExibicao = usuario?.nome || 'Aluno Convidado';
  const cursoExibicao = usuario?.curso || 'Graduação UERJ';
  const matriculaExibicao = usuario?.matricula || 'Não informada';
  const primeiraLetra = nomeExibicao.trim().charAt(0).toUpperCase() || 'U';

  useEffect(() => {
    async function carregarMeusTopicos() {
      if (!usuario) {
        setMeusTopicos([]);
        setCarregandoTopicos(false);
        return;
      }

      try {
        setCarregandoTopicos(true);
        const todosTopicos = await api.getTopicos();

        // Filtra apenas os tópicos criados pelo aluno logado
        const filtrados = todosTopicos.filter(
          (t: TopicoResponse) => t.nomeAutor.trim().toLowerCase() === usuario.nome.trim().toLowerCase()
        );

        // Converte para o padrão de propriedades do TopicCard
        const adaptados: TopicProps[] = filtrados.map((t: TopicoResponse) => ({
          id: String(t.id),
          author: t.nomeAutor,
          course: usuario.curso,
          category: t.nomeCategoria,
          title: t.titulo,
          content: t.conteudo,
          likesCount: t.votos ?? 0,
          createdAt: new Date(t.dataCriacao).toLocaleDateString('pt-BR'),
          initialComments: []
        }));

        setMeusTopicos(adaptados);
      } catch (error) {
        console.error('Erro ao carregar tópicos do usuário:', error);
      } finally {
        setCarregandoTopicos(false);
      }
    }

    carregarMeusTopicos();
  }, [usuario]);

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
            <div className="w-24 h-24 rounded-2xl bg-uerj-blue text-white text-3xl font-black flex items-center justify-center border-4 border-white shadow-md uppercase">
              {primeiraLetra}
            </div>
            
            <div className="flex items-center gap-2.5">
              
              {/* Selo de Membro */}
              <div className="flex items-center gap-2 bg-uerj-blue text-white border border-blue-400/30 pl-2 pr-3 py-1 rounded-2xl shadow-sm">
                <img 
                  src={mascoteModImg} 
                  alt="Mascote UERJ" 
                  className="w-5 h-5 object-contain scale-125"
                />
                <span className="text-xs font-bold tracking-tight">
                  Aluno Conectado
                </span>
              </div>

              {/* Badge de Reconhecimento */}
              <span className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1 rounded-2xl shadow-xs">
                <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
                <span>0 Curtidas</span>
              </span>

            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <h2 className="text-xl font-bold text-slate-900">{nomeExibicao}</h2>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5 text-uerj-blue" />
                {cursoExibicao} • UERJ
              </span>
            </div>

            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Perfil acadêmico de {nomeExibicao}, estudante de {cursoExibicao} conectado na plataforma Connect UERJ.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                Matrícula: {matriculaExibicao}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                UERJ
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                Conectado ao Connect UERJ
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
          <span>Meus Tópicos ({meusTopicos.length})</span>
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
          <span>Minhas Respostas</span>
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
          <span>Salvos</span>
        </button>
      </div>

      {/* Conteúdo da Aba */}
      <div className="space-y-4">
        {activeTab === 'topics' && (
          carregandoTopicos ? (
            <div className="flex items-center justify-center p-8 bg-white rounded-2xl border border-slate-100 text-slate-500 gap-2 text-xs">
              <Loader2 className="h-4 w-4 animate-spin text-uerj-blue" />
              <span>Carregando seus tópicos...</span>
            </div>
          ) : meusTopicos.length > 0 ? (
            meusTopicos.map((topic) => (
              <TopicCard key={topic.id} {...topic} />
            ))
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center text-xs text-slate-500">
              Você ainda não publicou nenhum tópico no fórum.
            </div>
          )
        )}

        {activeTab === 'replies' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center text-xs text-slate-500">
            Nenhuma resposta recente registrada.
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center text-xs text-slate-500">
            Nenhum item salvo no momento.
          </div>
        )}
      </div>

    </div>
  );
}