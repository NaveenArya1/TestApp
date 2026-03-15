import { Test, TestResult, DynamicTest, Question } from '@/types';
import questionBank from '@/data/qadata';
import { resultsDataProxy } from '@/data/resultdata';

type QuestionBank = {
  [category: string]: Question[];
};

// Mock data for now
const mockTests: Test[] = [
  {
    id: '1',
    name: 'Aptitude Test 1',
    description: 'Basic quantitative aptitude questions',
    questions: [
      {
        id: 'q1',
        question: 'What is 5 + 3?',
        options: ['6', '7', '8', '9'],
        correctAnswer: 2,
        explanation: '5 + 3 = 8',
      },
      {
        id: 'q2',
        question: 'What is 10 - 4?',
        options: ['5', '6', '7', '8'],
        correctAnswer: 1,
        explanation: '10 - 4 = 6',
      },
      {
        id: 'q3',
        question: 'What is 2 * 6?',
        options: ['10', '12', '14', '16'],
        correctAnswer: 1,
        explanation: '2 * 6 = 12',
      },
      {
        id: 'q4',
        question: 'What is 15 / 3?',
        options: ['3', '4', '5', '6'],
        correctAnswer: 2,
        explanation: '15 / 3 = 5',
      },
      {
        id: 'q5',
        question: 'What is the square of 4?',
        options: ['8', '12', '16', '20'],
        correctAnswer: 2,
        explanation: '4² = 16',
      },
    ],
    duration: 60,
    totalQuestions: 5,
  },
  {
    id: '2',
    name: 'Reasoning Test',
    description: 'Logical reasoning questions',
    questions: [
      {
        id: 'q1',
        question: 'What comes next: A, B, C, ?',
        options: ['D', 'E', 'F', 'G'],
        correctAnswer: 0,
        explanation: 'Alphabet sequence: A, B, C, D',
      },
      {
        id: 'q2',
        question: 'Which number is missing: 2, 4, 6, ?',
        options: ['7', '8', '9', '10'],
        correctAnswer: 1,
        explanation: 'Even numbers: 2, 4, 6, 8',
      },
    ],
    duration: 45,
    totalQuestions: 2,
  },
];

const dynamicTests: DynamicTest[] = [
  {
    id: 'dynamic1',
    name: 'Mixed Aptitude Test',
    description: 'Random questions from aptitude and reasoning',
    categories: { aptitude: 3, reasoning: 2 },
    duration: 60,
  },
  {
    id: 'dynamic2',
    name: 'Physics Test',
    description: 'Random physics questions',
    categories: { physics: 5 },
    duration: 60,
  },
];

export const getTests = async (): Promise<Test[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTests), 500);
  });
};

export const getDynamicTests = async (): Promise<DynamicTest[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(dynamicTests), 500);
  });
};

export const generateTestFromDynamic = async (dynamicTest: DynamicTest): Promise<Test> => {
  const questions: Question[] = [];
  for (const [category, count] of Object.entries(dynamicTest.categories)) {
    const categoryQuestions = (questionBank as any)[category] || [];
    const shuffled = categoryQuestions.sort(() => 0.5 - Math.random());
    questions.push(...shuffled.slice(0, count));
  }
  return {
    id: dynamicTest.id,
    name: dynamicTest.name,
    description: dynamicTest.description,
    questions,
    duration: dynamicTest.duration,
    totalQuestions: questions.length,
  };
};

export const getTestById = async (id: string): Promise<Test | null> => {
  let test = mockTests.find((t) => t.id === id);
  if (!test) {
    const dynamicTest = dynamicTests.find((t) => t.id === id);
    if (dynamicTest) {
      test = await generateTestFromDynamic(dynamicTest);
    }
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(test || null), 500);
  });
};

// Use resultsDataProxy from resultdata.ts
export const submitTest = async (result: TestResult): Promise<TestResult> => {
  // Generate a unique ID for the result
  const resultId = `result_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const resultWithId = { ...result, id: resultId };
  resultsDataProxy[resultId] = resultWithId;
  return new Promise((resolve) => {
    setTimeout(() => resolve(resultWithId), 500);
  });
};

export const getResult = async (resultId: string): Promise<TestResult | null> => {
  const result = resultsDataProxy[resultId];
  return new Promise((resolve) => {
    setTimeout(() => resolve(result || null), 500);
  });
};