import { useState, useEffect } from 'react';
import { generateQuestions, TOPICS, type MathOperation, type MathQuestion } from '@/lib/mathGenerator';
import StopwatchPanel from '@/components/StopwatchPanel';
import { playGenerate, playReveal, playClick } from '@/lib/sounds';
import { Sparkles, Eye, EyeOff, RefreshCw, Zap, Maximize, Minimize } from 'lucide-react';

const ROASTS = [
  "Even my grandma calculates faster than you!",
  "Are you guessing, or is that actually your final answer?",
  "I've seen potatoes with better math skills.",
  "You might want to double-check that... or just give up.",
  "Did you use a calculator, or flip a coin?",
  "At least you're confidently incorrect.",
  "Math is hard, but it shouldn't be THIS hard for you.",
  "Did you sleep through Mr. Yeung's class today?",
  "Error 404: Math skills not found.",
  "My pet rock could have solved that faster.",
  "You put the 'no' in denominator.",
  "I'm not saying you're bad at math, but 2+2=5 is not a vibe.",
  "Are we doing math or modern art with these numbers?",
  "Mr. Yeung is typing... to tell you to try again.",
  "That answer is so wrong, it broke the space-time continuum.",
  "Is your brain lagging, or was that your actual answer?",
  "Did you calculate that on a toaster?",
  "I'm revoking your calculator privileges.",
  "If wrong answers were currency, you'd be a billionaire.",
  "Bro, even ChatGPT is confused by your math.",
  "MathsBot is crying right now.",
  "That was a solid guess... for a different question.",
  "I think your brain went on Do Not Disturb mode.",
  "Bruh. 💀",
  "Is it math or magic? Because that answer just disappeared from reality.",
  "You definitely used the random number generator technique.",
  "Please tell me you were holding the calculator upside down.",
  "Your math isn't mathing.",
  "This ain't it, chief."
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
  const [currentRoast, setCurrentRoast] = useState("");

  const handleGenerate = () => {
    playGenerate();
    setIsGenerating(true);
    setShowAnswers(false);
    setRevealedAnswers(new Set());

    setTimeout(() => {
      const newQuestions = generateQuestions(topic, questionCount, difficulty);
      setQuestions(newQuestions);
      setIsGenerating(false);
    }, 400);
  };

  const handleRevealAll = () => {
    playReveal();
    setShowAnswers(!showAnswers);
    if (!showAnswers) {
      setCurrentRoast(ROASTS[Math.floor(Math.random() * ROASTS.length)]);
    } else {
      setCurrentRoast("");
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

  // Generate on first load
  useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl p-8 sm:p-12 overflow-y-auto' : ''}`}>
      {/* Controls bar (Hidden in fullscreen) */}
      {!isFullscreen && (
        <div className="glass rounded-xl p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="font-display text-sm tracking-wider text-primary uppercase">Question Settings</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Topic selector */}
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

            {/* Question count */}
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Questions: {questionCount}</label>
              <input
                type="range"
                min={1}
                max={20}
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Difficulty: {difficulty}/10</label>
              <input
                type="range"
                min={1}
                max={10}
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
                className="w-full accent-secondary"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleGenerate}
                className={`flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-[0_0_15px_-3px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.5)] ${isGenerating ? 'animate-shake' : ''}`}
              >
                {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Generate Questions
              </button>

              {questions.length > 0 && (
                <button
                  onClick={handleRevealAll}
                  className="flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-[0_0_15px_-3px_hsl(var(--secondary)/0.3)] hover:shadow-[0_0_25px_-5px_hsl(var(--secondary)/0.5)]"
                >
                  {showAnswers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showAnswers ? 'Hide Answers' : 'Reveal Answers'}
                </button>
              )}
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => { playClick(); setIsFullscreen(true); }}
              className="flex items-center gap-2 bg-muted text-foreground px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-muted/80 transition-all ml-auto"
            >
              <Maximize className="w-4 h-4" />
              Fullscreen Mode
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Header & Controls */}
      {isFullscreen && (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-6 border-b border-border/50 animate-fade-in">
          <div>
            <h2 className="font-display text-2xl sm:text-4xl text-foreground font-black tracking-tight drop-shadow-lg">
              FOCUS <span className="text-transparent bg-clip-text bg-gradient-hero">MODE</span>
            </h2>
            <p className="text-muted-foreground mt-2">Solve the questions below.</p>
          </div>
          <div className="flex-1 w-full md:w-auto flex justify-center md:justify-end shrink-0">
            {/* Scale down the stopwatch slightly so it fits neatly in the header */}
            <div className="transform scale-75 sm:scale-90 origin-right">
              <StopwatchPanel />
            </div>
          </div>
          <div className="flex gap-4 shrink-0">
            <button
              onClick={handleRevealAll}
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-bold text-base hover:opacity-90 transition-all shadow-[0_0_15px_-3px_hsl(var(--secondary)/0.3)] hover:shadow-[0_0_25px_-5px_hsl(var(--secondary)/0.5)]"
            >
              {showAnswers ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              {showAnswers ? 'Hide Answers' : 'Reveal Answers'}
            </button>
            <button
              onClick={() => { playClick(); setIsFullscreen(false); }}
              className="flex items-center gap-2 bg-muted text-foreground px-6 py-3 rounded-xl font-bold text-base hover:bg-muted/80 transition-all"
            >
              <Minimize className="w-5 h-5" />
              Exit
            </button>
          </div>
        </div>
      )}

      {/* Roast Display (Only when answers are revealed) */}
      {(showAnswers && currentRoast) && (
        <div className="glass-orange rounded-xl p-4 sm:p-6 mb-6 text-center animate-fade-in border-destructive/30 flex flex-col items-center justify-center gap-3">
          <p className="font-display text-lg sm:text-2xl text-glow-orange text-secondary font-bold tracking-wide">
            🔥 {currentRoast} 🔥
          </p>
          <button
            onClick={() => setCurrentRoast(ROASTS[Math.floor(Math.random() * ROASTS.length)])}
            className="text-xs sm:text-sm bg-secondary/10 hover:bg-secondary/20 text-secondary px-4 py-2 rounded-full font-bold transition-all mt-2 flex items-center gap-2"
          >
            <RefreshCw className="w-3 h-3" />
            New Roast
          </button>
        </div>
      )}

      {/* Questions grid */}
      {questions.length > 0 && (
        <div className={`grid gap-4 ${isFullscreen ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
          {questions.map((q, i) => {
            const isRevealed = showAnswers || revealedAnswers.has(q.id);
            return (
              <div
                key={q.id}
                onClick={() => handleRevealSingle(q.id)}
                className={`glass rounded-xl cursor-pointer hover:scale-[1.02] transition-all group animate-fade-in flex flex-col justify-center ${isFullscreen ? 'p-8 sm:p-10 min-h-[250px]' : 'p-4 min-h-[160px]'}`}
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
              >
                {/* Question number & topic */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-display text-primary ${isFullscreen ? 'text-lg' : 'text-xs'}`}>Q{i + 1}</span>
                  <span className={`text-muted-foreground bg-muted px-3 py-1 rounded-full ${isFullscreen ? 'text-xs' : 'text-[10px]'}`}>
                    {q.topic}
                  </span>
                </div>

                {/* Question */}
                <p className={`font-mono text-foreground text-center font-bold tracking-wide ${isFullscreen ? 'text-3xl sm:text-5xl py-6' : 'text-xl sm:text-2xl py-3'}`}>
                  {q.question}
                </p>

                {/* Answer */}
                <div className={`mt-auto text-center transition-all duration-300 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className={`bg-glow-green/10 border border-glow-green/30 rounded-lg inline-block ${isFullscreen ? 'py-3 px-6' : 'py-2 px-3'}`}>
                    <span className={`font-mono font-bold text-glow-green text-glow-green ${isFullscreen ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
                      = {q.answer}
                    </span>
                  </div>
                </div>

                {!isRevealed && (
                  <p className={`text-center text-muted-foreground mt-4 opacity-0 group-hover:opacity-100 transition-opacity ${isFullscreen ? 'text-sm' : 'text-xs'}`}>
                    click to reveal
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
