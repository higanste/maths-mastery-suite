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
        
        <div className="space-y-1.5">
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground/60">Backends by</span>{' '}
            <span className="text-primary font-semibold">ChatGPT</span>
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground/60">Creative Producer</span>{' '}
            <span className="text-secondary font-semibold">ChatGPT</span>
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground/60">Scripted by</span>{' '}
            <span className="text-accent font-semibold cursor-pointer hover:scale-110 inline-block transition-transform" onClick={handleEasterEgg}>
              Arslan
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground/60">Built for</span>{' '}
            <span className="text-foreground/80 font-semibold">Mr. Yeung's Class @ Dakota Collegiate</span>
          </p>
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
