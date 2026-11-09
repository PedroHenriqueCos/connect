import { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  ArrowLeft,
  BookOpen,
  ArrowRight,
  FolderGit2
} from 'lucide-react';
import { DISCIPLINAS, type Disciplina } from '../data/disciplinasData';
import { DisciplinaDetalhes } from './DisciplinaDetalhes';

interface GuiaDisciplinasProps {
  onBackToFeed: () => void;
  currentUser?: {
    id: number;
    nome: string;
    role: string;
  };
}

export function GuiaDisciplinas({ onBackToFeed, currentUser }: GuiaDisciplinasProps) {
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<Disciplina | null>(null);
  const [periodoAtivo, setPeriodoAtivo] = useState<number>(1);
  const [busca, setBusca] = useState('');

  const periodos = [1, 2, 3, 4, 5, 6];

  // Se o usuário clicou em uma matéria, abre a aba detalhada da disciplina
  if (disciplinaSelecionada) {
    return (
      <DisciplinaDetalhes
        disciplina={disciplinaSelecionada}
        onBack={() => setDisciplinaSelecionada(null)}
        currentUser={currentUser}
      />
    );
  }

  // Filtra por termo pesquisado ou exibe as matérias do período ativo
  const disciplinasExibidas = DISCIPLINAS.filter((disc: Disciplina) => {
    const termo = busca.trim().toLowerCase();
    if (termo) {
      return (
        disc.nome.toLowerCase().includes(termo) ||
        disc.codigo.toLowerCase().includes(termo)
      );
    }
    return disc.periodo === periodoAtivo;
  });

  return (
    <div className="space-y-6">
      
      {/* Botão de Retorno ao Feed */}
      <button
        onClick={onBackToFeed}
        className="inline-flex items-center gap-2 text-xs font-semibold text-uerj-blue hover:text-uerj-blue-dark dark:text-yellow-400 dark:hover:text-yellow-300 bg-white dark:bg-[#1E1E1E] px-3.5 py-2 rounded-xl shadow-sm border border-slate-100 dark:border-[#2F2F2F] transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao Feed Principal
      </button>

      {/* Faixa de Apresentação */}
      <div className="bg-gradient-to-r from-uerj-blue to-uerj-blue-dark dark:from-[#18181b] dark:to-[#121212] rounded-3xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden border border-transparent dark:border-[#27272a]">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 dark:bg-zinc-800/80 backdrop-blur-md text-xs font-bold text-uerj-yellow dark:text-yellow-400 tracking-wide uppercase mb-3">
            <GraduationCap className="h-4 w-4" /> Grade Curricular & Acervo
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Guia de Disciplinas • UERJ-ZO
          </h1>
          <p className="text-blue-100 dark:text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">
            Selecione uma disciplina para acessar o mural colaborativo de resumos, materiais de apoio, anotações e provas anteriores compartilhados pelos estudantes.
          </p>
        </div>
      </div>

      {/* Barra de Pesquisa e Abas de Período */}
      <div className="bg-white dark:bg-[#1E1E1E] p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-[#2F2F2F] shadow-sm space-y-4 transition-colors">
        
        {/* Campo de Pesquisa */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-zinc-500" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquise pelo nome da matéria ou código (ex: FCEE01, Algoritmos...)"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-[#242424] text-xs text-slate-800 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-uerj-blue dark:focus:border-yellow-400 focus:ring-1 focus:ring-uerj-blue dark:focus:ring-yellow-400 transition-all"
          />
        </div>

        {/* Abas dos Períodos */}
        {!busca && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {periodos.map((p) => (
              <button
                key={p}
                onClick={() => setPeriodoAtivo(p)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  periodoAtivo === p
                    ? 'bg-uerj-blue text-white shadow-sm dark:bg-yellow-400 dark:text-zinc-950'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100 dark:bg-[#242424] dark:text-zinc-300 dark:hover:bg-[#2a2a2a] dark:border-zinc-700'
                }`}
              >
                {p}º Período
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lista das Disciplinas Clicáveis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {disciplinasExibidas.length > 0 ? (
          disciplinasExibidas.map((materia) => (
            <div 
              key={materia.codigo}
              onClick={() => setDisciplinaSelecionada(materia)}
              className="bg-white dark:bg-[#1E1E1E] p-5 rounded-2xl border-2 border-uerj-blue/30 dark:border-zinc-700 hover:border-uerj-blue dark:hover:border-yellow-400 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#242424] text-slate-700 dark:text-zinc-300 border border-transparent dark:border-zinc-700">
                    {materia.codigo}
                  </span>
                  <span className="text-[11px] font-bold text-uerj-blue dark:text-yellow-400 bg-blue-50 dark:bg-yellow-400/10 border border-blue-200/50 dark:border-yellow-400/30 px-2 py-0.5 rounded-md">
                    {materia.periodo}º Período
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100 mb-1 flex items-center gap-2 group-hover:text-uerj-blue dark:group-hover:text-yellow-400 transition-colors">
                  <BookOpen className="h-4 w-4 text-uerj-blue dark:text-yellow-400 shrink-0" />
                  {materia.nome}
                </h3>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-[#2F2F2F] flex items-center justify-between">
                <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium flex items-center gap-1">
                  <FolderGit2 className="h-3.5 w-3.5 text-uerj-blue dark:text-yellow-400" />
                  Ver materiais e links
                </span>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-uerj-blue dark:text-yellow-400 group-hover:translate-x-1 transition-transform">
                  Acessar
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white dark:bg-[#1E1E1E] p-8 rounded-2xl border border-slate-100 dark:border-[#2F2F2F] text-center text-xs text-slate-500 dark:text-zinc-400">
            Nenhuma disciplina encontrada com esse termo de pesquisa.
          </div>
        )}
      </div>

    </div>
  );
}