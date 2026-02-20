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

      {/* Background effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 w-96 h-96 bg-accent/3 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Header */}
        <header className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-primary animate-float" />
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-foreground text-glow-cyan tracking-wider">
              MATH<span className="text-secondary">BLAST</span>
            </h1>
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-secondary animate-float" style={{ animationDelay: '1s' }} />
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
