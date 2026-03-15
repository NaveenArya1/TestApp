export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Test {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  duration: number; // in minutes
  totalQuestions: number;
}

export interface DynamicTest {
  id: string;
  name: string;
  description: string;
  categories: { [category: string]: number }; // category to number of questions
  duration: number; // in minutes
}

export interface Answer {
  questionId: string;
  selectedOption: number | null;
  markedForReview: boolean;
}

export interface QuestionReview {
  questionId: string;
  review: string; // user's comment or note on the question
}

export interface TestReview {
  testId: string;
  attemptId: string; // unique id for each attempt
  overallReview: string; // overall feedback
  questionReviews: QuestionReview[];
  date: string;
}

export interface TestResult {
  id?: string; // unique result ID
  testId: string;
  answers: Answer[];
  score: number;
  correct: number;
  wrong: number;
  skipped: number;
  timeTaken: number;
  review?: TestReview;
}

export interface TestState {
  currentQuestion: number;
  answers: Record<string, Answer>;
  timeLeft: number;
  isSubmitted: boolean;
}