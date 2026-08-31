import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Feed } from './components/Feed';
import { Profile } from './components/Profile';
import { Disciplines } from './components/Disciplines';
import { CreateTopicModal } from './components/CreateTopicModal';
import { RuMenuModal } from './components/RuMenuModal';
import type { TopicProps } from './components/TopicCard';
import { api, CATEGORY_MAP, type TopicoResponse } from './services/api';
import { Utensils, BookOpen, AlertCircle, Sparkles, MapPin, Loader2 } from 'lucide-react';

function mapResponseToTopicProps(t: TopicoResponse): TopicProps {
  return {
    id: t.id.toString(),
    author: t.nomeAutor,
    course: 'Ciência da Computação (UERJ-ZO)',
    category: t.nomeCategoria,
    title: t.titulo,
    content: t.conteudo,
    likesCount: t.votos,
    createdAt: new Date(t.dataCriacao).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }),
    initialComments: []
  };
}

export function App() {
  const [topics, setTopics] = useState<TopicProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentView, setCurrentView] = useState<'feed' | 'profile' | 'disciplines'>('feed');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRuModalOpen, setIsRuModalOpen] = useState(false);

  // Carrega tópicos do Spring Boot
  const carregarTopicos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getTopicos();
      setTopics(data.map(mapResponseToTopicProps));
    } catch (err) {
      console.error(err);
      setError('Não foi possível conectar ao servidor Spring Boot. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarTopicos();
  }, []);

  // Envia novo tópico para o Spring Boot
  const handleCreateTopic = async (newTopicData: { title: string; category: string; content: string }) => {
    try {
      const categoriaId = CATEGORY_MAP[newTopicData.category] || 1;
      
      const payload = {
        titulo: newTopicData.title,
        conteudo: newTopicData.content,
        usuarioId: 1, // ID do usuário Pedro Henrique logado (definido no data.sql)
        categoriaId: categoriaId
      };

      const topicoCriado = await api.criarTopico(payload);
      setTopics(prev => [mapResponseToTopicProps(topicoCriado), ...prev]);
      setCurrentView('feed');
    } catch (err) {
      console.error(err);
      alert('Erro ao publicar tópico no servidor!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      
      <Header 
        onOpenNewTopic={() => setIsCreateModalOpen(true)}
        onOpenProfile={() => setCurrentView('profile')}
        onGoToFeed={() => setCurrentView('feed')}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {currentView === 'profile' && (
          <Profile onBackToFeed={() => setCurrentView('feed')} />
        )}

        {currentView === 'disciplines' && (
          <div className="space-y-6">
            <button
              onClick={() => setCurrentView('feed')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-uerj-blue hover:text-uerj-blue-dark bg-white px-3.5 py-2 rounded-xl shadow-sm border border-slate-100 transition-colors cursor-pointer"
            >
              ← Voltar ao Feed Principal
            </button>
            <Disciplines />
          </div>
        )}

        {currentView === 'feed' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            <div className="lg:col-span-3 space-y-6">
              {loading ? (
                <div className="bg-white p-12 rounded-3xl border border-slate-100 flex flex-col items-center justify-center gap-3 text-slate-500">
                  <Loader2 className="h-6 w-6 animate-spin text-uerj-blue" />
                  <span className="text-xs font-semibold">Carregando tópicos da UERJ-ZO...</span>
                </div>
              ) : error ? (
                <div className="bg-rose-50 border border-rose-200 p-6 rounded-3xl text-rose-800 space-y-3">
                  <p className="text-xs font-bold">{error}</p>
                  <button 
                    onClick={carregarTopicos}
                    className="text-xs bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl font-bold cursor-pointer transition-colors"
                  >
                    Tentar Novamente
                  </button>
                </div>
              ) : (
                <Feed topics={topics} />
              )}
            </div>

            <aside className="space-y-6">
              
              <div 
                onClick={() => setCurrentView('disciplines')}
                className="bg-gradient-to-br from-uerj-blue to-uerj-blue-dark text-white rounded-2xl p-5 shadow-sm border border-blue-900/10 space-y-3 cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all group select-none"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                    <BookOpen className="h-5 w-5 text-uerj-yellow" />
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-uerj-yellow text-uerj-blue px-2 py-0.5 rounded-md">
                    <Sparkles className="h-3 w-3" /> UERJ-ZO
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">Guia de Disciplinas</h3>
                  <p className="text-xs text-blue-200 mt-1 leading-relaxed">
                    Drives com provas antigas, resumos e avaliações da Zona Oeste (Campo Grande).
                  </p>
                </div>
                <div className="text-xs font-semibold text-uerj-yellow group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Acessar acervo acadêmico</span>
                  <span>→</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-uerj-blue font-bold text-sm">
                    <Utensils className="h-4 w-4" />
                    <h3>RU • UERJ Zona Oeste</h3>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-0.5">
                    <MapPin className="h-3 w-3" /> Campo Grande
                  </span>
                </div>
                <div className="text-xs space-y-2 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="font-semibold text-slate-800">Almoço de Hoje:</p>
                  <p>Frango Grelhado ao Molho de Ervas ou Opção Vegana com Soja Refogada.</p>
                  <div className="pt-1 flex items-center justify-between font-medium text-[11px] text-slate-500">
                    <span>Fila estimada: ~15 min</span>
                    <span className="text-emerald-600 font-bold">Aberto</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsRuModalOpen(true)}
                  className="w-full text-center text-xs font-semibold text-uerj-blue hover:text-uerj-blue-dark py-1 cursor-pointer transition-colors"
                >
                  Ver cardápio completo da semana →
                </button>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
                <div className="flex items-center gap-2.5 text-amber-600 font-bold text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <h3>Avisos • UERJ-ZO</h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="border-l-2 border-amber-500 pl-3 space-y-0.5">
                    <p className="font-semibold text-slate-800">Laboratórios de TI (FCEE)</p>
                    <p className="text-slate-500 text-[11px]">Acesso liberado para projetos práticos e grupos de estudo.</p>
                  </div>
                  <div className="border-l-2 border-uerj-blue pl-3 space-y-0.5">
                    <p className="font-semibold text-slate-800">Biblioteca Setorial ZO</p>
                    <p className="text-slate-500 text-[11px]">Novos exemplares de Redes e Engenharia de Software disponíveis.</p>
                  </div>
                </div>
              </div>

            </aside>

          </div>
        )}

      </main>

      <CreateTopicModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTopic={handleCreateTopic}
      />

      <RuMenuModal
        isOpen={isRuModalOpen}
        onClose={() => setIsRuModalOpen(false)}
        userRole="moderator"
      />

    </div>
  );
}

export default App;