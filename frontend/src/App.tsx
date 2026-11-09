import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Feed } from './components/Feed';
import { Profile } from './components/Profile';
import { GuiaDisciplinas } from './components/GuiaDisciplinas';
import { CreateTopicModal } from './components/CreateTopicModal';
import { RuMenuModal } from './components/RuMenuModal';
import type { TopicProps } from './components/TopicCard';
import { api, CATEGORY_MAP, type TopicoResponse } from './services/api';
import { useAuth } from './context/AuthContext';
import { Utensils, BookOpen, AlertCircle, Sparkles, MapPin, Loader2 } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';

function mapResponseToTopicProps(t: TopicoResponse, cursoPadrao = 'UERJ'): TopicProps {
  return {
    id: t.id.toString(),
    author: t.nomeAutor,
    authorId: t.autorId,
    course: cursoPadrao,
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
  const { usuario } = useAuth();
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
      setTopics(
        data.map((t) =>
          mapResponseToTopicProps(
            t,
            usuario && t.nomeAutor === usuario.nome ? usuario.curso : 'UERJ'
          )
        )
      );
    } catch (err) {
      console.error(err);
      setError('Não foi possível conectar ao servidor Spring Boot. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarTopicos();
  }, [usuario]);

  // Remove o tópico do estado sem precisar recarregar a página inteira
  const handleDeleteTopicFromState = (id: string) => {
    setTopics(prev => prev.filter(topic => topic.id !== id));
  };

  // Envia novo tópico para o Spring Boot utilizando o usuário autenticado
  const handleCreateTopic = async (newTopicData: { title: string; category: string; content: string }) => {
    if (!usuario) {
      alert('Você precisa estar logado para publicar um tópico!');
      return;
    }

    try {
      const categoriaId = CATEGORY_MAP[newTopicData.category] || 1;
      
      const payload = {
        titulo: newTopicData.title,
        conteudo: newTopicData.content,
        usuarioId: usuario.id,
        categoriaId: categoriaId
      };

      const topicoCriado = await api.criarTopico(payload);
      setTopics(prev => [mapResponseToTopicProps(topicoCriado, usuario.curso), ...prev]);
      setCurrentView('feed');
    } catch (err) {
      console.error(err);
      alert('Erro ao publicar tópico no servidor!');
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-[#121212] text-slate-900 dark:text-slate-100 font-sans antialiased transition-colors duration-200">
        
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
            <GuiaDisciplinas onBackToFeed={() => setCurrentView('feed')} />
          )}

          {currentView === 'feed' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              <div className="lg:col-span-3 space-y-6">
                {loading ? (
                  <div className="bg-white dark:bg-[#1E1E1E] p-12 rounded-3xl border border-slate-100 dark:border-[#2F2F2F] flex flex-col items-center justify-center gap-3 text-slate-500 dark:text-slate-400">
                    <Loader2 className="h-6 w-6 animate-spin text-uerj-blue dark:text-uerj-yellow" />
                    <span className="text-xs font-semibold">Carregando tópicos da UERJ-ZO...</span>
                  </div>
                ) : error ? (
                  <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 p-6 rounded-3xl text-rose-800 dark:text-rose-300 space-y-3">
                    <p className="text-xs font-bold">{error}</p>
                    <button 
                      onClick={carregarTopicos}
                      className="text-xs bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl font-bold cursor-pointer transition-colors"
                    >
                      Tentar Novamente
                    </button>
                  </div>
                ) : (
                  <Feed topics={topics} onDeleteTopic={handleDeleteTopicFromState} />
                )}
              </div>

              <aside className="space-y-6">
                
                {/* 1. Guia de Disciplinas */}
                <div 
                  onClick={() => setCurrentView('disciplines')}
                  className="bg-gradient-to-br from-uerj-blue to-uerj-blue-dark text-white rounded-2xl p-5 shadow-sm border border-blue-900/20 space-y-3 cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all group select-none"
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
                    <h3 className="font-bold text-sm leading-tight text-white">Guia de Disciplinas</h3>
                    <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                      Drives com provas antigas, resumos e avaliações da Zona Oeste (Campo Grande).
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-uerj-yellow group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Acessar acervo acadêmico</span>
                    <span>→</span>
                  </div>
                </div>

                {/* 2. Cardápio RU */}
                <div className="bg-gradient-to-br from-uerj-blue to-uerj-blue-dark text-white rounded-2xl p-5 shadow-sm border border-blue-900/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 text-uerj-yellow font-bold text-sm">
                      <Utensils className="h-4 w-4" />
                      <h3 className="text-white">RU • UERJ Zona Oeste</h3>
                    </div>
                    <span className="text-[10px] font-bold text-blue-200 flex items-center gap-0.5">
                      <MapPin className="h-3 w-3 text-uerj-yellow" /> Campo Grande
                    </span>
                  </div>
                  <div className="text-xs space-y-2 text-blue-100 bg-white/10 p-3 rounded-xl border border-white/15">
                    <p className="font-semibold text-white">Almoço de Hoje:</p>
                    <p>Frango Grelhado ao Molho de Ervas ou Opção Vegana com Soja Refogada.</p>
                    <div className="pt-1 flex items-center justify-between font-medium text-[11px] text-blue-200">
                      <span>Fila estimada: ~15 min</span>
                      <span className="text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-md">Aberto</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsRuModalOpen(true)}
                    className="w-full text-center text-xs font-bold text-uerj-yellow hover:text-amber-300 py-1 cursor-pointer transition-colors"
                  >
                    Ver cardápio completo da semana →
                  </button>
                </div>

                {/* 3. Avisos Institucionais */}
                <div className="bg-gradient-to-br from-uerj-blue to-uerj-blue-dark text-white rounded-2xl p-5 shadow-sm border border-blue-900/20 space-y-4">
                  <div className="flex items-center gap-2.5 text-uerj-yellow font-bold text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <h3 className="text-white">Avisos • UERJ-ZO</h3>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="border-l-2 border-uerj-yellow pl-3 space-y-0.5">
                      <p className="font-semibold text-white">Laboratórios de TI (FCEE)</p>
                      <p className="text-blue-100 text-[11px]">Acesso liberado para projetos práticos e grupos de estudo.</p>
                    </div>
                    <div className="border-l-2 border-blue-300 pl-3 space-y-0.5">
                      <p className="font-semibold text-white">Biblioteca Setorial ZO</p>
                      <p className="text-blue-100 text-[11px]">Novos exemplares de Redes e Engenharia de Software disponíveis.</p>
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
        />

      </div>
    </ThemeProvider>
  );
}

export default App;