import { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2, Send, Loader2, Trash2 } from 'lucide-react';
import { api, type ComentarioResponse } from '../services/api';

export interface TopicProps {
  id: string;
  author: string;
  course: string;
  category: string;
  title: string;
  content: string;
  likesCount?: number;
  createdAt: string;
  initialComments?: any[];
}

interface ExtendedTopicProps extends TopicProps {
  onDeleteTopic?: (id: string) => void;
}

export function TopicCard(props: ExtendedTopicProps | { topic: ExtendedTopicProps; onDeleteTopic?: (id: string) => void }) {
  // Trata compatibilidade caso venha via `topic={...}` ou direto `{...topic}`
  const hasTopicProp = 'topic' in props && props.topic;
  const data: TopicProps = hasTopicProp ? props.topic : (props as TopicProps);
  const onDeleteTopic = hasTopicProp ? props.onDeleteTopic : (props as ExtendedTopicProps).onDeleteTopic;

  const {
    id = '0',
    author = 'Usuário',
    course = 'Ciência da Computação (UERJ-ZO)',
    category = 'Geral',
    title = '',
    content = '',
    likesCount = 0,
    createdAt = ''
  } = data || {};

  // Votação
  const [likes, setLikes] = useState<number>(likesCount);
  const [hasVoted, setHasVoted] = useState<boolean>(() => {
    const votedTopics = JSON.parse(localStorage.getItem('@connect:voted_topics') || '[]');
    return votedTopics.includes(id);
  });
  const [isVoting, setIsVoting] = useState(false);

  // Comentários
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<ComentarioResponse[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isDeletingTopic, setIsDeletingTopic] = useState(false);

  // Curtir / Descurtir
  const handleVote = async () => {
    if (isVoting) return;

    try {
      setIsVoting(true);
      const valor = hasVoted ? -1 : 1;
      setLikes(prev => Math.max(0, prev + valor));
      const nextVotedState = !hasVoted;
      setHasVoted(nextVotedState);

      const votedTopics: string[] = JSON.parse(localStorage.getItem('@connect:voted_topics') || '[]');
      if (nextVotedState) {
        if (!votedTopics.includes(id)) votedTopics.push(id);
      } else {
        const idx = votedTopics.indexOf(id);
        if (idx > -1) votedTopics.splice(idx, 1);
      }
      localStorage.setItem('@connect:voted_topics', JSON.stringify(votedTopics));

      const updated = await api.votarTopico(Number(id), valor);
      if (updated && typeof updated.votos === 'number') {
        setLikes(updated.votos);
      }
    } catch (err) {
      console.error('Erro ao votar no tópico:', err);
      setLikes(likesCount);
      setHasVoted(!hasVoted);
    } finally {
      setIsVoting(false);
    }
  };

  // Abrir / Fechar gaveta de comentários
  const toggleComments = async () => {
    const nextState = !showComments;
    setShowComments(nextState);

    if (nextState && comments.length === 0) {
      try {
        setLoadingComments(true);
        const data = await api.getComentarios(Number(id));
        setComments(data);
      } catch (err) {
        console.error('Erro ao buscar comentários:', err);
      } finally {
        setLoadingComments(false);
      }
    }
  };

  // Enviar comentário
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || isSubmittingComment) return;

    try {
      setIsSubmittingComment(true);
      const novo = await api.criarComentario(Number(id), {
        conteudo: newCommentText.trim(),
        usuarioId: 1
      });
      setComments(prev => [...prev, novo]);
      setNewCommentText('');
    } catch (err) {
      console.error('Erro ao enviar comentário:', err);
      alert('Não foi possível enviar seu comentário.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Excluir tópico
  const handleDeleteTopic = async () => {
    if (!window.confirm('Tem certeza de que deseja apagar este tópico?')) return;

    try {
      setIsDeletingTopic(true);
      await api.deletarTopico(Number(id));
      if (onDeleteTopic) {
        onDeleteTopic(id);
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error('Erro ao apagar tópico:', err);
      alert('Não foi possível excluir o tópico.');
      setIsDeletingTopic(false);
    }
  };

  // Excluir comentário
  const handleDeleteComment = async (comentarioId: number) => {
    if (!window.confirm('Deseja apagar esta resposta?')) return;

    try {
      await api.deletarComentario(Number(id), comentarioId);
      setComments(prev => prev.filter(c => c.id !== comentarioId));
    } catch (err) {
      console.error('Erro ao apagar comentário:', err);
      alert('Não foi possível excluir a resposta.');
    }
  };

  return (
    <article className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-slate-200 transition-all space-y-4">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700">
            {author ? author.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">{author}</h4>
            <p className="text-slate-400 text-xs">{course}</p>
          </div>
        </div>

        {/* Data e Botão de Deletar Tópico */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">{createdAt}</span>
          <button
            onClick={handleDeleteTopic}
            disabled={isDeletingTopic}
            className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            title="Excluir tópico"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Categoria */}
      <div>
        <span className="inline-block bg-amber-50 text-amber-700 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-amber-200/60">
          {category}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="space-y-1.5">
        <h3 className="font-bold text-slate-900 text-base leading-snug">{title}</h3>
        <p className="text-slate-600 text-xs leading-relaxed">{content}</p>
      </div>

      {/* Ações */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
        <button
          onClick={handleVote}
          disabled={isVoting}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            hasVoted ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-slate-50 text-slate-600'
          }`}
        >
          <ThumbsUp className={`h-4 w-4 ${hasVoted ? 'fill-blue-600 text-blue-600' : ''}`} />
          <span>{likes} {likes === 1 ? 'curtida' : 'curtidas'}</span>
        </button>

        <button
          onClick={toggleComments}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
            showComments ? 'bg-slate-100 font-bold text-slate-800' : 'hover:bg-slate-50 text-slate-600'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          <span>{comments.length > 0 ? `${comments.length} respostas` : 'Comentários'}</span>
        </button>

        <button className="flex items-center gap-1.5 hover:bg-slate-50 px-3 py-1.5 rounded-xl transition-colors cursor-pointer">
          <Share2 className="h-4 w-4" />
          <span>Compartilhar</span>
        </button>
      </div>

      {/* Gaveta de Comentários */}
      {showComments && (
        <div className="pt-4 mt-2 border-t border-slate-100 space-y-4">
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              placeholder="Escreva uma resposta..."
              value={newCommentText}
              onChange={e => setNewCommentText(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isSubmittingComment || !newCommentText.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              {isSubmittingComment ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
              <span>Responder</span>
            </button>
          </form>

          {loadingComments ? (
            <div className="flex justify-center py-3 text-slate-400">
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            </div>
          ) : comments.length === 0 ? (
            <p className="text-center text-xs text-slate-400 py-2">Seja o primeiro a responder este tópico!</p>
          ) : (
            <div className="space-y-2.5">
              {comments.map(c => (
                <div key={c.id} className="bg-slate-50 border border-slate-100 p-3 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-700">
                      {c.autorNome} <span className="text-slate-400 font-normal">({c.autorCurso})</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">
                        {new Date(c.dataCriacao).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <button
                        onClick={() => handleDeleteComment(c.id)}
                        className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors cursor-pointer"
                        title="Excluir resposta"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{c.conteudo}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}