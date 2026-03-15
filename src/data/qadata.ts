// qadata.js - Stores all question and answer data

const questionBank: Record<string, any[]> = {
  aptitude: [
    {
      id: "apt1",
      question: {
        en: "What is 5 + 3?",
        hi: "5 + 3 क्या है?"
      },
      options: {
        en: ["6", "7", "8", "9"],
        hi: ["6", "7", "8", "9"]
      },
      correctAnswer: 2,
      explanation: {
        en: "5 + 3 = 8",
        hi: "5 + 3 = 8"
      }
    },
    {
      id: "apt2",
      question: {
        en: "What is 10 - 4?",
        hi: "10 - 4 क्या है?"
      },
      options: {
        en: ["5", "6", "7", "8"],
        hi: ["5", "6", "7", "8"]
      },
      correctAnswer: 1,
      explanation: {
        en: "10 - 4 = 6",
        hi: "10 - 4 = 6"
      }
    },
    {
      id: "apt3",
      question: {
        en: "What is 2 * 6?",
        hi: "2 * 6 क्या है?"
      },
      options: {
        en: ["10", "12", "14", "16"],
        hi: ["10", "12", "14", "16"]
      },
      correctAnswer: 1,
      explanation: {
        en: "2 * 6 = 12",
        hi: "2 * 6 = 12"
      }
    },
    {
      id: "apt4",
      question: {
        en: "What is 15 / 3?",
        hi: "15 / 3 क्या है?"
      },
      options: {
        en: ["3", "4", "5", "6"],
        hi: ["3", "4", "5", "6"]
      },
      correctAnswer: 2,
      explanation: {
        en: "15 / 3 = 5",
        hi: "15 / 3 = 5"
      }
    },
    {
      id: "apt5",
      question: {
        en: "What is the square of 4?",
        hi: "4 का वर्ग क्या है?"
      },
      options: {
        en: ["8", "12", "16", "20"],
        hi: ["8", "12", "16", "20"]
      },
      correctAnswer: 2,
      explanation: {
        en: "4² = 16",
        hi: "4² = 16"
      }
    },
    {
      id: "apt6",
      question: {
        en: "What is 7 + 2?",
        hi: "7 + 2 क्या है?"
      },
      options: {
        en: ["8", "9", "10", "11"],
        hi: ["8", "9", "10", "11"]
      },
      correctAnswer: 1,
      explanation: {
        en: "7 + 2 = 9",
        hi: "7 + 2 = 9"
      }
    },
    {
      id: "apt7",
      question: {
        en: "What is 20 / 4?",
        hi: "20 / 4 क्या है?"
      },
      options: {
        en: ["4", "5", "6", "7"],
        hi: ["4", "5", "6", "7"]
      },
      correctAnswer: 1,
      explanation: {
        en: "20 / 4 = 5",
        hi: "20 / 4 = 5"
      }
    }
  ],
  reasoning: [
    {
      id: "rea1",
      question: {
        en: "What comes next: A, B, C, ?",
        hi: "अगला क्या आएगा: A, B, C, ?"
      },
      options: {
        en: ["D", "E", "F", "G"],
        hi: ["D", "E", "F", "G"]
      },
      correctAnswer: 0,
      explanation: {
        en: "Alphabet sequence: A, B, C, D",
        hi: "वर्णमाला अनुक्रम: A, B, C, D"
      }
    },
    {
      id: "rea2",
      question: {
        en: "Which number is missing: 2, 4, 6, ?",
        hi: "कौन सा संख्या गायब है: 2, 4, 6, ?"
      },
      options: {
        en: ["7", "8", "9", "10"],
        hi: ["7", "8", "9", "10"]
      },
      correctAnswer: 1,
      explanation: {
        en: "Even numbers: 2, 4, 6, 8",
        hi: "सम संख्याएँ: 2, 4, 6, 8"
      }
    },
    {
      id: "rea3",
      question: {
        en: "What comes next: 1, 3, 5, ?",
        hi: "अगला क्या आएगा: 1, 3, 5, ?"
      },
      options: {
        en: ["6", "7", "8", "9"],
        hi: ["6", "7", "8", "9"]
      },
      correctAnswer: 1,
      explanation: {
        en: "Odd numbers: 1, 3, 5, 7",
        hi: "विषम संख्याएँ: 1, 3, 5, 7"
      }
    }
  ],
  physics: [
    {
      id: "phy1",
      question: {
        en: "What is the SI unit of force?",
        hi: "बल की SI इकाई क्या है?"
      },
      options: {
        en: ["Newton", "Joule", "Watt", "Pascal"],
        hi: ["न्यूटन", "जूल", "वाट", "पास्कल"]
      },
      correctAnswer: 0,
      explanation: {
        en: "Force is measured in Newton (N).",
        hi: "बल को न्यूटन (N) में मापा जाता है।"
      }
    },
    {
      id: "phy2",
      question: {
        en: "What is the speed of light in vacuum?",
        hi: "वायुमंडल में प्रकाश की गति क्या है?"
      },
      options: {
        en: ["3 × 10^8 m/s", "3 × 10^6 m/s", "3 × 10^10 m/s", "3 × 10^4 m/s"],
        hi: ["3 × 10^8 m/s", "3 × 10^6 m/s", "3 × 10^10 m/s", "3 × 10^4 m/s"]
      },
      correctAnswer: 0,
      explanation: {
        en: "The speed of light in vacuum is approximately 3 × 10^8 m/s.",
        hi: "वायुमंडल में प्रकाश की गति लगभग 3 × 10^8 m/s है।"
      }
    },
    {
      id: "phy3",
      question: {
        en: "Which law states that for every action, there is an equal and opposite reaction?",
        hi: "कौन सा नियम कहता है कि प्रत्येक क्रिया के लिए, एक समान और विपरीत प्रतिक्रिया होती है?"
      },
      options: {
        en: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravitation"],
        hi: ["न्यूटन का पहला नियम", "न्यूटन का दूसरा नियम", "न्यूटन का तीसरा नियम", "गुरुत्वाकर्षण का नियम"]
      },
      correctAnswer: 2,
      explanation: {
        en: "Newton's Third Law of Motion.",
        hi: "न्यूटन का गति का तीसरा नियम।"
      }
    },
    {
      id: "phy4",
      question: {
        en: "What is the formula for kinetic energy?",
        hi: "गतिज ऊर्जा का सूत्र क्या है?"
      },
      options: {
        en: ["1/2 mv^2", "mv^2", "1/2 m^2 v", "mgh"],
        hi: ["1/2 mv^2", "mv^2", "1/2 m^2 v", "mgh"]
      },
      correctAnswer: 0,
      explanation: {
        en: "Kinetic energy = 1/2 mass × velocity squared.",
        hi: "गतिज ऊर्जा = 1/2 द्रव्यमान × वेग का वर्ग।"
      }
    },
    {
      id: "phy5",
      question: {
        en: "What is the unit of electric charge?",
        hi: "विद्युत आवेश की इकाई क्या है?"
      },
      options: {
        en: ["Volt", "Ampere", "Coulomb", "Ohm"],
        hi: ["वोल्ट", "एम्पेयर", "कूलॉम्ब", "ओहम"]
      },
      correctAnswer: 2,
      explanation: {
        en: "Electric charge is measured in Coulomb (C).",
        hi: "विद्युत आवेश को कूलॉम्ब (C) में मापा जाता है।"
      }
    },
    {
      id: "phy6",
      question: {
        en: "What is the acceleration due to gravity on Earth?",
        hi: "पृथ्वी पर गुरुत्वाकर्षण के कारण त्वरण क्या है?"
      },
      options: {
        en: ["9.8 m/s²", "10 m/s²", "8.9 m/s²", "9.0 m/s²"],
        hi: ["9.8 m/s²", "10 m/s²", "8.9 m/s²", "9.0 m/s²"]
      },
      correctAnswer: 0,
      explanation: {
        en: "Approximately 9.8 m/s².",
        hi: "लगभग 9.8 m/s²।"
      }
    }
  ]
};

export default questionBank;