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
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
            mode === 'stopwatch'
              ? 'bg-primary/20 text-primary box-glow-cyan'
              : 'bg-muted/50 text-muted-foreground hover:bg-muted'
          }`}
        >
          Stopwatch
        </button>
        <button
          onClick={() => switchMode('countdown')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
            mode === 'countdown'
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

      {/* Timer display */}
      <div className={`text-center py-4 ${active.time <= 10 && mode === 'countdown' && active.isRunning ? 'animate-shake' : ''}`}>
        <span
          className={`font-display text-5xl sm:text-6xl tracking-wider ${
            mode === 'countdown' && active.time <= 10 && active.time > 0
              ? 'text-destructive text-glow-pink'
              : mode === 'countdown'
                ? 'text-secondary text-glow-orange'
                : 'text-primary text-glow-cyan'
          } ${active.isRunning ? '' : 'animate-pulse-glow'}`}
        >
          {active.formatTime(active.time)}
        </span>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        {!active.isRunning ? (
          <button
            onClick={() => { playClick(); active.start(); }}
            className="bg-glow-green/20 text-glow-green p-3 rounded-full hover:bg-glow-green/30 transition-all hover:scale-110"
            disabled={mode === 'countdown' && activeCountdown === undefined}
          >
            <Play className="w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={() => { playClick(); active.pause(); }}
            className="bg-secondary/20 text-secondary p-3 rounded-full hover:bg-secondary/30 transition-all hover:scale-110"
          >
            <Pause className="w-6 h-6" />
          </button>
        )}
        <button
          onClick={() => {
            playClick();
            active.reset();
            if (mode === 'countdown') setActiveCountdown(undefined);
          }}
          className="bg-muted p-3 rounded-full text-muted-foreground hover:bg-muted/80 transition-all hover:scale-110"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
