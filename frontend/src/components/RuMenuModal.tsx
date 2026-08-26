import { useState } from 'react';
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
  MapPin
} from 'lucide-react';

interface Meal {
  mainDish: string;
  veganOption: string;
  garnish: string;
  sideDishes: string;
  salad: string;
  dessert: string;
}

interface DayMenu {
  day: string;
  lunch: Meal;
  dinner: Meal;
  lastUpdatedBy: string;
  lastUpdatedAt: string;
  confirmations: number;
  queueStatus: 'Rápida (< 5 min)' | 'Moderada (~15 min)' | 'Longa (> 25 min)';
}

const INITIAL_WEEKLY_MENU: DayMenu[] = [
  {
    day: 'Segunda-feira',
    lastUpdatedBy: 'Pedro H. (Moderação Connect UERJ-ZO)',
    lastUpdatedAt: 'Hoje às 11:20',
    confirmations: 24,
    queueStatus: 'Moderada (~15 min)',
    lunch: {
      mainDish: 'Frango Grelhado ao Molho de Ervas',
      veganOption: 'Proteína de Soja Refogada com Milho e Ervilha',
      garnish: 'Purê de Batata',
      sideDishes: 'Arroz Branco / Integral e Feijão Preto',
      salad: 'Alface Crespa, Tomate e Cenoura Ralada',
      dessert: 'Laranja ou Melancia'
    },
    dinner: {
      mainDish: 'Carne Moída à Bolonhesa',
      veganOption: 'Lentilha com Legumes ao Curry',
      garnish: 'Macarrão Parafuso',
      sideDishes: 'Arroz Branco e Feijão Carioca',
      salad: 'Repolho Bicolor e Beterraba Cozida',
      dessert: 'Maçã'
    }
  },
  {
    day: 'Terça-feira',
    lastUpdatedBy: 'Moderação Acadêmica ZO',
    lastUpdatedAt: 'Ontem às 18:00',
    confirmations: 12,
    queueStatus: 'Rápida (< 5 min)',
    lunch: {
      mainDish: 'Isca de Carne Acebolada',
      veganOption: 'Estrogonofe de Grão-de-Bico com Cogumelos',
      garnish: 'Batata Rústica Assada com Alecrim',
      sideDishes: 'Arroz Branco / Integral e Feijão Carioca',
      salad: 'Mix de Folhas e Pepino Japonês',
      dessert: 'Banana'
    },
    dinner: {
      mainDish: 'Filé de Peito de Frango Empanado no Forno',
      veganOption: 'Quibe Assado de Abóbora com Quinoa',
      garnish: 'Legumes Salteados na Manteiga de Ervas',
      sideDishes: 'Arroz Branco e Feijão Preto',
      salad: 'Acelga e Tomate Cereja',
      dessert: 'Tangerina'
    }
  },
  {
    day: 'Quarta-feira',
    lastUpdatedBy: 'Moderação Acadêmica ZO',
    lastUpdatedAt: 'Há 2 dias',
    confirmations: 19,
    queueStatus: 'Longa (> 25 min)',
    lunch: {
      mainDish: 'Feijoada Tradicional UERJ',
      veganOption: 'Feijoada Vegana (Tofu Defumado e Legumes)',
      garnish: 'Couve Refogada no Alho e Farofa Crocante',
      sideDishes: 'Arroz Branco / Integral e Laranja Fatiada',
      salad: 'Vinagrete Especial e Rúcula',
      dessert: 'Doce de Fruta ou Fruta da Estação'
    },
    dinner: {
      mainDish: 'Sobrecoxa Assada com Ervas Finas',
      veganOption: 'Almôndegas de Lentilha ao Sugo',
      garnish: 'Polenta Cremosa',
      sideDishes: 'Arroz Branco e Feijão Preto',
      salad: 'Alface Americana e Cenoura',
      dessert: 'Goiaba'
    }
  },
  {
    day: 'Quinta-feira',
    lastUpdatedBy: 'Moderação Acadêmica ZO',
    lastUpdatedAt: 'Há 3 dias',
    confirmations: 8,
    queueStatus: 'Moderada (~15 min)',
    lunch: {
      mainDish: 'Carne Assada ao Molho Madeira',
      veganOption: 'Moqueca de Palmito com Banana da Terra',
      garnish: 'Arroz à Piamontese / Arroz Integral',
      sideDishes: 'Feijão Carioca',
      salad: 'Salada Colorida com Manga',
      dessert: 'Melão Fatiado'
    },
    dinner: {
      mainDish: 'Cubos de Frango com Legumes',
      veganOption: 'Yakisoba de Legumes e Tofu Grelhado',
      garnish: 'Arroz Primavera',
      sideDishes: 'Feijão Preto',
      salad: 'Chicória e Beterraba Ralada',
      dessert: 'Pera'
    }
  },
  {
    day: 'Sexta-feira',
    lastUpdatedBy: 'Moderação Acadêmica ZO',
    lastUpdatedAt: 'Há 4 dias',
    confirmations: 15,
    queueStatus: 'Rápida (< 5 min)',
    lunch: {
      mainDish: 'Peixe Assado com Crosta de Ervas',
      veganOption: 'Bobó de Cogumelos e Mandioca',
      garnish: 'Pirão de Peixe / Legumes no Vapor',
      sideDishes: 'Arroz Branco / Integral e Feijão Preto',
      salad: 'Alface, Agrião e Tomate',
      dessert: 'Abacaxi'
    },
    dinner: {
      mainDish: 'Iscas de Frango Grelhadas',
      veganOption: 'Hambúrguer de Grão-de-Bico',
      garnish: 'Batata Doce Assada',
      sideDishes: 'Arroz Branco e Feijão Carioca',
      salad: 'Salada Verde Especial',
      dessert: 'Laranja'
    }
  }
];

