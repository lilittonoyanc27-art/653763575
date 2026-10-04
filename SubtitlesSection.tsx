import React, { useState } from 'react';
import { SUBTITLES, SubtitleLine, ARGENTINE_GLOSSARY, SlangTerm } from './dialogue';
import { ChevronDown, ChevronUp, Eye, EyeOff, Sparkles, User, HelpCircle } from 'lucide-react';
import { sounds } from './audio';

interface SubtitlesSectionProps {
  onSelectSlang: (term: SlangTerm) => void;
}

export const SubtitlesSection: React.FC<SubtitlesSectionProps> = ({ onSelectSlang }) => {
  // Set of opened subtitle line IDs (initially empty so only Spanish is visible!)
  const [openedLineIds, setOpenedLineIds] = useState<Set<number>>(new Set());
  const [speakerFilter, setSpeakerFilter] = useState<'all' | 'Monita' | 'Martín'>('all');

  const toggleLine = (id: number) => {
    sounds.playClick();
    setOpenedLineIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleShowAll = () => {
    sounds.playClick();
    const allIds = new Set(SUBTITLES.map(s => s.id));
    setOpenedLineIds(allIds);
  };

  const handleHideAll = () => {
    sounds.playClick();
    setOpenedLineIds(new Set());
  };

  const filteredSubtitles = SUBTITLES.filter(sub => {
    if (speakerFilter === 'all') return true;
    return sub.speaker === speakerFilter;
  });

  // Render text highlighting slang terms
  const renderInteractiveSpanish = (line: SubtitleLine) => {
    const text = line.spanish;
    const slangKeys = Object.keys(ARGENTINE_GLOSSARY);

    // Find any slang occurrences in this text
    const foundKeywords = slangKeys.filter(key => {
      const regex = new RegExp(`\\b${key}\\b`, 'i');
      return regex.test(text);
    });

    if (foundKeywords.length === 0) {
      return <span>{text}</span>;
    }

    // Sort keywords by length descending so longer phrases match first
    foundKeywords.sort((a, b) => b.length - a.length);

    // Build regex with capturing groups
    const pattern = new RegExp(`(${foundKeywords.map(k => `\\b${k}\\b`).join('|')})`, 'gi');
    const parts = text.split(pattern);

    return (
      <span>
        {parts.map((part, index) => {
          const lower = part.toLowerCase();
          const matchedTerm = ARGENTINE_GLOSSARY[lower];
          if (matchedTerm) {
            return (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playClick();
                  onSelectSlang(matchedTerm);
                }}
                title="Սեղմեք՝ արգենտինական այս բառի բացատրությունը տեսնելու համար"
                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-[#FFF1F2] hover:bg-[#FFE4E6] text-[#9F1239] border-b-2 border-[#BE123C] rounded font-semibold text-inherit transition-all hover:scale-105 cursor-pointer"
              >
                <span>{part}</span>
                <HelpCircle className="w-3.5 h-3.5 text-[#BE123C] opacity-80" />
              </button>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </span>
    );
  };

  return (
    <section id="subtitles-section" className="py-10 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Title as requested */}
      <div className="text-center mb-8">
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#800020] mb-2">
          Subtítulos — Ենթագրեր
        </h2>
        <p className="text-sm sm:text-base text-[#57534E] max-w-2xl mx-auto mb-1">
          Սուբտիտրերը նախապես իսպաներեն են։ <span className="font-semibold text-[#800020]">Սեղմեք ցանկացած ռեպլիկի վրա</span>՝ հայերեն բնական թարգմանությունը տեսնելու համար։
        </p>
        <p className="text-xs text-[#78716C] font-armenian">
          Ընդգծված բառերի վրա սեղմելով՝ կբացվի արգենտինական սլենգի բացատրությունը։
        </p>
      </div>

      {/* Control bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 p-3 bg-white rounded-xl border border-[#E7DFD5] shadow-xs">
        {/* Speaker filter */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-[#78716C] uppercase mr-1">Խոսող.</span>
          <button
            onClick={() => setSpeakerFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              speakerFilter === 'all'
                ? 'bg-[#800020] text-white shadow-xs'
                : 'text-[#57534E] hover:bg-[#F5EFE6]'
            }`}
          >
            Բոլորը ({SUBTITLES.length})
          </button>
          <button
            onClick={() => setSpeakerFilter('Monita')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              speakerFilter === 'Monita'
                ? 'bg-[#C2410C] text-white shadow-xs'
                : 'text-[#57534E] hover:bg-[#F5EFE6]'
            }`}
          >
            Monita (Ella)
          </button>
          <button
            onClick={() => setSpeakerFilter('Martín')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              speakerFilter === 'Martín'
                ? 'bg-[#800020] text-white shadow-xs'
                : 'text-[#57534E] hover:bg-[#F5EFE6]'
            }`}
          >
            Martín (Él)
          </button>
        </div>

        {/* Global Reveal / Hide Toggles */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleShowAll}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#800020] hover:bg-[#FDF2F4] border border-[#F3C4CC] rounded-lg transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Բացել բոլորը</span>
          </button>
          <button
            onClick={handleHideAll}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#78716C] hover:bg-[#F5EFE6] border border-[#E7DFD5] rounded-lg transition-colors cursor-pointer"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>Թաքցնել թարգմանությունները</span>
          </button>
        </div>
      </div>

      {/* Subtitles list */}
      <div className="space-y-3">
        {filteredSubtitles.map((line) => {
          const isOpen = openedLineIds.has(line.id);
          const isMonita = line.speaker === 'Monita';

          return (
            <div
              key={line.id}
              onClick={() => toggleLine(line.id)}
              className={`rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                isOpen
                  ? 'bg-white border-[#800020]/30 shadow-md ring-1 ring-[#800020]/20'
                  : 'bg-white/80 hover:bg-white border-[#E7DFD5] hover:border-[#D6CEC3] shadow-xs'
              }`}
            >
              <div className="p-4 sm:p-5 flex items-start gap-3 sm:gap-4">
                {/* Speaker Avatar / Badge */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs shadow-xs ${
                    isMonita
                      ? 'bg-gradient-to-br from-[#EA580C] to-[#C2410C] text-white'
                      : 'bg-gradient-to-br from-[#800020] to-[#5C0017] text-white'
                  }`}
                  title={line.speakerLabel}
                >
                  {isMonita ? 'M' : 'F'}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Speaker name & Timestamp */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                        {line.speakerLabel}
                      </span>
                      <span className="text-[11px] font-mono text-[#A8A29E] bg-[#FAF7F2] px-1.5 py-0.5 rounded border border-[#E7DFD5]">
                        {line.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-[#A8A29E]">
                      {isOpen ? (
                        <span className="text-[11px] font-medium text-[#800020] flex items-center gap-0.5">
                          Փակել <ChevronUp className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-[#78716C] flex items-center gap-0.5">
                          Թարգմանել <ChevronDown className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Spanish Line (Large, clear, interactive) */}
                  <p className="text-base sm:text-lg font-semibold text-[#1C1917] leading-relaxed">
                    {renderInteractiveSpanish(line)}
                  </p>

                  {/* Armenian Translation (Appears only when clicked!) */}
                  {isOpen ? (
                    <div className="mt-3 pt-3 border-t border-[#F2ECE1] animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold text-[#C2410C] font-armenian shrink-0 mt-0.5">
                          Հայերեն.
                        </span>
                        <p className="text-sm sm:text-base font-medium text-[#781229] font-armenian leading-relaxed">
                          {line.armenian}
                        </p>
                      </div>

                      {/* Optional Grammar/Culture tip inside subtitle card */}
                      {line.grammarNote && (
                        <div className="mt-2 text-xs bg-[#FAF7F2] p-2.5 rounded-lg border border-[#E7DFD5] text-[#57534E]">
                          <span className="font-semibold text-[#800020]">💡 {line.grammarNote.term}: </span>
                          <span className="font-armenian">{line.grammarNote.noteArm}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-[11px] text-[#A8A29E] mt-1 font-armenian">
                      (Սեղմեք՝ հայերեն թարգմանությունը տեսնելու համար)
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
