// Class roster and roasts data

export interface ClassMember {
  name: string;
  grade: string;
  role: 'teacher' | 'student';
  roasts: string[];
}

export const CLASS_MEMBERS: ClassMember[] = [
  {
    name: 'Mr. Yeung',
    grade: 'Teacher',
    role: 'teacher',
    roasts: [
      "Mr. Yeung walks into class and the projector starts sweating.",
      "Legend says Mr. Yeung once gave homework on a Saturday. Even the calendar was confused.",
      "Mr. Yeung's favourite exercise? Running out of time.",
      "Thank you Mr. Yeung for everything you do for us... except the pop quizzes.",
      "Mr. Yeung could sell a math textbook to a calculator.",
    ],
  },
  {
    name: 'Arslan Sohail',
    grade: '09',
    role: 'student',
    roasts: [
      "Arslan is so good at math, even the calculator asks HIM for help. Mr. Yeung's favourite student and honestly? We get it.",
      "Arslan walks in and the class average goes up by 20 percent. Absolute carry.",
      "Every teacher's dream student. Every classmate's nightmare during curve grading.",
      "Arslan doesn't need a calculator, the calculator needs Arslan.",
      "Mr. Yeung sees Arslan and smiles. The rest of us? He sees and sighs.",
    ],
  },
  {
    name: 'Aseel Khalifa',
    grade: '09',
    role: 'student',
    roasts: [
      "Aseel's pencil moves so slow, snails file complaints.",
      "Aseel once answered a question right and the whole class thought it was a glitch.",
      "Aseel's notes look like ancient hieroglyphics. Even archaeologists gave up.",
    ],
  },
  {
    name: 'Melek Ibrahim',
    grade: '11',
    role: 'student',
    roasts: [
      "Melek is in grade 11 doing grade 9 math. Strategic retreat or deep cover?",
      "Melek has been studying so long, the textbook has their coffee stains.",
      "Melek walks into math class like it's a reunion tour.",
    ],
  },
  {
    name: 'Daxil Dobariya',
    grade: '09',
    role: 'student',
    roasts: [
      "Daxil spells math with a silent cry.",
      "Daxil once tried to divide by zero. The universe said no but he still argued.",
      "Daxil brings more excuses than homework. Consistent king.",
    ],
  },
  {
    name: 'Hilina Sefani',
    grade: '09',
    role: 'student',
    roasts: [
      "Hilina finishes the test so fast, even the clock is suspicious.",
      "Hilina's eraser works harder than most students in this class.",
      "Hilina zones out and still gets a better grade than half the class.",
    ],
  },
  {
    name: 'Yuxi Tang',
    grade: '09',
    role: 'student',
    roasts: [
      "Yuxi is so quiet in class that the teacher marks them absent while staring at them.",
      "Yuxi solved a problem once and the whole class needed therapy.",
      "Yuxi's brain loads faster than the school WiFi. Not that hard honestly.",
    ],
  },
  {
    name: 'Oula Alismail',
    grade: '11',
    role: 'student',
    roasts: [
      "Oula has seen more math classes than most teachers.",
      "Oula treats math class like a Netflix series. Just here for the plot.",
      "Oula's strategy? Attend enough classes for it to count as a hobby.",
    ],
  },
  {
    name: 'Tasif Rahman Rohan',
    grade: '09',
    role: 'student',
    roasts: [
      "Tasif has three names and zero homework submissions.",
      "Tasif's hand goes up in class only to ask 'can I go to the bathroom?'",
      "Tasif types faster than he calculates. Wrong priorities my guy.",
    ],
  },
  {
    name: 'Hammad Rana',
    grade: '09',
    role: 'student',
    roasts: [
      "Hammad's favourite math operation is logging out.",
      "Hammad studies for 5 minutes and calls it a marathon.",
      "Hammad's calculator has trust issues because of how often he doubts it.",
    ],
  },
  {
    name: 'Stanislav Harasymiuk',
    grade: '09',
    role: 'student',
    roasts: [
      "Stanislav's name is longer than his attention span in class.",
      "By the time you spell Stanislav's name, the class is already over.",
      "Stanislav once wrote his name on a test and ran out of time.",
    ],
  },
  {
    name: 'Yana Pushkarova',
    grade: '09',
    role: 'student',
    roasts: [
      "Yana solves problems like a boss and leaves like a ghost.",
      "Yana's poker face during a test is unmatched. Nobody knows if she's winning or giving up.",
      "Yana could stare at a math problem and it would solve itself out of fear.",
    ],
  },
  {
    name: 'Juan Herrera Amaya',
    grade: '09',
    role: 'student',
    roasts: [
      "Juan shows up to class and chaos follows. Not his fault, chaos just likes him.",
      "Juan treats every test like a creative writing exercise.",
      "Juan's confidence in wrong answers is honestly inspirational.",
    ],
  },
  {
    name: 'Mohamad Alkhattab',
    grade: '11',
    role: 'student',
    roasts: [
      "Mohamad has been in math so long, he counts as school furniture.",
      "Mohamad looks at the whiteboard like it personally wronged him.",
      "Mohamad's favourite part of math is when it ends.",
    ],
  },
];
