import { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Star, 
  ExternalLink, 
  MessageSquare, 
  Plus,
  ThumbsUp,
  FolderGit2,
  MapPin
} from 'lucide-react';

interface Review {
  id: string;
  author: string;
  period: string;
  rating: number;
  comment: string;
  likes: number;
  tags: string[];
}

interface Discipline {
  id: string;
  code: string;
  name: string;
  department: string;
  period: string;
  avgRating: number;
  totalReviews: number;
  difficulty: 'Fácil' | 'Média' | 'Difícil' | 'Muito Difícil';
  driveUrl: string;
  reviews: Review[];
}

const DISCIPLINES_DATA: Discipline[] = [
  {
    id: '1',
    code: 'ZO-INF101',
    name: 'Algoritmos e Estrutura de Dados I',
    department: 'FCEE - Faculdade de Ciências Exatas e Engenharias (Campo Grande)',
    period: '1º Período',
    avgRating: 4.7,
    totalReviews: 32,
    difficulty: 'Média',
    driveUrl: 'https://drive.google.com',
    reviews: [
      {
        id: 'r1',
        author: 'Estudante Anônimo',
        period: 'Cursado em 2025/1 (UERJ-ZO)',
        rating: 5,
        comment: 'Façam todas as listas no laboratório de informática! As avaliações cobram bastante ponteiros e alocação dinâmica.',
        likes: 14,
        tags: ['Listas Práticas', 'Laboratório UERJ-ZO']
      },
      {
        id: 'r2',
        author: 'Estudante Anônimo',
        period: 'Cursado em 2024/2',
        rating: 4,
        comment: 'A matéria é muito bem estruturada se praticar código toda semana.',
        likes: 8,
        tags: ['Estudo Contínuo']
      }
    ]
  },
  {
    id: '2',
    code: 'ZO-INF205',
    name: 'Redes de Computadores e Segurança',
    department: 'FCEE - Faculdade de Ciências Exatas e Engenharias (Campo Grande)',
    period: '5º Período',
    avgRating: 4.9,
    totalReviews: 24,
    difficulty: 'Difícil',
    driveUrl: 'https://drive.google.com',
    reviews: [
      {
        id: 'r3',
        author: 'Estudante Anônimo',
        period: 'Cursado em 2025/2 (UERJ-ZO)',
        rating: 5,
        comment: 'Foco total em cálculo de sub-redes IPv4/IPv6, roteamento e segurança lógica (VLANs e Firewalls). O drive tem provas antigas comentadas!',
        likes: 18,
        tags: ['Sub-redes', 'Segurança Lógica', 'Drives UERJ-ZO']
      }
    ]
  },
  {
    id: '3',
    code: 'ZO-MAT101',
    name: 'Cálculo Diferencial e Integral I',
    department: 'FCEE - Faculdade de Ciências Exatas e Engenharias (Campo Grande)',
    period: '1º Período',
    avgRating: 3.4,
    totalReviews: 51,
    difficulty: 'Muito Difícil',
    driveUrl: 'https://drive.google.com',
    reviews: [
      {
        id: 'r4',
        author: 'Estudante Anônimo',
        period: 'Cursado em 2025/1',
        rating: 3,
        comment: 'Aproveitem as monitorias no campus de Campo Grande. As provas exigem domínio de derivadas e limites trigonométricos.',
        likes: 27,
        tags: ['Monitoria UERJ-ZO', 'Provas Antigas']
      }
    ]
  }
];

