import { useState, useEffect } from 'react';

export default function CreditsSection() {
  const [visible, setVisible] = useState(false);
  const [easterEgg, setEasterEgg] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleEasterEgg = () => {
    setEasterEgg(prev => prev + 1);
  };

  return (
    <footer className="mt-16 py-12 border-t border-border">
      <div className={`text-center space-y-4 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="font-display text-xs tracking-[0.3em] text-muted-foreground uppercase">
          — Credits —
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm">
          <div className="flex flex-col items-center gap-1">
            <span className="text-muted-foreground">Coded by</span>
            <span className="font-bold text-glow-cyan text-primary">Antigravity</span>
          </div>

          <div className="w-1 h-1 rounded-full bg-border hidden sm:block" />

          <div className="flex flex-col items-center gap-1">
            <span className="text-muted-foreground">Idea from</span>
            <a
              href="https://mathsbot.com/questionGenerator"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-glow-orange text-secondary hover:underline transition-all"
            >
              MathsBot
            </a>
          </div>

          <div className="w-1 h-1 rounded-full bg-border hidden sm:block" />

          <div className="flex flex-col items-center gap-1">
            <span className="text-muted-foreground">Creative Producer</span>
            <span className="font-bold text-foreground">ChatGPT</span>
          </div>

          <div className="w-1 h-1 rounded-full bg-border hidden sm:block" />

          <div className="flex flex-col items-center gap-1">
            <span className="text-muted-foreground">Scripted by</span>
            <span className="font-bold text-accent cursor-pointer hover:scale-110 inline-block transition-transform" onClick={handleEasterEgg}>
              Arslan
            </span>
          </div>
        </div>

        {easterEgg >= 5 && (
          <p className="text-xs text-glow-green animate-fade-in text-glow-green mt-4">
            🎮 Secret unlocked: Arslan was here. Tell no one. 🎮
          </p>
        )}

        {easterEgg >= 10 && (
          <p className="text-xs text-glow-pink animate-fade-in text-glow-pink">
            💀 You clicked way too many times. Go do your homework. 💀
          </p>
        )}

        <p className="text-xs text-muted-foreground/50 mt-6">
          No calculators were harmed in the making of this app.
        </p>
      </div>
    </footer>
  );
}
