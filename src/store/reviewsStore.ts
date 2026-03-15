import { create } from 'zustand';
import { TestReview, QuestionReview } from '@/types';
import { saveReview, getReview as apiGetReview } from '@/api/test.api';

interface ReviewsStore {
  addReview: (review: TestReview) => Promise<void>;
  getReview: (testId: string, resultId: string) => Promise<TestReview | undefined>;
  updateQuestionReview: (testId: string, resultId: string, questionId: string, review: string) => Promise<void>;
}

export const useReviewsStore = create<ReviewsStore>((set, get) => ({
  addReview: async (review) => {
    await saveReview(review);
  },

  getReview: async (testId, resultId) => {
    const review = await apiGetReview(resultId);
    return review || undefined;
  },

  updateQuestionReview: async (testId, resultId, questionId, review) => {
    const existing = await apiGetReview(resultId);
    if (existing) {
      const qrIndex = existing.questionReviews.findIndex(qr => qr.questionId === questionId);
      if (qrIndex >= 0) {
        existing.questionReviews[qrIndex].review = review;
      } else {
        existing.questionReviews.push({ questionId, review });
      }
      await saveReview(existing);
    }
  },
}));