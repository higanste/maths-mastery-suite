import { useState, useEffect } from 'react';
import QuestionGenerator from '@/components/QuestionGenerator';
import StopwatchPanel from '@/components/StopwatchPanel';
import ClassRoster from '@/components/ClassRoster';
import CreditsSection from '@/components/CreditsSection';
import { Calculator, Sparkles } from 'lucide-react';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Preload voices for TTS
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="fixed inset-0 scanline pointer-events-none z-50" />

      {/* Subtle modern depth effects (instead of solid bright neon orbs) */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Header */}
        <header className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="flex items-center justify-center gap-4 mb-3">
            <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-primary opacity-80 animate-float" />
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight drop-shadow-2xl">
              MATH<span className="text-transparent bg-clip-text bg-gradient-hero">BLAST</span>
            </h1>
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-accent opacity-80 animate-float" style={{ animationDelay: '1s' }} />
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Mr. Yeung's Ultimate Question Generator • Dakota Collegiate
          </p>
        </header>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Left: Question generator */}
          <main className={`transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <QuestionGenerator />
          </main>

          {/* Right: Sidebar */}
          <aside className={`space-y-6 transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <StopwatchPanel />
            <ClassRoster />
          </aside>
        </div>

        {/* Credits */}
        <CreditsSection />
      </div>
    </div>
  );
};

export default Index;
