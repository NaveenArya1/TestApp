import { create } from 'zustand';
import { TestReview, QuestionReview } from '@/types';
import { reviewsDataProxy } from '@/data/resultdata';

interface ReviewsStore {
  addReview: (review: TestReview) => void;
  getReview: (testId: string, resultId: string) => TestReview | undefined;
  updateQuestionReview: (testId: string, resultId: string, questionId: string, review: string) => void;
}

export const useReviewsStore = create<ReviewsStore>((set, get) => ({
  addReview: (review) => {
    reviewsDataProxy[review.attemptId] = review;
  },

  getReview: (testId, resultId) => {
    return reviewsDataProxy[resultId];
  },

  updateQuestionReview: (testId, resultId, questionId, review) => {
    const existing = reviewsDataProxy[resultId];
    if (existing) {
      const qrIndex = existing.questionReviews.findIndex(qr => qr.questionId === questionId);
      if (qrIndex >= 0) {
        existing.questionReviews[qrIndex].review = review;
      } else {
        existing.questionReviews.push({ questionId, review });
      }
    }
  },
}));