export function Disciplines() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(DISCIPLINES_DATA[0]);

  const filteredDisciplines = DISCIPLINES_DATA.filter((disc) =>
    disc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disc.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Banner de Apresentação */}
      <div className="bg-gradient-to-r from-uerj-blue to-uerj-blue-dark rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-uerj-yellow" />
              Guia de Disciplinas & Avaliações
            </h2>
            <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1">
              <MapPin className="h-3 w-3 text-uerj-yellow" /> UERJ Zona Oeste
            </span>
          </div>
          <p className="text-xs text-blue-100 max-w-xl">
            Acervo acadêmico com provas antigas, resumos e avaliações de disciplinas do Campus Campo Grande (FCEE & FCBS).
          </p>
        </div>
        <button className="bg-uerj-yellow hover:bg-yellow-400 text-uerj-blue font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer shrink-0">
          <Plus className="h-4 w-4 stroke-[3]" />
          <span>Avaliar Disciplina</span>
        </button>
      </div>

      {/* Grid de Busca e Conteúdo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Coluna da Esquerda: Lista de Matérias */}
        <div className="space-y-4">
          
          {/* Barra de Busca */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por código ou nome (UERJ-ZO)..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-uerj-blue transition-all shadow-sm"
            />
          </div>

          {/* Cards Rápidos */}
          <div className="space-y-3">
            {filteredDisciplines.map((item) => {
              const isSelected = selectedDiscipline?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedDiscipline(item)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'bg-white border-uerj-blue shadow-md ring-2 ring-uerj-blue/10'
                      : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold text-uerj-blue bg-blue-50 px-2 py-0.5 rounded-md">
                      {item.code}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      item.difficulty === 'Fácil' ? 'bg-emerald-50 text-emerald-700' :
                      item.difficulty === 'Média' ? 'bg-blue-50 text-blue-700' :
                      item.difficulty === 'Difícil' ? 'bg-amber-50 text-amber-700' :
                      'bg-rose-50 text-rose-700'
                    }`}>
                      {item.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 mt-2 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {item.period}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                    <div className="flex items-center gap-1 font-bold text-amber-600">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.avgRating.toFixed(1)}</span>
                    </div>
                    <span className="text-slate-400">
                      {item.totalReviews} avaliações
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coluna da Direita: Detalhes da Matéria */}
        <div className="lg:col-span-2 space-y-5">
          {selectedDiscipline ? (
            <>
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-uerj-blue bg-blue-50 px-2.5 py-1 rounded-lg">
                        {selectedDiscipline.code}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {selectedDiscipline.period}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {selectedDiscipline.name}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {selectedDiscipline.department}
                    </p>
                  </div>

                  <a
                    href={selectedDiscipline.driveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer shrink-0"
                  >
                    <FolderGit2 className="h-4 w-4 text-uerj-yellow" />
                    <span>Drive de Materiais ZO</span>
                    <ExternalLink className="h-3 w-3 text-slate-400" />
                  </a>
                </div>

                {/* Métricas */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <p className="text-[11px] text-slate-500">Média Geral</p>
                    <div className="flex items-center gap-1 mt-0.5 font-bold text-slate-800 text-sm">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span>{selectedDiscipline.avgRating} / 5.0</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl">
                    <p className="text-[11px] text-slate-500">Dificuldade</p>
                    <p className="font-bold text-slate-800 text-sm mt-0.5">
                      {selectedDiscipline.difficulty}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl col-span-2 sm:col-span-1">
                    <p className="text-[11px] text-slate-500">Total de Dicas</p>
                    <p className="font-bold text-slate-800 text-sm mt-0.5">
                      {selectedDiscipline.totalReviews} relatos
                    </p>
                  </div>
                </div>
              </div>

              {/* Seção de Relatos */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="h-4 w-4 text-uerj-blue" />
                  Dicas de Alunos da UERJ-ZO
                </h3>

                <div className="space-y-3">
                  {selectedDiscipline.reviews.map((rev) => (
                    <div key={rev.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{rev.author}</p>
                          <p className="text-[10px] text-slate-400">{rev.period}</p>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < rev.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'fill-slate-200 text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">
                        "{rev.comment}"
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-50 text-[11px]">
                        <div className="flex flex-wrap gap-1.5">
                          {rev.tags.map((tag) => (
                            <span key={tag} className="bg-blue-50 text-uerj-blue px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <button className="flex items-center gap-1 text-slate-500 hover:text-uerj-blue transition-colors cursor-pointer">
                          <ThumbsUp className="h-3.5 w-3.5" />
                          <span>Útil ({rev.likes})</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-slate-100 text-center">
              <p className="text-sm font-semibold text-slate-600">Selecione uma disciplina</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}