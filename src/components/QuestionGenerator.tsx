import { useState, useEffect } from 'react';
import { generateQuestions, TOPICS, type MathOperation, type MathQuestion } from '@/lib/mathGenerator';
import { playGenerate, playReveal, playClick } from '@/lib/sounds';
import { Sparkles, Eye, EyeOff, RefreshCw, Zap } from 'lucide-react';

export default function QuestionGenerator() {
  const [topic, setTopic] = useState<MathOperation>('random');
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState(5);
  const [questions, setQuestions] = useState<MathQuestion[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());

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
    <div className="space-y-6">
      {/* Controls bar */}
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
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={handleGenerate}
            className={`flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-[0_0_15px_-3px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.5)] ${isGenerating ? 'animate-shake' : ''
              }`}
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
      </div>

      {/* Questions grid */}
      {questions.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {questions.map((q, i) => {
            const isRevealed = showAnswers || revealedAnswers.has(q.id);
            return (
              <div
                key={q.id}
                onClick={() => handleRevealSingle(q.id)}
                className="glass rounded-xl p-4 cursor-pointer hover:scale-[1.03] transition-all group animate-fade-in"
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
              >
                {/* Question number & topic */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-xs text-primary">Q{i + 1}</span>
                  <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {q.topic}
                  </span>
                </div>

                {/* Question */}
                <p className="font-mono text-xl sm:text-2xl text-foreground text-center py-3 font-bold tracking-wide">
                  {q.question}
                </p>

                {/* Answer */}
                <div className={`mt-3 text-center transition-all duration-300 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}>
                  <div className="bg-glow-green/10 border border-glow-green/30 rounded-lg py-2 px-3">
                    <span className="font-mono text-lg font-bold text-glow-green text-glow-green">
                      = {q.answer}
                    </span>
                  </div>
                </div>

                {!isRevealed && (
                  <p className="text-center text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
