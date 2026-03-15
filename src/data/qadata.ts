// qadata.js - Stores all question and answer data

const questionBank: Record<string, any[]> = {
  aptitude: [
    {
      id: "apt1",
      question: "What is 5 + 3?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 2,
      explanation: "5 + 3 = 8"
    },
    {
      id: "apt2",
      question: "What is 10 - 4?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 1,
      explanation: "10 - 4 = 6"
    },
    {
      id: "apt3",
      question: "What is 2 * 6?",
      options: ["10", "12", "14", "16"],
      correctAnswer: 1,
      explanation: "2 * 6 = 12"
    },
    {
      id: "apt4",
      question: "What is 15 / 3?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2,
      explanation: "15 / 3 = 5"
    },
    {
      id: "apt5",
      question: "What is the square of 4?",
      options: ["8", "12", "16", "20"],
      correctAnswer: 2,
      explanation: "4² = 16"
    },
    {
      id: "apt6",
      question: "What is 7 + 2?",
      options: ["8", "9", "10", "11"],
      correctAnswer: 1,
      explanation: "7 + 2 = 9"
    },
    {
      id: "apt7",
      question: "What is 20 / 4?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 1,
      explanation: "20 / 4 = 5"
    }
  ],
  reasoning: [
    {
      id: "rea1",
      question: "What comes next: A, B, C, ?",
      options: ["D", "E", "F", "G"],
      correctAnswer: 0,
      explanation: "Alphabet sequence: A, B, C, D"
    },
    {
      id: "rea2",
      question: "Which number is missing: 2, 4, 6, ?",
      options: ["7", "8", "9", "10"],
      correctAnswer: 1,
      explanation: "Even numbers: 2, 4, 6, 8"
    },
    {
      id: "rea3",
      question: "What comes next: 1, 3, 5, ?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 1,
      explanation: "Odd numbers: 1, 3, 5, 7"
    }
  ],
  physics: [
    {
      id: "phy1",
      question: "What is the SI unit of force?",
      options: ["Newton", "Joule", "Watt", "Pascal"],
      correctAnswer: 0,
      explanation: "Force is measured in Newton (N)."
    },
    {
      id: "phy2",
      question: "What is the speed of light in vacuum?",
      options: ["3 × 10^8 m/s", "3 × 10^6 m/s", "3 × 10^10 m/s", "3 × 10^4 m/s"],
      correctAnswer: 0,
      explanation: "The speed of light in vacuum is approximately 3 × 10^8 m/s."
    },
    {
      id: "phy3",
      question: "Which law states that for every action, there is an equal and opposite reaction?",
      options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravitation"],
      correctAnswer: 2,
      explanation: "Newton's Third Law of Motion."
    },
    {
      id: "phy4",
      question: "What is the formula for kinetic energy?",
      options: ["1/2 mv^2", "mv^2", "1/2 m^2 v", "mgh"],
      correctAnswer: 0,
      explanation: "Kinetic energy = 1/2 mass × velocity squared."
    },
    {
      id: "phy5",
      question: "What is the unit of electric charge?",
      options: ["Volt", "Ampere", "Coulomb", "Ohm"],
      correctAnswer: 2,
      explanation: "Electric charge is measured in Coulomb (C)."
    },
    {
      id: "phy6",
      question: "What is the acceleration due to gravity on Earth?",
      options: ["9.8 m/s²", "10 m/s²", "8.9 m/s²", "9.0 m/s²"],
      correctAnswer: 0,
      explanation: "Approximately 9.8 m/s²."
    }
  ]
};

export default questionBank;