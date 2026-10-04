import React, { useState } from 'react';
import { COMPRENSION_QUESTIONS } from './activities';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { sounds } from './audio';

interface ComprensionQuizProps {
  onScoreIncrement: () => void;
}

export const ComprensionQuiz: React.FC<ComprensionQuizProps> = ({ onScoreIncrement }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = COMPRENSION_QUESTIONS[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correctIndex) {
      sounds.playSuccess();
      setScore(prev => prev + 1);
      onScoreIncrement();
    } else {
      sounds.playIncorrect();
    }
  };

  const handleNext = () => {
    sounds.playClick();
    if (currentIndex < COMPRENSION_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    sounds.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <div className="bg-white rounded-2xl border-2 border-[#E7DFD5] p-8 text-center max-w-2xl mx-auto shadow-md">
        <div className="w-16 h-16 rounded-full bg-[#FAF0E6] text-[#800020] flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="font-serif-display text-2xl font-bold text-[#800020] mb-2">
          ¡Excelente trabajo!
        </h3>
        <p className="text-lg font-semibold text-[#1C1917] mb-1">
          {score} / {COMPRENSION_QUESTIONS.length} ճիշտ պատասխան
        </p>
        <p className="text-sm text-[#78716C] font-armenian mb-6">
          Դուք հաջողությամբ ավարտեցիք տեսանյութի ըմբռնման հարցաշարը։
        </p>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#800020] hover:bg-[#6b001a] text-white font-semibold rounded-xl transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Կրկնել հարցաշարը (Repetir)</span>
        </button>
      </div>
    );
  }

  const isCorrect = selectedOption === currentQ.correctIndex;

  return (
    <div className="bg-white rounded-2xl border-2 border-[#E7DFD5] shadow-md p-6 sm:p-8 max-w-3xl mx-auto">
      {/* Progress & Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[#800020] uppercase tracking-wider">
          Comprensión del vídeo · Տեսանյութի ըմբռնում
        </span>
        <span className="text-xs font-bold text-[#78716C] bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#E7DFD5]">
          Հարց {currentIndex + 1} / {COMPRENSION_QUESTIONS.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-[#FAF7F2] rounded-full overflow-hidden mb-6 border border-[#E7DFD5]">
        <div
          className="h-full bg-gradient-to-r from-[#800020] to-[#C2410C] transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / COMPRENSION_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#1C1917] leading-snug mb-1.5">
          {currentQ.questionEsp}
        </h3>
        <p className="text-sm sm:text-base font-medium text-[#781229] font-armenian">
          {currentQ.questionArm}
        </p>
      </div>

      {/* 4 Options */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {currentQ.options.map((option, idx) => {
          let btnStyle = 'bg-[#FAF7F2] hover:bg-[#F5EFE6] border-[#E7DFD5] text-[#1C1917]';
          let letterStyle = 'bg-white border-[#E7DFD5] text-[#57534E]';

          if (isAnswered) {
            if (idx === currentQ.correctIndex) {
              btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500';
              letterStyle = 'bg-emerald-600 text-white border-emerald-600';
            } else if (idx === selectedOption) {
              btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 ring-1 ring-rose-400';
              letterStyle = 'bg-rose-600 text-white border-rose-600';
            } else {
              btnStyle = 'opacity-60 bg-[#FAF7F2] border-[#E7DFD5] text-[#78716C]';
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 cursor-pointer disabled:cursor-default ${btnStyle}`}
            >
              <span className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${letterStyle}`}>
                {option.id}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-base font-semibold leading-tight">
                  {option.text}
                </div>
                {option.subtextArm && (
                  <div className="text-xs font-normal text-[#57534E] font-armenian mt-0.5">
                    {option.subtextArm}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback banner */}
      {isAnswered && (
        <div className={`p-4 rounded-xl border mb-6 animate-in fade-in duration-200 ${
          isCorrect ? 'bg-emerald-50/80 border-emerald-300' : 'bg-rose-50/80 border-rose-300'
        }`}>
          <div className="flex items-center gap-2 mb-1.5 font-bold text-sm">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-800">✅ Correcto · Ճիշտ է</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-600" />
                <span className="text-rose-800">❌ Inténtalo otra vez · Սխալ պատասխան</span>
              </>
            )}
          </div>

          <p className="text-sm text-[#1C1917] mb-1">
            {currentQ.explanationEsp}
          </p>
          <p className="text-xs text-[#57534E] font-armenian">
            {currentQ.explanationArm}
          </p>
        </div>
      )}

      {/* Next button */}
      {isAnswered && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-[#800020] hover:bg-[#6b001a] text-white font-semibold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow"
          >
            <span>{currentIndex < COMPRENSION_QUESTIONS.length - 1 ? 'Siguiente pregunta' : 'Ver resultado'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