interface RuMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: 'student' | 'moderator' | 'admin';
}

export function RuMenuModal({ isOpen, onClose, userRole = 'moderator' }: RuMenuModalProps) {
  const [menuList, setMenuList] = useState<DayMenu[]>(INITIAL_WEEKLY_MENU);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedMealType, setSelectedMealType] = useState<'lunch' | 'dinner'>('lunch');
  const [hasConfirmedToday, setHasConfirmedToday] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editMainDish, setEditMainDish] = useState('');
  const [editVeganOption, setEditVeganOption] = useState('');
  const [editGarnish, setEditGarnish] = useState('');
  const [editDessert, setEditDessert] = useState('');

  if (!isOpen) return null;

  const currentDay = menuList[selectedDayIndex];
  const activeMeal = selectedMealType === 'lunch' ? currentDay.lunch : currentDay.dinner;
  const isModerator = userRole === 'moderator' || userRole === 'admin';

  const handleConfirmMenu = () => {
    if (hasConfirmedToday) return;
    const updated = [...menuList];
    updated[selectedDayIndex].confirmations += 1;
    setMenuList(updated);
    setHasConfirmedToday(true);
  };

  const handleOpenEdit = () => {
    setEditMainDish(activeMeal.mainDish);
    setEditVeganOption(activeMeal.veganOption);
    setEditGarnish(activeMeal.garnish);
    setEditDessert(activeMeal.dessert);
    setIsEditing(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...menuList];
    const targetMeal = selectedMealType === 'lunch' ? updated[selectedDayIndex].lunch : updated[selectedDayIndex].dinner;
    
    targetMeal.mainDish = editMainDish;
    targetMeal.veganOption = editVeganOption;
    targetMeal.garnish = editGarnish;
    targetMeal.dessert = editDessert;

    updated[selectedDayIndex].lastUpdatedBy = 'Pedro H. (Moderador)';
    updated[selectedDayIndex].lastUpdatedAt = 'Atualizado agora';
    
    setMenuList(updated);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        
        {/* Topo do Modal */}
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

          {/* Seleção dos Dias da Semana */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1">
            {menuList.map((item, index) => {
              const isSelected = selectedDayIndex === index;
              return (
                <button
                  key={item.day}
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
        </div>

        {/* Faixa de Auditoria / Moderação */}
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
              disabled={hasConfirmedToday}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                hasConfirmedToday
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
              }`}
            >
              <ThumbsUp className="h-3 w-3" />
              <span>{hasConfirmedToday ? 'Confirmado por você!' : `Confirmar Cardápio (${currentDay.confirmations})`}</span>
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
          
          {/* Alternador Almoço / Jantar & Fila */}
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

          {/* Modo de Edição Exclusivo do Moderador */}
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
                className="w-full bg-uerj-blue hover:bg-uerj-blue-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Salvar Alterações no RU Campo Grande
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

          {/* Preço e Informação Institucional */}
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

        {/* Rodapé do Modal */}
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