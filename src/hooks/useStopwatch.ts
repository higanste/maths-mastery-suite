import { useState, useEffect, useCallback, useRef } from 'react';
import { playTimerBeep, playTimerDone } from '@/lib/sounds';

interface UseStopwatchReturn {
  time: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  formatTime: (t: number) => string;
}

export function useStopwatch(countdownFrom?: number): UseStopwatchReturn {
  const [time, setTime] = useState(countdownFrom ?? 0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastBeep = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => {
          if (countdownFrom !== undefined) {
            const next = prev - 1;
            // Beep at 10, 5, 4, 3, 2, 1
            if (next <= 10 && next > 0 && next !== lastBeep.current) {
              lastBeep.current = next;
              playTimerBeep();
            }
            if (next <= 0) {
              setIsRunning(false);
              playTimerDone();
              return 0;
            }
            return next;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, countdownFrom]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setTime(countdownFrom ?? 0);
    lastBeep.current = 0;
  }, [countdownFrom]);

  const formatTime = useCallback((t: number) => {
    const mins = Math.floor(t / 60);
    const secs = t % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return { time, isRunning, start, pause, reset, formatTime };
}
