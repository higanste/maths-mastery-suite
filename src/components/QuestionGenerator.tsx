import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { generateQuestions, TOPICS, type MathOperation, type MathQuestion } from '@/lib/mathGenerator';
import StopwatchPanel from '@/components/StopwatchPanel';
import { playGenerate, playReveal, playClick, speakText } from '@/lib/sounds';
import { CLASS_MEMBERS } from '@/lib/classData';
import { Sparkles, Eye, EyeOff, RefreshCw, Zap, Maximize, X, Timer } from 'lucide-react';

// Fallback roasts if no specific one is chosen
const FALLBACK_ROASTS = [
  "{name}, even my grandma calculates faster than you!",
  "{name}, are you guessing, or is that actually your final answer?",
  "{name}... I've seen potatoes with better math skills.",
  "{name}, you might want to double-check that... or just give up.",
  "{name}, did you use a calculator, or flip a coin?",
  "At least you're confidently incorrect, {name}.",
  "Math is hard, {name}, but it shouldn't be THIS hard for you.",
  "{name}, did you sleep through Mr. Yeung's class today?",
  "Error 404: {name}'s math skills not found.",
  "Bro {name}, even ChatGPT is confused by your math.",
  "MathsBot is crying right now because of {name}.",
  "Bruh {name}. 💀",
  "Your math isn't mathing, {name}.",
  "This ain't it, {name}."
];

