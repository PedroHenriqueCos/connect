import { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2, Send, Loader2, Trash2 } from 'lucide-react';
import { api, type ComentarioResponse } from '../services/api';
import { useAuth } from '../context/AuthContext';

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
  authorId?: number;
}

interface ExtendedTopicProps extends TopicProps {
  onDeleteTopic?: (id: string) => void;
}

export function TopicCard(props: ExtendedTopicProps | { topic: ExtendedTopicProps; onDeleteTopic?: (id: string) => void }) {
  const { usuario } = useAuth();

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
    createdAt = '',
    authorId
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

  // Verificações de permissão
  const isAuthor = Boolean(
    usuario && (
      (authorId && usuario.id === authorId) ||
      usuario.nome.trim().toLowerCase() === author.trim().toLowerCase()
    )
  );
  const isModerator = Boolean(usuario && (usuario.role === 'MODERADOR' || usuario.role === 'ADMIN'));
  const canDeleteTopic = isAuthor || isModerator;

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

  // Enviar comentário com o id real do usuário autenticado
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || isSubmittingComment) return;

    if (!usuario) {
      alert('Você precisa estar logado para responder.');
      return;
    }

    try {
      setIsSubmittingComment(true);
      const novo = await api.criarComentario(Number(id), {
        conteudo: newCommentText.trim(),
        usuarioId: usuario.id
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

  // Excluir tópico (Autor ou Moderador)
  const handleDeleteTopic = async () => {
    if (!usuario) {
      alert('Você precisa estar logado para apagar um tópico.');
      return;
    }

    const mensagemConfirmacao = isModerator && !isAuthor
      ? 'Ação de Moderação: Tem certeza de que deseja apagar este tópico?'
      : 'Tem certeza de que deseja apagar o seu tópico?';

    if (!window.confirm(mensagemConfirmacao)) return;

    try {
      setIsDeletingTopic(true);
      await api.deletarTopico(Number(id), usuario.id);
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
   <article className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 shadow-sm border-2 border-uerj-blue/30 hover:border-uerj-blue dark:border-uerj-blue/40 dark:hover:border-uerj-blue transition-all space-y-4">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-[#27272a] border border-slate-200 dark:border-zinc-700 flex items-center justify-center font-bold text-slate-700 dark:text-zinc-200">
            {author ? author.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-zinc-100 text-sm">{author}</h4>
            <p className="text-slate-400 dark:text-zinc-400 text-xs">{course}</p>
          </div>
        </div>

        {/* Data e Botão de Deletar Tópico */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 dark:text-zinc-500">{createdAt}</span>
          {canDeleteTopic && (
            <button
              onClick={handleDeleteTopic}
              disabled={isDeletingTopic}
              className="text-slate-400 dark:text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 p-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              title={isModerator && !isAuthor ? 'Moderação: Excluir tópico' : 'Excluir seu tópico'}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Categoria */}
      <div>
        <span className="inline-block bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-amber-200/60 dark:border-amber-500/20">
          {category}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="space-y-1.5">
        <h3 className="font-bold text-slate-900 dark:text-zinc-100 text-base leading-snug">{title}</h3>
        <p className="text-slate-600 dark:text-zinc-300 text-xs leading-relaxed">{content}</p>
      </div>

      {/* Ações */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-[#2F2F2F] text-xs text-slate-500 dark:text-zinc-400">
        <button
          onClick={handleVote}
          disabled={isVoting}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            hasVoted
              ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold'
              : 'hover:bg-slate-50 dark:hover:bg-[#27272a] text-slate-600 dark:text-zinc-300'
          }`}
        >
          <ThumbsUp className={`h-4 w-4 ${hasVoted ? 'fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400' : ''}`} />
          <span>{likes} {likes === 1 ? 'curtida' : 'curtidas'}</span>
        </button>

        <button
          onClick={toggleComments}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
            showComments
              ? 'bg-slate-100 dark:bg-[#27272a] font-bold text-slate-800 dark:text-zinc-100'
              : 'hover:bg-slate-50 dark:hover:bg-[#27272a] text-slate-600 dark:text-zinc-300'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          <span>{comments.length > 0 ? `${comments.length} respostas` : 'Comentários'}</span>
        </button>

        <button className="flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-[#27272a] px-3 py-1.5 rounded-xl transition-colors cursor-pointer text-slate-600 dark:text-zinc-300">
          <Share2 className="h-4 w-4" />
          <span>Compartilhar</span>
        </button>
      </div>

      {/* Gaveta de Comentários */}
      {showComments && (
        <div className="pt-4 mt-2 border-t border-slate-100 dark:border-[#2F2F2F] space-y-4">
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              placeholder={usuario ? "Escreva uma resposta..." : "Faça login para responder..."}
              disabled={!usuario || isSubmittingComment}
              value={newCommentText}
              onChange={e => setNewCommentText(e.target.value)}
              className="flex-1 bg-slate-50 dark:bg-[#242424] border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-slate-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 dark:disabled:bg-zinc-800 disabled:cursor-not-allowed placeholder:text-slate-400 dark:placeholder:text-zinc-500"
            />
            <button
              type="submit"
              disabled={!usuario || isSubmittingComment || !newCommentText.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              {isSubmittingComment ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
              <span>Responder</span>
            </button>
          </form>

          {loadingComments ? (
            <div className="flex justify-center py-3 text-slate-400 dark:text-zinc-500">
              <Loader2 className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-400" />
            </div>
          ) : comments.length === 0 ? (
            <p className="text-center text-xs text-slate-400 dark:text-zinc-500 py-2">Seja o primeiro a responder este tópico!</p>
          ) : (
            <div className="space-y-2.5">
              {comments.map(c => {
                const isCommentAuthor = Boolean(
                  usuario && usuario.nome.trim().toLowerCase() === c.autorNome.trim().toLowerCase()
                );

                return (
                  <div key={c.id} className="bg-slate-50 dark:bg-[#242424] border border-slate-100 dark:border-zinc-700/60 p-3 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-700 dark:text-zinc-200">
                        {c.autorNome} <span className="text-slate-400 dark:text-zinc-500 font-normal">({c.autorCurso})</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 dark:text-zinc-500">
                          {new Date(c.dataCriacao).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {isCommentAuthor && (
                          <button
                            onClick={() => handleDeleteComment(c.id)}
                            className="text-slate-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
                            title="Excluir resposta"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">{c.conteudo}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </article>
  );
}