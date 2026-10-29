import { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  ExternalLink, 
  Trash2, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  FileText, 
  BookOpen,
  Calendar,
  User,
  Upload,
  CheckCircle2
} from 'lucide-react';
import { type Disciplina } from '../data/disciplinasData';
import { materialService, type MaterialDisciplina } from '../services/materialService';

interface DisciplinaDetalhesProps {
  disciplina: Disciplina;
  onBack: () => void;
  currentUser?: {
    id: number;
    nome: string;
    role: string;
  };
}

export function DisciplinaDetalhes({ disciplina, onBack, currentUser = { id: 1, nome: 'Pedro', role: 'ALUNO' } }: DisciplinaDetalhesProps) {
  const [materiais, setMateriais] = useState<MaterialDisciplina[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Campos do formulário
  const [titulo, setTitulo] = useState('');
  const [url, setUrl] = useState('');
  const [ficheiroSelecionado, setFicheiroSelecionado] = useState<File | null>(null);
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState<'LINK' | 'IMAGEM' | 'DOCUMENTO'>('LINK');
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const carregarMateriais = async () => {
    try {
      setLoading(true);
      const data = await materialService.listarPorDisciplina(disciplina.codigo);
      setMateriais(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarMateriais();
  }, [disciplina.codigo]);

  const handleTipoChange = (novoTipo: 'LINK' | 'IMAGEM' | 'DOCUMENTO') => {
    setTipo(novoTipo);
    setUrl('');
    setFicheiroSelecionado(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    try {
      setSubmitting(true);
      let urlFinal = url.trim();

      // Se for imagem ou documento vindo do computador, faz upload primeiro
      if (tipo !== 'LINK') {
        if (!ficheiroSelecionado) {
          alert('Por favor, selecione um ficheiro do seu computador.');
          setSubmitting(false);
          return;
        }
        urlFinal = await materialService.fazerUploadArquivo(ficheiroSelecionado);
      } else if (!urlFinal) {
        alert('Por favor, introduza o link do material.');
        setSubmitting(false);
        return;
      }

      await materialService.criarMaterial({
        titulo: titulo.trim(),
        url: urlFinal,
        descricao: descricao.trim() || undefined,
        codigoDisciplina: disciplina.codigo,
        tipo,
        usuarioId: currentUser.id
      });

      setTitulo('');
      setUrl('');
      setFicheiroSelecionado(null);
      setDescricao('');
      setTipo('LINK');
      setShowModal(false);
      await carregarMateriais();
    } catch (err) {
      alert('Erro ao publicar o material. Tente novamente.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleExcluir = async (materialId: number) => {
    if (!window.confirm('Tem a certeza de que deseja apagar este material?')) return;
    try {
      await materialService.excluirMaterial(materialId, currentUser.id);
      setMateriais(prev => prev.filter(m => m.id !== materialId));
    } catch (err) {
      alert('Não foi possível remover o material ou não tem permissão.');
      console.error(err);
    }
  };

  const podeExcluir = (mat: MaterialDisciplina) => {
    const isAutor = mat.autorId === currentUser.id;
    const isModerador = currentUser.role === 'MODERADOR' || currentUser.role === 'ADMIN';
    return isAutor || isModerador;
  };

  const getIconeTipo = (t: string) => {
    switch (t) {
      case 'IMAGEM':
        return <ImageIcon className="h-4 w-4 text-emerald-600" />;
      case 'DOCUMENTO':
        return <FileText className="h-4 w-4 text-amber-600" />;
      default:
        return <LinkIcon className="h-4 w-4 text-uerj-blue" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Botão Voltar */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-uerj-blue hover:text-uerj-blue-dark bg-white px-3.5 py-2 rounded-xl shadow-sm border border-slate-100 transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao Guia de Disciplinas
      </button>

      {/* Cartão de Destaque da Disciplina */}
      <div className="bg-gradient-to-r from-uerj-blue to-uerj-blue-dark rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-xs font-mono font-bold text-white">
              {disciplina.codigo}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-uerj-yellow/20 text-uerj-yellow text-xs font-bold">
              {disciplina.periodo}º Período
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5">
            <BookOpen className="h-7 w-7 text-uerj-yellow shrink-0" />
            {disciplina.nome}
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm mt-2 max-w-xl">
            Espaço colaborativo para partilha de apontamentos, resumos, provas antigas e hiperligações para esta cadeira.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-uerj-yellow hover:bg-yellow-400 text-slate-900 font-bold text-xs transition-colors shadow-sm shrink-0 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Partilhar Material
        </button>
      </div>

      {/* Modal de Publicação */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Adicionar Material à Matéria</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título do Conteúdo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Resumo de Ponteiros e Structs"
                  value={titulo}
                  onChange={e => setTitulo(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-uerj-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Material</label>
                <select
                  value={tipo}
                  onChange={e => handleTipoChange(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-uerj-blue"
                >
                  <option value="LINK">Link / Google Drive</option>
                  <option value="IMAGEM">Foto / Imagem do PC</option>
                  <option value="DOCUMENTO">PDF / Documento do PC</option>
                </select>
              </div>

              {/* Campo dinâmico: Link manual ou Seleção de ficheiro local */}
              {tipo === 'LINK' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hiperligação / URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://drive.google.com/... ou https://..."
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-uerj-blue"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Selecionar ficheiro do computador ({tipo === 'IMAGEM' ? 'PNG, JPG, WEBP' : 'PDF, DOCX, TXT'})
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    required
                    accept={tipo === 'IMAGEM' ? 'image/*' : '.pdf,.doc,.docx,.txt,.zip,.rar'}
                    onChange={e => setFicheiroSelecionado(e.target.files?.[0] || null)}
                    className="hidden"
                    id="file-upload-input"
                  />
                  <label
                    htmlFor="file-upload-input"
                    className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-xl hover:border-uerj-blue bg-slate-50 hover:bg-blue-50/40 cursor-pointer transition-colors"
                  >
                    {ficheiroSelecionado ? (
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        <span className="truncate max-w-[260px]">{ficheiroSelecionado.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-xs text-slate-500">
                        <Upload className="h-5 w-5 text-uerj-blue" />
                        <span className="font-semibold text-slate-700">Clique para escolher o ficheiro</span>
                        <span className="text-[10px] text-slate-400">Até 20MB</span>
                      </div>
                    )}
                  </label>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Descrição Breve (opcional)</label>
                <textarea
                  rows={2}
                  placeholder="Adicione orientações sobre este ficheiro..."
                  value={descricao}
                  onChange={e => setDescricao(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-uerj-blue resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-xs font-bold bg-uerj-blue text-white rounded-xl hover:bg-uerj-blue-dark transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'A enviar...' : 'Publicar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de Materiais */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-800">Materiais Partilhados pelos Estudantes</h2>

        {loading ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center text-xs text-slate-500">
            A carregar materiais...
          </div>
        ) : materiais.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {materiais.map(mat => (
              <div 
                key={mat.id}
                className="bg-white p-4 rounded-2xl border-2 border-uerj-blue/20 hover:border-uerj-blue shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-[11px] font-semibold text-slate-700">
                      {getIconeTipo(mat.tipo)}
                      {mat.tipo}
                    </span>

                    {podeExcluir(mat) && (
                      <button
                        onClick={() => handleExcluir(mat.id)}
                        title="Eliminar material"
                        className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 mb-1">{mat.titulo}</h3>
                  {mat.descricao && (
                    <p className="text-[11px] text-slate-600 mb-3 leading-relaxed">{mat.descricao}</p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {mat.nomeAutor}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(mat.dataCriacao).toLocaleDateString('pt-PT')}</span>
                  </div>

                  <a
                    href={mat.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-uerj-blue hover:text-uerj-blue-dark transition-colors"
                  >
                    {mat.tipo === 'LINK' ? 'Abrir' : 'Ver Ficheiro'}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center text-xs text-slate-500">
            Ainda não há materiais partilhados para esta cadeira. Seja o primeiro a partilhar!
          </div>
        )}
      </div>
    </div>
  );
}