import { useState } from 'react';
import { CLASS_MEMBERS } from '@/lib/classData';
import { playRoastDrum, playClick, speakText } from '@/lib/sounds';
import { Flame, Volume2, Users } from 'lucide-react';

export default function ClassRoster() {
  const [activeRoast, setActiveRoast] = useState<{ name: string; roast: string } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRoast = (member: typeof CLASS_MEMBERS[0]) => {
    playClick();
    setIsAnimating(true);

    // Pick random roast
    const roast = member.roasts[Math.floor(Math.random() * member.roasts.length)];

    setTimeout(() => {
      setActiveRoast({ name: member.name, roast });
      playRoastDrum();
      setIsAnimating(false);
    }, 500);
  };

  const handleSpeak = () => {
    if (activeRoast) {
      speakText(activeRoast.roast);
    }
  };

  const roastRandom = () => {
    const member = CLASS_MEMBERS[Math.floor(Math.random() * CLASS_MEMBERS.length)];
    handleRoast(member);
  };

  return (
    <div className="glass rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-glow-purple" />
          <h3 className="font-display text-sm tracking-wider text-accent uppercase">Dakota Collegiate</h3>
        </div>
        <button
          onClick={roastRandom}
          className="flex items-center gap-1.5 bg-destructive/20 text-destructive px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-destructive/30 transition-all hover:scale-105"
        >
          <Flame className="w-3.5 h-3.5" />
          Random Roast
        </button>
      </div>

      {/* Roast display */}
      {activeRoast && (
        <div className={`mb-4 p-4 rounded-xl glass-orange animate-slide-up`}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-secondary font-bold text-sm">{activeRoast.name}</span>
              <p className="text-foreground text-sm mt-1 leading-relaxed">{activeRoast.roast}</p>
            </div>
            <button
              onClick={handleSpeak}
              className="shrink-0 p-2 rounded-lg bg-secondary/20 text-secondary hover:bg-secondary/30 transition-all"
              title="Read aloud"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Class list */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-1">
        {CLASS_MEMBERS.map((member) => (
          <button
            key={member.name}
            onClick={() => handleRoast(member)}
            className={`text-left p-2.5 rounded-lg transition-all hover:scale-[1.03] ${
              member.role === 'teacher'
                ? 'bg-secondary/10 border border-secondary/30 hover:bg-secondary/20'
                : 'bg-muted/50 border border-border hover:bg-muted'
            } ${isAnimating ? 'animate-shake' : ''}`}
          >
            <p className={`text-xs font-semibold truncate ${
              member.role === 'teacher' ? 'text-secondary' : 'text-foreground'
            }`}>
              {member.name}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {member.role === 'teacher' ? '👨‍🏫 Teacher' : `Grade ${member.grade}`}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
