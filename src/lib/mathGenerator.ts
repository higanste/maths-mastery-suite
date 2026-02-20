// Math question generation utilities

export type MathOperation = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'fractions' | 'percentages' | 'algebra' | 'powers' | 'random';

export interface MathQuestion {
  id: string;
  question: string;
  answer: string;
  topic: string;
}

const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

function generateAddition(difficulty: number): MathQuestion {
  const max = difficulty <= 3 ? 20 : difficulty <= 6 ? 100 : 1000;
  const a = randInt(1, max);
  const b = randInt(1, max);
  return { id: crypto.randomUUID(), question: `${a} + ${b}`, answer: `${a + b}`, topic: 'Addition' };
}

function generateSubtraction(difficulty: number): MathQuestion {
  const max = difficulty <= 3 ? 20 : difficulty <= 6 ? 100 : 1000;
  const a = randInt(1, max);
  const b = randInt(1, a); // ensure positive
  return { id: crypto.randomUUID(), question: `${a} − ${b}`, answer: `${a - b}`, topic: 'Subtraction' };
}

function generateMultiplication(difficulty: number): MathQuestion {
  const maxA = difficulty <= 3 ? 12 : difficulty <= 6 ? 25 : 50;
  const maxB = difficulty <= 3 ? 12 : difficulty <= 6 ? 15 : 25;
  const a = randInt(2, maxA);
  const b = randInt(2, maxB);
  return { id: crypto.randomUUID(), question: `${a} × ${b}`, answer: `${a * b}`, topic: 'Multiplication' };
}

function generateDivision(difficulty: number): MathQuestion {
  const maxDiv = difficulty <= 3 ? 12 : difficulty <= 6 ? 20 : 50;
  const b = randInt(2, maxDiv);
  const answer = randInt(2, maxDiv);
  const a = b * answer;
  return { id: crypto.randomUUID(), question: `${a} ÷ ${b}`, answer: `${answer}`, topic: 'Division' };
}

function generateFractions(difficulty: number): MathQuestion {
  const maxDenom = difficulty <= 3 ? 6 : difficulty <= 6 ? 12 : 20;
  const d1 = randInt(2, maxDenom);
  const d2 = randInt(2, maxDenom);
  const n1 = randInt(1, d1 - 1);
  const n2 = randInt(1, d2 - 1);
  const ops = ['+', '−'];
  const op = ops[randInt(0, 1)];
  
  let ansNum: number, ansDen: number;
  if (op === '+') {
    ansNum = n1 * d2 + n2 * d1;
    ansDen = d1 * d2;
  } else {
    ansNum = n1 * d2 - n2 * d1;
    ansDen = d1 * d2;
  }
  
  const g = gcd(Math.abs(ansNum), ansDen);
  const simplifiedNum = ansNum / g;
  const simplifiedDen = ansDen / g;
  
  const ansStr = simplifiedDen === 1 ? `${simplifiedNum}` : `${simplifiedNum}/${simplifiedDen}`;
  
  return { id: crypto.randomUUID(), question: `${n1}/${d1} ${op} ${n2}/${d2}`, answer: ansStr, topic: 'Fractions' };
}

function generatePercentages(difficulty: number): MathQuestion {
  const percs = difficulty <= 3 ? [10, 20, 25, 50] : difficulty <= 6 ? [5, 10, 15, 20, 25, 30, 50, 75] : [5, 8, 12, 15, 17, 22, 33, 45, 60, 75, 80];
  const perc = percs[randInt(0, percs.length - 1)];
  const base = randInt(2, 20) * 10;
  const ans = (perc / 100) * base;
  return { id: crypto.randomUUID(), question: `${perc}% of ${base}`, answer: `${ans}`, topic: 'Percentages' };
}

function generateAlgebra(difficulty: number): MathQuestion {
  if (difficulty <= 4) {
    const a = randInt(2, 10);
    const x = randInt(1, 15);
    const b = randInt(1, 20);
    const result = a * x + b;
    return { id: crypto.randomUUID(), question: `${a}x + ${b} = ${result}, find x`, answer: `x = ${x}`, topic: 'Algebra' };
  } else {
    const a = randInt(2, 8);
    const b = randInt(1, 10);
    const x = randInt(1, 10);
    const c = randInt(1, 5);
    const d = a * x + b - c * x;
    return { id: crypto.randomUUID(), question: `${a}x + ${b} = ${c}x + ${d + c * x - c * x + b}... solve for x`, answer: `x = ${x}`, topic: 'Algebra' };
  }
}

function generatePowers(difficulty: number): MathQuestion {
  const base = randInt(2, difficulty <= 3 ? 5 : 10);
  const exp = randInt(2, difficulty <= 3 ? 3 : 4);
  return { id: crypto.randomUUID(), question: `${base}^${exp}`, answer: `${Math.pow(base, exp)}`, topic: 'Powers' };
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

const generators: Record<string, (d: number) => MathQuestion> = {
  addition: generateAddition,
  subtraction: generateSubtraction,
  multiplication: generateMultiplication,
  division: generateDivision,
  fractions: generateFractions,
  percentages: generatePercentages,
  algebra: generateAlgebra,
  powers: generatePowers,
};

export function generateQuestions(
  operation: MathOperation,
  count: number,
  difficulty: number
): MathQuestion[] {
  const questions: MathQuestion[] = [];
  const ops = operation === 'random' ? Object.keys(generators) : [operation];
  
  for (let i = 0; i < count; i++) {
    const op = ops[randInt(0, ops.length - 1)];
    questions.push(generators[op](difficulty));
  }
  
  return questions;
}

export const TOPICS: { value: MathOperation; label: string; emoji: string }[] = [
  { value: 'random', label: 'Random Mix', emoji: '🎲' },
  { value: 'addition', label: 'Addition', emoji: '➕' },
  { value: 'subtraction', label: 'Subtraction', emoji: '➖' },
  { value: 'multiplication', label: 'Multiplication', emoji: '✖️' },
  { value: 'division', label: 'Division', emoji: '➗' },
  { value: 'fractions', label: 'Fractions', emoji: '🔢' },
  { value: 'percentages', label: 'Percentages', emoji: '💯' },
  { value: 'algebra', label: 'Algebra', emoji: '🔤' },
  { value: 'powers', label: 'Powers', emoji: '⚡' },
];
