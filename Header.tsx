import React from 'react';
import { Volume2, VolumeX, Sparkles, Film, BookOpen, Trophy } from 'lucide-react';
import { sounds } from './audio';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  totalScore: number;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onNavigate,
  totalScore,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7DFD5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('video-section')}
          className="text-left group flex items-center gap-2 cursor-pointer focus:outline-none"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#800020] to-[#B91C1C] text-white flex items-center justify-center font-serif-display font-bold text-lg shadow-sm">
            E
          </span>
          <div>
            <span className="font-serif-display text-lg sm:text-xl font-bold text-[#800020] group-hover:text-[#5c0017] transition-colors tracking-tight block leading-tight">
              Aprende español
            </span>
            <span className="text-[11px] text-[#78716C] font-armenian hidden sm:block leading-tight">
              Իսպաներենի ինտերակտիվ դաս
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#57534E]">
          <button
            onClick={() => onNavigate('video-section')}
            className="flex items-center gap-1.5 hover:text-[#800020] transition-colors cursor-pointer"
          >
            <Film className="w-4 h-4 text-[#800020]" />
            <span>Vídeo</span>
          </button>
          <button
            onClick={() => onNavigate('subtitles-section')}
            className="flex items-center gap-1.5 hover:text-[#800020] transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#C2410C]" />
            <span>Subtítulos</span>
          </button>
          <button
            onClick={() => onNavigate('activities-section')}
            className="flex items-center gap-1.5 hover:text-[#800020] transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#B45309]" />
            <span>Actividades</span>
          </button>
          <button
            onClick={() => onNavigate('argentina-section')}
            className="flex items-center gap-1.5 hover:text-[#800020] transition-colors cursor-pointer"
          >
            <span>🇦🇷</span>
            <span>Español argentino</span>
          </button>
          <button
            onClick={() => onNavigate('reto-section')}
            className="flex items-center gap-1.5 hover:text-[#800020] transition-colors cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-[#D97706]" />
            <span>Reto final</span>
          </button>
        </nav>

        {/* Zone 3: Actions & Score */}
        <div className="flex items-center gap-3">
          {totalScore > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FDF2F4] border border-[#F3C4CC] rounded-full text-xs font-semibold text-[#800020] tabular-nums">
              <Sparkles className="w-3.5 h-3.5 text-[#B91C1C]" />
              <span>{totalScore} pts</span>
            </div>
          )}

          <button
            onClick={() => {
              onToggleSound();
              sounds.playClick();
            }}
            title={soundEnabled ? 'Silenciar sonidos' : 'Activar efectos de sonido'}
            className="p-2 text-[#78716C] hover:text-[#800020] hover:bg-[#F2ECE1] rounded-lg transition-colors cursor-pointer"
            aria-label="Alternar sonido"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