export default function QuestionGenerator() {
  const [topic, setTopic] = useState<MathOperation>('random');
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState(5);
  const [questions, setQuestions] = useState<MathQuestion[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentRoast, setCurrentRoast] = useState('');
  const [showRoastModal, setShowRoastModal] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  // Sync fullscreen state with Browser Fullscreen API
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      // When exiting fullscreen, also close the timer and roast modal
      if (!document.fullscreenElement) {
        setShowTimer(false);
        setShowRoastModal(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Fullscreen error: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const generateNewRoast = useCallback(() => {
    const member = CLASS_MEMBERS[Math.floor(Math.random() * CLASS_MEMBERS.length)];
    const isVIP = member.name === 'Mr. Yeung' || member.name === 'Arslan Sohail';
    let roastText = '';
    if (isVIP || (Math.random() > 0.5 && member.roasts && member.roasts.length > 0)) {
      roastText = member.roasts[Math.floor(Math.random() * member.roasts.length)];
    } else {
      const template = FALLBACK_ROASTS[Math.floor(Math.random() * FALLBACK_ROASTS.length)];
      roastText = template.replace('{name}', member.name);
    }
    setCurrentRoast(roastText);
    speakText(roastText);
    setShowRoastModal(true);
  }, []);

  const handleGenerate = useCallback(() => {
    playGenerate();
    setIsGenerating(true);
    setShowAnswers(false);
    setRevealedAnswers(new Set());
    setShowRoastModal(false);
    setTimeout(() => {
      const newQuestions = generateQuestions(topic, questionCount, difficulty);
      setQuestions(newQuestions);
      setIsGenerating(false);
    }, 400);
  }, [topic, questionCount, difficulty]);

  const handleRevealAll = () => {
    playReveal();
    if (!showAnswers) {
      setShowAnswers(true);
      generateNewRoast();
    } else {
      setShowAnswers(false);
      setCurrentRoast('');
      setShowRoastModal(false);
      window.speechSynthesis?.cancel();
    }
  };

  const handleRevealSingle = (id: string) => {
    playClick();
    setRevealedAnswers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const closeRoastModal = () => {
    setShowRoastModal(false);
    window.speechSynthesis?.cancel();
  };

  // Generate on first load
  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  // ─────────────────────────────────────────────────────────────────────
  // FULLSCREEN PORTAL
  // ─────────────────────────────────────────────────────────────────────
  const FullscreenOverlay = () => {
    // Dynamically compute grid columns based on question count
    const cols = questionCount <= 3 ? questionCount : questionCount <= 6 ? 3 : questionCount <= 8 ? 4 : questionCount <= 12 ? 4 : 5;
    const gridClass = `grid-cols-${cols}`;

    return createPortal(
      <div className="fixed inset-0 z-[9999] bg-[hsl(var(--background))] overflow-hidden flex flex-col"
        style={{ fontFamily: 'inherit' }}>

        {/* ── TOP BAR ── */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-border/40 shrink-0 bg-background/80 backdrop-blur-sm">
          {/* Left: FOCUS MODE label */}
          <span className="font-display text-xl font-black tracking-tight text-foreground">
            FOCUS <span className="text-transparent bg-clip-text bg-gradient-hero">MODE</span>
          </span>

          {/* Center: action buttons */}
          <div className="flex items-center gap-3">
            {/* Timer toggle */}
            <button
              onClick={() => { playClick(); setShowTimer(t => !t); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${showTimer ? 'bg-primary text-primary-foreground shadow-[0_0_15px_-3px_hsl(var(--primary)/0.5)]' : 'bg-muted text-foreground hover:bg-muted/70'}`}
            >
              <Timer className="w-4 h-4" />
              Timer
            </button>

            {/* Reveal Answers */}
            <button
              onClick={handleRevealAll}
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-[0_0_15px_-3px_hsl(var(--secondary)/0.4)]"
            >
              {showAnswers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showAnswers ? 'Hide Answers' : 'Reveal Answers'}
            </button>
          </div>

          {/* Right: Exit */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 bg-muted/60 text-muted-foreground hover:text-foreground px-4 py-2 rounded-xl font-bold text-sm hover:bg-muted transition-all"
          >
            <X className="w-4 h-4" />
            Exit
          </button>
        </div>

        {/* ── TIMER PANEL (collapsible) ── */}
        {showTimer && (
          <div className="shrink-0 flex justify-center py-3 border-b border-border/30 bg-background/60 backdrop-blur-sm animate-fade-in">
            <div className="transform scale-75 origin-center">
              <StopwatchPanel />
            </div>
          </div>
        )}

        {/* ── QUESTIONS GRID (fills remaining space, no scroll) ── */}
        <div className={`flex-1 p-4 grid gap-3 auto-rows-fr`}
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {questions.map((q, i) => {
            const isRevealed = showAnswers || revealedAnswers.has(q.id);
            return (
              <div
                key={q.id}
                onClick={() => handleRevealSingle(q.id)}
                className="glass rounded-2xl cursor-pointer hover:scale-[1.015] transition-all group animate-fade-in flex flex-col justify-between p-4 overflow-hidden"
                style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
              >
                {/* Q label */}
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display text-primary text-xs font-bold">Q{i + 1}</span>
                  <span className="text-muted-foreground bg-muted text-[10px] px-2 py-0.5 rounded-full truncate max-w-[60%]">{q.topic}</span>
                </div>

                {/* Question */}
                <p className="font-mono text-foreground text-center font-black tracking-wide text-2xl xl:text-3xl flex-1 flex items-center justify-center py-2">
                  {q.question}
                </p>

                {/* Answer */}
                <div className={`text-center transition-all duration-300 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}>
                  <span className="font-mono font-black text-glow-green text-xl xl:text-2xl bg-glow-green/10 border border-glow-green/30 rounded-lg px-4 py-1.5 inline-block">
                    = {q.answer}
                  </span>
                </div>

                {!isRevealed && (
                  <p className="text-center text-muted-foreground text-xs mt-1 opacity-0 group-hover:opacity-60 transition-opacity">
                    tap to reveal
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* ── ROAST MODAL POPUP ── */}
        {showRoastModal && currentRoast && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none">
            {/* Backdrop blur layer */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" onClick={closeRoastModal} />

            {/* Modal card */}
            <div className="relative pointer-events-auto z-10 max-w-xl w-full mx-6 animate-fade-in"
              style={{ animation: 'fade-in 0.4s ease-out, slide-up 0.4s ease-out' }}>
              <div className="rounded-2xl p-8 text-center flex flex-col items-center gap-5"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--background)/0.85), hsl(var(--muted)/0.8))',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid hsl(var(--secondary)/0.4)',
                  boxShadow: '0 0 60px -10px hsl(var(--secondary)/0.4), 0 8px 32px -4px rgba(0,0,0,0.5)',
                }}>
                <div className="text-5xl">🔥</div>
                <p className="font-display text-xl sm:text-2xl font-black tracking-wide leading-tight"
                  style={{ color: 'hsl(var(--secondary))' }}>
                  {currentRoast}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={generateNewRoast}
                    className="flex items-center gap-2 bg-secondary/20 hover:bg-secondary/30 text-secondary px-5 py-2.5 rounded-xl font-bold text-sm transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                    New Roast
                  </button>
                  <button
                    onClick={closeRoastModal}
                    className="flex items-center gap-2 bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground px-5 py-2.5 rounded-xl font-bold text-sm transition-all"
                  >
                    <X className="w-4 h-4" />
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>,
      document.body
    );
  };

  // ─────────────────────────────────────────────────────────────────────
  // NORMAL VIEW
  // ─────────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="space-y-6">
        {/* Settings Panel */}
        <div className="glass rounded-xl p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="font-display text-sm tracking-wider text-primary uppercase">Question Settings</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Topic</label>
              <select
                value={topic}
                onChange={(e) => { playClick(); setTopic(e.target.value as MathOperation); }}
                className="w-full bg-muted text-foreground rounded-lg px-3 py-2.5 text-sm border border-border focus:border-primary focus:outline-none appearance-none cursor-pointer"
              >
                {TOPICS.map(t => (
                  <option key={t.value} value={t.value}>{t.emoji} {t.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Questions: {questionCount}</label>
              <input type="range" min={1} max={20} value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full accent-primary" />
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Difficulty: {difficulty}/10</label>
              <input type="range" min={1} max={10} value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
                className="w-full accent-secondary" />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleGenerate}
                className={`flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-[0_0_15px_-3px_hsl(var(--primary)/0.3)] ${isGenerating ? 'animate-shake' : ''}`}
              >
                {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Generate Questions
              </button>

              {questions.length > 0 && (
                <button
                  onClick={handleRevealAll}
                  className="flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-[0_0_15px_-3px_hsl(var(--secondary)/0.3)]"
                >
                  {showAnswers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showAnswers ? 'Hide Answers' : 'Reveal Answers'}
                </button>
              )}
            </div>

            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-2 bg-muted text-foreground px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-muted/80 transition-all ml-auto"
            >
              <Maximize className="w-4 h-4" />
              Fullscreen Mode
            </button>
          </div>
        </div>

        {/* Normal roast banner (non-fullscreen) */}
        {(showAnswers && currentRoast) && (
          <div className="glass-orange rounded-xl p-4 sm:p-5 text-center animate-fade-in flex flex-col sm:flex-row items-center justify-center gap-3">
            <p className="font-display text-base sm:text-xl text-secondary font-bold tracking-wide flex-1">
              🔥 {currentRoast} 🔥
            </p>
            <button
              onClick={generateNewRoast}
              className="shrink-0 text-xs bg-secondary/10 hover:bg-secondary/20 text-secondary px-4 py-2 rounded-full font-bold transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3 h-3" />
              New Roast
            </button>
          </div>
        )}

        {/* Normal questions grid */}
        {questions.length > 0 && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {questions.map((q, i) => {
              const isRevealed = showAnswers || revealedAnswers.has(q.id);
              return (
                <div
                  key={q.id}
                  onClick={() => handleRevealSingle(q.id)}
                  className="glass rounded-xl cursor-pointer hover:scale-[1.02] transition-all group animate-fade-in flex flex-col justify-center p-4 min-h-[160px]"
                  style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-primary text-xs">Q{i + 1}</span>
                    <span className="text-muted-foreground bg-muted text-[10px] px-3 py-1 rounded-full">{q.topic}</span>
                  </div>
                  <p className="font-mono text-foreground text-center font-bold tracking-wide text-xl sm:text-2xl py-3">
                    {q.question}
                  </p>
                  <div className={`mt-auto text-center transition-all duration-300 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="bg-glow-green/10 border border-glow-green/30 rounded-lg inline-block py-2 px-3">
                      <span className="font-mono font-bold text-glow-green text-lg">= {q.answer}</span>
                    </div>
                  </div>
                  {!isRevealed && (
                    <p className="text-center text-muted-foreground text-xs mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      click to reveal
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isFullscreen && <FullscreenOverlay />}
    </>
  );
}
