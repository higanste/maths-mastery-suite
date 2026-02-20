import { useState } from 'react';
import { useStopwatch } from '@/hooks/useStopwatch';
import { playClick } from '@/lib/sounds';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

export default function StopwatchPanel() {
  const [mode, setMode] = useState<'stopwatch' | 'countdown'>('stopwatch');
  const [countdownMinutes, setCountdownMinutes] = useState(5);
  const [activeCountdown, setActiveCountdown] = useState<number | undefined>(undefined);

  const stopwatch = useStopwatch(undefined);
  const countdown = useStopwatch(activeCountdown);

  const active = mode === 'stopwatch' ? stopwatch : countdown;

  const handleStartCountdown = () => {
    setActiveCountdown(countdownMinutes * 60);
  };

  const switchMode = (m: 'stopwatch' | 'countdown') => {
    playClick();
    setMode(m);
    stopwatch.reset();
    countdown.reset();
  };

  // Helper functions for the new controls, mapping to `active`
  const handleStartStop = () => {
    playClick();
    if (active.isRunning) {
      active.pause();
    } else {
      active.start();
    }
  };

  const handleReset = () => {
    playClick();
    active.reset();
    if (mode === 'countdown') setActiveCountdown(undefined);
  };

  return (
    <div className="glass rounded-xl p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Timer className="w-5 h-5 text-glow-orange" />
        <h3 className="font-display text-sm tracking-wider text-secondary uppercase">Timer</h3>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => switchMode('stopwatch')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${mode === 'stopwatch'
              ? 'bg-primary/20 text-primary box-glow-cyan'
              : 'bg-muted/50 text-muted-foreground hover:bg-muted'
            }`}
        >
          Stopwatch
        </button>
        <button
          onClick={() => switchMode('countdown')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${mode === 'countdown'
              ? 'bg-secondary/20 text-secondary box-glow-orange'
              : 'bg-muted/50 text-muted-foreground hover:bg-muted'
            }`}
        >
          Countdown
        </button>
      </div>

      {/* Countdown setter */}
      {mode === 'countdown' && activeCountdown === undefined && (
        <div className="flex items-center gap-2 mb-4">
          <input
            type="number"
            min={1}
            max={60}
            value={countdownMinutes}
            onChange={(e) => setCountdownMinutes(Number(e.target.value))}
            className="w-16 bg-muted rounded-lg px-3 py-2 text-center font-mono text-foreground text-lg border border-border focus:border-primary focus:outline-none"
          />
          <span className="text-muted-foreground text-sm">min</span>
          <button
            onClick={() => { playClick(); handleStartCountdown(); }}
            className="ml-auto bg-secondary/20 text-secondary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary/30 transition-all"
          >
            Set
          </button>
        </div>
      )}

      {/* Timer Display */}
      <div className="text-center my-6">
        <div className={`font-mono text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter ${active.isRunning ? 'text-glow-orange' : 'text-glow-cyan'} transition-colors duration-500`}>
          {active.formatTime(active.time)}
        </div>
        <p className="text-muted-foreground text-xs mt-2 font-medium uppercase tracking-[0.2em] opacity-70">
          Elapsed Time
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleStartStop}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg hover:-translate-y-1 ${active.isRunning
              ? 'bg-destructive/20 text-destructive hover:bg-destructive/30 border border-destructive/50 shadow-[0_0_20px_-5px_hsl(var(--destructive)/0.5)]'
              : 'bg-primary/20 text-primary hover:bg-primary/30 border border-primary/50 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)]'
            }`}
          disabled={mode === 'countdown' && activeCountdown === undefined}
        >
          {active.isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button
          onClick={handleReset}
          className="w-14 h-14 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 flex items-center justify-center transition-all shadow-md hover:-translate-y-1 hover:text-foreground"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
