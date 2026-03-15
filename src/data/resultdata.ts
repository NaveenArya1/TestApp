// resultdata.ts - Stores test results and review data
import { TestResult, TestReview } from '@/types';

const STORAGE_KEYS = {
  RESULTS: 'testResults',
  REVIEWS: 'testReviews',
};

const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = <T>(key: string, data: T) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

const resultsData: Record<string, TestResult> = loadFromStorage(STORAGE_KEYS.RESULTS, {});
const reviewsData: Record<string, TestReview> = loadFromStorage(STORAGE_KEYS.REVIEWS, {});

// Proxy to auto-save on changes
const createAutoSaveProxy = <T extends Record<string, any>>(data: T, storageKey: string): T => {
  return new Proxy(data, {
    set(target, property, value) {
      target[property as keyof T] = value;
      saveToStorage(storageKey, target);
      return true;
    },
    deleteProperty(target, property) {
      delete target[property as keyof T];
      saveToStorage(storageKey, target);
      return true;
    },
  });
};

export const resultsDataProxy = createAutoSaveProxy(resultsData, STORAGE_KEYS.RESULTS);
export const reviewsDataProxy = createAutoSaveProxy(reviewsData, STORAGE_KEYS.REVIEWS);