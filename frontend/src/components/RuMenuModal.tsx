import { useState, useEffect } from 'react';
import mascoteModImg from '../assets/mascote_mod.png';
import { 
  X, 
  Utensils, 
  Leaf, 
  ThumbsUp, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  Edit3, 
  ShieldCheck,
  ShieldAlert,
  MapPin,
  Loader2
} from 'lucide-react';
import { api, type DayMenuData } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface RuMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: 'student' | 'moderator' | 'admin';
}

export function RuMenuModal({ isOpen, onClose, userRole }: RuMenuModalProps) {
  const { usuario } = useAuth();
  const [menuList, setMenuList] = useState<DayMenuData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedMealType, setSelectedMealType] = useState<'lunch' | 'dinner'>('lunch');
  const [isEditing, setIsEditing] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);

  // Estados locais para edição
  const [editMainDish, setEditMainDish] = useState('');
  const [editVeganOption, setEditVeganOption] = useState('');
  const [editGarnish, setEditGarnish] = useState('');
  const [editDessert, setEditDessert] = useState('');

  // Controlo de confirmações por ID de dia guardado no localStorage
  const [confirmedDays, setConfirmedDays] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('@connect:confirmed_ru_days') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!isOpen) return;

    async function carregarCardapio() {
      try {
        setLoading(true);
        const data = await api.getCardapioSemana();
        setMenuList(data);
      } catch (err) {
        console.error('Erro ao carregar cardápio do RU:', err);
      } finally {
        setLoading(false);
      }
    }

    carregarCardapio();
  }, [isOpen]);

  if (!isOpen) return null;

  const currentDay = menuList[selectedDayIndex];
  const activeMeal = currentDay 
    ? (selectedMealType === 'lunch' ? currentDay.lunch : currentDay.dinner) 
    : null;

  // Moderação concedida se a role do usuário no backend for MODERADOR ou ADMIN, ou passada via prop
  const isModerator = usuario?.role === 'MODERADOR' || usuario?.role === 'ADMIN' || userRole === 'moderator' || userRole === 'admin';
  const hasConfirmedCurrentDay = currentDay ? confirmedDays.includes(currentDay.id) : false;

  const handleConfirmMenu = async () => {
    if (!currentDay || hasConfirmedCurrentDay) return;

    try {
      const atualizado = await api.confirmarCardapio(currentDay.id);
      setMenuList(prev => prev.map(item => item.id === atualizado.id ? atualizado : item));
      
      const novosConfirmados = [...confirmedDays, currentDay.id];
      setConfirmedDays(novosConfirmados);
      localStorage.setItem('@connect:confirmed_ru_days', JSON.stringify(novosConfirmados));
    } catch (err) {
      console.error(err);
      alert('Não foi possível registrar a confirmação.');
    }
  };

  const handleOpenEdit = () => {
    if (!activeMeal) return;
    setEditMainDish(activeMeal.mainDish);
    setEditVeganOption(activeMeal.veganOption);
    setEditGarnish(activeMeal.garnish);
    setEditDessert(activeMeal.dessert);
    setIsEditing(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDay) return;

    try {
      setSavingEdit(true);
      const modNome = usuario?.nome ? `${usuario.nome} (Mod)` : 'Moderação Connect UERJ-ZO';

      const atualizado = await api.atualizarRefeicao(currentDay.id, {
        mealType: selectedMealType,
        mainDish: editMainDish,
        veganOption: editVeganOption,
        garnish: editGarnish,
        dessert: editDessert,
        updatedBy: modNome
      });

      setMenuList(prev => prev.map(item => item.id === atualizado.id ? atualizado : item));
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert('Erro ao guardar as alterações no cardápio.');
    } finally {
      setSavingEdit(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        
        {/* Cabeçalho */}
        <div className="bg-gradient-to-r from-uerj-blue to-uerj-blue-dark p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Utensils className="h-6 w-6 text-uerj-yellow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">Restaurante Universitário</h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Aberto Hoje
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-uerj-yellow" />
                Campus Zona Oeste (UERJ-ZO) • Campo Grande
              </p>
            </div>
          </div>

          {/* Abas dos Dias da Semana */}
          {menuList.length > 0 && (
            <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1">
              {menuList.map((item, index) => {
                const isSelected = selectedDayIndex === index;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedDayIndex(index);
                      setIsEditing(false);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-uerj-yellow text-uerj-blue-dark shadow-md scale-105'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {item.day.split('-')[0]}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-2 text-slate-400">
            <Loader2 className="h-6 w-6 animate-spin text-uerj-blue" />
            <span className="text-xs">A carregar o cardápio da semana...</span>
          </div>
        ) : !currentDay || !activeMeal ? (
          <div className="p-12 text-center text-xs text-slate-500">
            Nenhum cardápio disponível de momento.
          </div>
        ) : (
          <>
            {/* Faixa de Auditoria */}
            <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <img src={mascoteModImg} alt="Moderação" className="w-5 h-5 object-contain" />
                <span>
                  Auditado por <strong>{currentDay.lastUpdatedBy}</strong> ({currentDay.lastUpdatedAt})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleConfirmMenu}
                  disabled={hasConfirmedCurrentDay}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                    hasConfirmedCurrentDay
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
                  }`}
                >
                  <ThumbsUp className="h-3 w-3" />
                  <span>{hasConfirmedCurrentDay ? 'Confirmado por si!' : `Confirmar Cardápio (${currentDay.confirmations})`}</span>
                </button>

                {isModerator && (
                  <button
                    onClick={handleOpenEdit}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-uerj-blue bg-blue-50 border border-blue-200 hover:bg-blue-100 font-bold text-[11px] transition-colors cursor-pointer"
                    title="Apenas Moderadores"
                  >
                    <Edit3 className="h-3 w-3" />
                    <span>Editar (Mod)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Corpo do Cardápio */}
            <div className="p-6 space-y-6">
              
              {/* Seletor Almoço / Jantar & Fila */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl w-fit">
                  <button
                    onClick={() => {
                      setSelectedMealType('lunch');
                      setIsEditing(false);
                    }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedMealType === 'lunch'
                        ? 'bg-white text-uerj-blue shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    ☀️ Almoço (11h às 14h)
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMealType('dinner');
                      setIsEditing(false);
                    }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedMealType === 'dinner'
                        ? 'bg-white text-uerj-blue shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    🌙 Jantar (17h às 20h)
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> Fila estimada:
                  </span>
                  <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    {currentDay.queueStatus}
                  </span>
                </div>
              </div>

              {/* Modo de Edição */}
              {isEditing ? (
                <form onSubmit={handleSaveEdit} className="bg-slate-50 p-5 rounded-2xl border border-blue-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-uerj-blue flex items-center gap-1.5">
                      <ShieldAlert className="h-4 w-4" />
                      Painel do Moderador • Atualizar {selectedMealType === 'lunch' ? 'Almoço' : 'Jantar'} (UERJ-ZO)
                    </h4>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Prato Principal Regular:
                      </label>
                      <input
                        type="text"
                        value={editMainDish}
                        onChange={(e) => setEditMainDish(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-uerj-blue"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-emerald-800 mb-1">
                        Opção Vegetariana / Vegana:
                      </label>
                      <input
                        type="text"
                        value={editVeganOption}
                        onChange={(e) => setEditVeganOption(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Guarnição:
                      </label>
                      <input
                        type="text"
                        value={editGarnish}
                        onChange={(e) => setEditGarnish(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-uerj-blue"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Sobremesa:
                      </label>
                      <input
                        type="text"
                        value={editDessert}
                        onChange={(e) => setEditDessert(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-uerj-blue"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={savingEdit}
                    className="w-full bg-uerj-blue hover:bg-uerj-blue-dark disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {savingEdit && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    <span>Salvar Alterações no RU Campo Grande</span>
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Prato Principal Regular */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-uerj-blue">
                      Prato Principal
                    </span>
                    <p className="text-xs font-bold text-slate-800 leading-snug">
                      {activeMeal.mainDish}
                    </p>
                  </div>

                  {/* Opção Vegetariana / Vegana */}
                  <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                      <Leaf className="h-3 w-3 text-emerald-600" /> Opção Vegana / Vegetariana
                    </span>
                    <p className="text-xs font-bold text-emerald-950 leading-snug">
                      {activeMeal.veganOption}
                    </p>
                  </div>

                  {/* Guarnição */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Guarnição
                    </span>
                    <p className="text-xs font-semibold text-slate-700">
                      {activeMeal.garnish}
                    </p>
                  </div>

                  {/* Acompanhamentos Base */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Acompanhamentos
                    </span>
                    <p className="text-xs font-semibold text-slate-700">
                      {activeMeal.sideDishes}
                    </p>
                  </div>

                  {/* Salada */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Salada Fresca
                    </span>
                    <p className="text-xs font-semibold text-slate-700">
                      {activeMeal.salad}
                    </p>
                  </div>

                  {/* Sobremesa */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Sobremesa
                    </span>
                    <p className="text-xs font-semibold text-slate-700">
                      {activeMeal.dessert}
                    </p>
                  </div>
                </div>
              )}

              {/* Informação Institucional */}
              <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-uerj-blue">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-uerj-blue font-bold shrink-0" />
                  <span><strong>Estudantes:</strong> R$ 2,00 (Almoço ou Jantar)</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-blue-700">
                  <ShieldCheck className="h-4 w-4 text-uerj-blue" />
                  <span>Restaurante Universitário • UERJ Zona Oeste</span>
                </div>
              </div>

            </div>
          </>
        )}

        {/* Rodapé */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}