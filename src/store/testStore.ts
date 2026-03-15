import { create } from 'zustand';
import { TestState, Answer, TestResult, Language } from '@/types';
import { submitTest as apiSubmitTest } from '@/api/test.api';

interface TestStore extends TestState {
  resultId?: string;
  setCurrentQuestion: (question: number) => void;
  setAnswer: (questionId: string, selectedOption: number | null) => void;
  markForReview: (questionId: string, marked: boolean) => void;
  setTimeLeft: (time: number) => void;
  setLanguage: (language: Language) => void;
  submitTest: (testId: string) => Promise<string>;
  resetTest: () => void;
}

export const useTestStore = create<TestStore>((set, get) => ({
  currentQuestion: 0,
  answers: {},
  timeLeft: 0,
  isSubmitted: false,
  language: 'en',

  setCurrentQuestion: (question) => set({ currentQuestion: question }),

  setAnswer: (questionId: string, selectedOption: number | null) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: {
          questionId,
          selectedOption,
          markedForReview: state.answers[questionId]?.markedForReview || false,
        },
      },
    })),

  markForReview: (questionId, marked) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: {
          questionId,
          selectedOption: state.answers[questionId]?.selectedOption || null,
          markedForReview: marked,
        },
      },
    })),

  setTimeLeft: (time) => set({ timeLeft: time }),

  setLanguage: (language) => set({ language }),

  submitTest: async (testId: string) => {
    const state = get();
    const answers = Object.values(state.answers);
    const correct = answers.filter(a => a.selectedOption !== null).length; // mock calculation
    const wrong = answers.filter(a => a.selectedOption === null).length;
    const skipped = 0; // mock
    const score = correct * 10; // mock
    const result: TestResult = {
      testId,
      answers,
      score,
      correct,
      wrong,
      skipped,
      timeTaken: 3600 - state.timeLeft, // mock
    };
    const submittedResult = await apiSubmitTest(result);
    set({ isSubmitted: true, resultId: submittedResult.id });
    return submittedResult.id!;
  },

  resetTest: () =>
    set({
      currentQuestion: 0,
      answers: {},
      timeLeft: 0,
      isSubmitted: false,
      resultId: undefined,
      language: 'en',
    }),
}));