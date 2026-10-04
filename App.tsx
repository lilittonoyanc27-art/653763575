import React, { useState } from 'react';
import { Header } from './Header';
import { HeroVideo } from './HeroVideo';
import { SubtitlesSection } from './SubtitlesSection';
import { ActivityNav, ActivityId } from './ActivityNav';
import { ComprensionQuiz } from './ComprensionQuiz';
import { QuienLoDijo } from './QuienLoDijo';
import { QueSignifica } from './QueSignifica';
import { TraduceEspanol } from './TraduceEspanol';
import { CompletaFrase } from './CompletaFrase';
import { QuePasoPrimero } from './QuePasoPrimero';
import { ReflexionQuestions } from './ReflexionQuestions';
import { MiniDialogos } from './MiniDialogos';
import { ArgentineSpanishCard } from './ArgentineSpanishCard';
import { RetoFinal } from './RetoFinal';
import { SlangModal } from './SlangModal';
import { SlangTerm } from './dialogue';
import { sounds } from './audio';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [totalScore, setTotalScore] = useState(0);
  const [activeActivity, setActiveActivity] = useState<ActivityId>('comprension');
  const [selectedSlang, setSelectedSlang] = useState<SlangTerm | null>(null);

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sounds.setEnabled(nextState);
  };

  const handleScoreIncrement = () => {
    setTotalScore(prev => prev + 10);
  };

  const handleScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartActivities = () => {
    const el = document.getElementById('activities-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReturnToVideo = () => {
    const el = document.getElementById('video-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        activeSection={activeActivity}
        onNavigate={(sectionId) => {
          if (sectionId === 'reto-section') {
            setActiveActivity('reto');
            handleScrollTo('activities-section');
          } else if (sectionId === 'argentina-section') {
            handleScrollTo('argentina-section');
          } else {
            handleScrollTo(sectionId);
          }
        }}
        totalScore={totalScore}
      />

      <main className="flex-1">
        {/* Section 2: Video Section */}
        <HeroVideo onStartActivities={handleStartActivities} />

        {/* Section 3: Subtitles with interactive Armenian translation on click */}
        <SubtitlesSection onSelectSlang={(term) => setSelectedSlang(term)} />

        {/* Section 12: Argentine Spanish Guide Card */}
        <ArgentineSpanishCard />

        {/* Main Activities Hub (Sections 4 to 11 & 13) */}
        <section id="activities-section" className="py-12 px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-20">
          <ActivityNav
            currentActivity={activeActivity}
            onSelectActivity={(id) => setActiveActivity(id)}
          />

          <div className="transition-all duration-200">
            {activeActivity === 'comprension' && (
              <ComprensionQuiz onScoreIncrement={handleScoreIncrement} />
            )}

            {activeActivity === 'quien' && (
              <QuienLoDijo onScoreIncrement={handleScoreIncrement} />
            )}

            {activeActivity === 'significa' && (
              <QueSignifica onScoreIncrement={handleScoreIncrement} />
            )}

            {activeActivity === 'traduce' && (
              <TraduceEspanol onScoreIncrement={handleScoreIncrement} />
            )}

            {activeActivity === 'completa' && (
              <CompletaFrase onScoreIncrement={handleScoreIncrement} />
            )}

            {activeActivity === 'primero' && (
              <QuePasoPrimero onScoreIncrement={handleScoreIncrement} />
            )}

            {activeActivity === 'reflexion' && (
              <ReflexionQuestions />
            )}

            {activeActivity === 'dialogos' && (
              <MiniDialogos onScoreIncrement={handleScoreIncrement} />
            )}

            {activeActivity === 'argentina' && (
              <div className="bg-white rounded-2xl border-2 border-[#E7DFD5] p-6 max-w-3xl mx-auto text-center shadow-md">
                <h3 className="font-serif-display text-2xl font-bold text-[#800020] mb-2">
                  Español de Argentina — Արգենտինական իսպաներեն
                </h3>
                <p className="text-sm text-[#57534E] font-armenian mb-4">
                  Դուք կարող եք կարդալ արգենտինական voseo-ի և սլենգի ամբողջական տեսությունը վերևի հատուկ բաժնում։
                </p>
                <button
                  onClick={() => handleScrollTo('argentina-section')}
                  className="px-5 py-2.5 bg-[#800020] hover:bg-[#6b001a] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Դիտել տեսության քարտը (Ir a la tarjeta)
                </button>
              </div>
            )}

            {activeActivity === 'reto' && (
              <RetoFinal
                onReturnToVideo={handleReturnToVideo}
                onScoreIncrement={handleScoreIncrement}
              />
            )}
          </div>
        </section>
      </main>

      {/* Slang Modal when user clicks on a colloquial Argentine word */}
      <SlangModal
        term={selectedSlang}
        onClose={() => setSelectedSlang(null)}
      />

      {/* Footer */}
      <footer className="border-t border-[#E7DFD5] bg-white py-8 px-4 text-center text-xs text-[#78716C]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-[#800020] text-white flex items-center justify-center font-serif-display font-bold text-[10px]">
              E
            </span>
            <span className="font-semibold text-[#1C1917]">
              Aprende español con un diálogo · Իսպաներենի ուսուցում
            </span>
          </div>
          <p className="font-armenian">
            Իսպաներենի ինտերակտիվ դաս իրական երկխոսությամբ (Sos mi vida)
          </p>
        </div>
      </footer>
    </div>
  );
}
