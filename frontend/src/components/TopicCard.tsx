import { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2, Send, Clock } from 'lucide-react';

export interface Comment {
  id: string;
  author: string;
  course: string;
  content: string;
  createdAt: string;
}

export interface TopicProps {
  id: string;
  author: string;
  course: string;
  category: string;
  title: string;
  content: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  initialComments?: Comment[];
}

export function TopicCard({
  author,
  course,
  category,
  title,
  content,
  likesCount: initialLikes,
  createdAt,
  initialComments = []
}: TopicProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newCommentText, setNewCommentText] = useState('');

  const handleLike = () => {
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'Pedro Andrade', // Usuário logado
      course: 'Ciência da Computação',
      content: newCommentText,
      createdAt: 'Agora mesmo'
    };

    setComments(prev => [...prev, newComment]);
    setNewCommentText('');
  };

  return (
    <article className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4 hover:border-slate-200 transition-all">
      
      {/* Cabeçalho do Card */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-uerj-blue/10 text-uerj-blue flex items-center justify-center font-bold text-sm">
            {author.charAt(0)}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">{author}</h4>
            <p className="text-xs text-gray-500">{course}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Clock className="h-3.5 w-3.5" />
          <span>{createdAt}</span>
        </div>
      </div>

      {/* Categoria e Título */}
      <div className="space-y-1.5">
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/50">
          {category}
        </span>
        <h3 className="text-base font-bold text-gray-900 hover:text-uerj-blue cursor-pointer transition-colors leading-snug">
          {title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {content}
        </p>
      </div>

      {/* Ações (Curtir, Comentar, Compartilhar) */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs font-medium text-gray-500">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition-colors ${
              hasLiked 
                ? 'bg-uerj-blue/10 text-uerj-blue font-bold' 
                : 'hover:bg-slate-100 hover:text-gray-700'
            }`}
          >
            <ThumbsUp className={`h-4 w-4 ${hasLiked ? 'fill-uerj-blue text-uerj-blue' : ''}`} />
            <span>{likes} {likes === 1 ? 'curtida' : 'curtidas'}</span>
          </button>

          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-100 hover:text-gray-700 transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{comments.length} {comments.length === 1 ? 'comentário' : 'comentários'}</span>
          </button>
        </div>

        <button className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-100 hover:text-gray-700 transition-colors">
          <Share2 className="h-4 w-4" />
          <span>Compartilhar</span>
        </button>
      </div>

      {/* Seção de Comentarios (Expandível) */}
      {showComments && (
        <div className="pt-4 border-t border-gray-100 space-y-4 animate-in fade-in duration-200">
          
          {/* Lista de Comentários */}
          {comments.length > 0 ? (
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-slate-50 p-3.5 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">{comment.author} <span className="font-normal text-gray-500">({comment.course})</span></span>
                    <span className="text-[10px] text-gray-400">{comment.createdAt}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic text-center py-2">
              Nenhum comentário ainda. Seja o primeiro a responder!
            </p>
          )}

          {/* Campo para Novo Comentário */}
          <form onSubmit={handleAddComment} className="flex gap-2 pt-2">
            <input 
              type="text"
              placeholder="Escreva um comentário..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="flex-1 bg-slate-100 text-xs px-3.5 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-uerj-blue/20 transition-all placeholder:text-gray-400"
            />
            <button 
              type="submit"
              className="bg-uerj-blue hover:bg-uerj-blue-dark text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Send className="h-3 w-3" />
            </button>
          </form>

        </div>
      )}

    </article>
  );
}