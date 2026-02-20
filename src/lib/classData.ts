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
      "Wait, Mr. Yeung got a question right? Everyone clap! ...Just kidding, we appreciate you sir!",
      "Mr. Yeung walks into class and the projector starts sweating.",
      "Legend says Mr. Yeung once gave homework on a Saturday. Even the calendar was confused.",
      "Thank you Mr. Yeung for being the best math teacher! (Please give us bonus marks for this)",
      "Mr. Yeung could sell a math textbook to a calculator. Pure talent.",
      "Is Mr. Yeung actually a math genius, or just three calculators in a trench coat? We appreciate you either way!",
      "Mr. Yeung is the only reason half this class hasn't dropped out yet. W teacher.",
      "Mr. Yeung's favourite exercise? Running out of time... but we love his classes anyway!"
    ],
  },
  {
    name: 'Arslan Sohail',
    grade: '09',
    role: 'student',
    roasts: [
      "Arslan is so good at math, even the calculator asks HIM for help. Absolute carry.",
      "Arslan walks in and the class average goes up by 20 percent. Legend.",
      "Every teacher's dream student, every classmate's nightmare during curve grading: It's Arslan!",
      "Arslan doesn't need a calculator, the calculator needs Arslan.",
      "Shoutout to Arslan, the only one actually understanding what Mr. Yeung is saying right now.",
      "Arslan's brain is just built different. Huge respect.",
      "Does Arslan ever sleep, or does he just recharge his math circuits? Either way, W.",
      "Arslan is basically the final boss of this math class."
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
      "Aseel thinks PEMDAS is a type of pasta.",
      "Aseel studying math is like watching a fish try to climb a tree."
    ],
  },
  {
    name: 'Melek Ibrahim',
    grade: '11',
    role: 'student',
    roasts: [
      "Melek is in grade 11 doing grade 9 math. Strategic retreat or deep cover?",
      "Melek has been studying so long, the textbook has their coffee stains.",
      "Melek's calculator history is just 5 plus 5 to make sure.",
      "Melek walks into math class like it's a reunion tour.",
      "Melek does math entirely in lowercase. Make it make sense."
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
      "Daxil stares at the paper until the numbers get uncomfortable and move.",
      "Daxil's brain has 99 tabs open, and none of them are doing math."
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
      "Hilina uses a ruler for the multiple-choice bubbles. Perfectionist.",
      "Hilina is just here for the pure aesthetic of failing gracefully."
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
      "Yuxi whispers the answer to the air and hopes Mr. Yeung hears it telepathically.",
      "Yuxi's math skills are like a ninja: completely invisible until it's too late."
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
      "Oula looks at fractions the same way I look at my tax returns. Pure confusion.",
      "Oula guesses C on every test and calls it a lifestyle choice."
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
      "Tasif thinks algebra is an indie band playing downtown tonight.",
      "Tasif looks at graph paper and assumes we are playing battleships."
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
      "Hammad brings a protractor to English class. He's confused, but he's got the spirit.",
      "Hammad thinks negative numbers are just numbers with a bad attitude."
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
      "Stanislav only knows the Pythagorean theorem because of the memes.",
      "Stanislav treats multiple-choice like a dating app. Just swipes left."
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
      "Yana does math in pen. She's living life on the absolute edge.",
      "Yana thinks carrying the one is an emotional burden."
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
      "Juan answers geometry questions with vibes instead of logic.",
      "Juan checks out mentally five seconds before the class even begins."
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
      "Mohamad thinks a hypotenuse is a large animal at the zoo.",
      "Mohamad calculates his sleep schedule better than these equations."
    ],
  }
];
