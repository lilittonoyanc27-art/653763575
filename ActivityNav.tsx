import React from 'react';
import { 
  HelpCircle, 
  Users, 
  BookOpen, 
  Languages, 
  PenTool, 
  Clock, 
  Lightbulb, 
  MessagesSquare, 
  Globe2, 
  Trophy 
} from 'lucide-react';
import { sounds } from './audio';

export type ActivityId = 
  | 'comprension'
  | 'quien'
  | 'significa'
  | 'traduce'
  | 'completa'
  | 'primero'
  | 'reflexion'
  | 'dialogos'
  | 'argentina'
  | 'reto';

interface ActivityNavProps {
  currentActivity: ActivityId;
  onSelectActivity: (id: ActivityId) => void;
}

interface NavItem {
  id: ActivityId;
  titleEsp: string;
  titleArm: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'comprension',
    titleEsp: 'Comprensión del vídeo',
    titleArm: 'Տեսանյութի ըմբռնում',
    badge: '14 հարց',
    icon: HelpCircle
  },
  {
    id: 'quien',
    titleEsp: '¿Quién lo dijo?',
    titleArm: 'Ո՞վ ասաց դա',
    badge: '10 հարց',
    icon: Users
  },
  {
    id: 'significa',
    titleEsp: '¿Qué significa?',
    titleArm: 'Ի՞նչ է նշանակում (Léxico)',
    badge: '8 հարց',
    icon: BookOpen
  },
  {
    id: 'traduce',
    titleEsp: 'Traduce al español',
    titleArm: 'Թարգմանի՛ր իսպաներեն',
    badge: '14 հարց',
    icon: Languages
  },
  {
    id: 'completa',
    titleEsp: 'Completa la frase',
    titleArm: 'Ավարտի՛ր նախադասությունը',
    badge: '10 հարց',
    icon: PenTool
  },
  {
    id: 'primero',
    titleEsp: '¿Qué pasó primero?',
    titleArm: 'Ի՞նչ տեղի ունեցավ առաջինը',
    badge: '8 հարց',
    icon: Clock
  },
  {
    id: 'reflexion',
    titleEsp: 'Preguntas de reflexión',
    titleArm: 'Իմաստային հարցեր',
    badge: '6 հարց',
    icon: Lightbulb
  },
  {
    id: 'dialogos',
    titleEsp: 'Mini-diálogos',
    titleArm: 'Մինի երկխոսություններ',
    badge: '6 հարց',
    icon: MessagesSquare
  },
  {
    id: 'argentina',
    titleEsp: 'Español de Argentina',
    titleArm: 'Արգենտինական իսպաներեն',
    badge: 'Voseo & Slang',
    icon: Globe2
  },
  {
    id: 'reto',
    titleEsp: 'Reto final',
    titleArm: 'Վերջնական փորձություն',
    badge: '10 հարց',
    icon: Trophy
  }
];

export const ActivityNav: React.FC<ActivityNavProps> = ({
  currentActivity,
  onSelectActivity
}) => {
  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#800020] mb-1">
          Actividades prácticas · Ինտերակտիվ վարժություններ
        </h2>
        <p className="text-sm text-[#57534E] font-armenian">
          Ընտրեք ցանկացած վարժություն կամ անցեք դրանք հերթականությամբ
        </p>
      </div>

      {/* Grid of Activity Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {NAV_ITEMS.map((item) => {
          const isActive = currentActivity === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => {
                sounds.playClick();
                onSelectActivity(item.id);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-gradient-to-br from-[#800020] to-[#991B1B] text-white border-[#800020] shadow-md ring-2 ring-[#800020]/20'
                  : 'bg-white hover:bg-[#FAF7F2] text-[#1C1917] border-[#E7DFD5] hover:border-[#D6CEC3] shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-[#800020]'}`} />
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded font-armenian ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#FAF7F2] text-[#78716C] border border-[#E7DFD5]'
                  }`}
                >
                  {item.badge}
                </span>
              </div>

              <div>
                <span className={`block text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-[#1C1917]'}`}>
                  {item.titleEsp}
                </span>
                <span className={`block text-[11px] font-armenian mt-0.5 truncate ${isActive ? 'text-rose-100' : 'text-[#78716C]'}`}>
                  {item.titleArm}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
