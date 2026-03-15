import { Test, TestResult, DynamicTest, Question, TestReview } from '@/types';
import questionBank from '@/data/qadata';
import { resultsDataProxy, reviewsDataProxy } from '@/data/resultdata';

// Generate tests from questionBank categories
const generateTestsFromQuestionBank = (): Test[] => {
  const tests: Test[] = [];
  const categories = Object.keys(questionBank);

  // Create individual category tests
  categories.forEach((category, index) => {
    const questions = questionBank[category];
    if (questions && questions.length > 0) {
      const testId = `test_${category}_${index + 1}`;
      const testName = `${category.charAt(0).toUpperCase() + category.slice(1)} Test`;
      const testDescription = `Test your knowledge in ${category} with ${questions.length} questions.`;

      tests.push({
        id: testId,
        name: testName,
        description: testDescription,
        questions: [...questions], // Use all questions from the category
        duration: Math.max(10, Math.ceil(questions.length * 1.5)), // 1.5 minutes per question, minimum 10 minutes
        totalQuestions: questions.length,
      });
    }
  });

  // Create mixed tests
  if (categories.length >= 2) {
    const mixedQuestions: Question[] = [];
    categories.forEach(category => {
      const categoryQuestions = questionBank[category];
      if (categoryQuestions && categoryQuestions.length > 0) {
        // Take up to 3 questions from each category for mixed test
        const questionsToTake = Math.min(3, categoryQuestions.length);
        mixedQuestions.push(...categoryQuestions.slice(0, questionsToTake));
      }
    });

    if (mixedQuestions.length > 0) {
      tests.push({
        id: 'test_mixed_1',
        name: 'Mixed Knowledge Test',
        description: 'A comprehensive test covering multiple subjects.',
        questions: mixedQuestions,
        duration: Math.max(15, Math.ceil(mixedQuestions.length * 2)), // 2 minutes per question for mixed
        totalQuestions: mixedQuestions.length,
      });
    }
  }

  return tests;
};

// Generate dynamic tests based on available categories
const generateDynamicTestsFromQuestionBank = (): DynamicTest[] => {
  const dynamicTests: DynamicTest[] = [];
  const categories = Object.keys(questionBank);

  // Create dynamic tests for each category
  categories.forEach((category, index) => {
    const questions = questionBank[category];
    if (questions && questions.length > 0) {
      dynamicTests.push({
        id: `dynamic_${category}_${index + 1}`,
        name: `Dynamic ${category.charAt(0).toUpperCase() + category.slice(1)} Test`,
        description: `Random questions from ${category} category.`,
        categories: { [category]: Math.min(10, questions.length) }, // Up to 10 questions
        duration: Math.max(10, Math.ceil(Math.min(10, questions.length) * 1.5)),
      });
    }
  });

  // Create mixed dynamic test
  if (categories.length >= 2) {
    const mixedCategories: { [category: string]: number } = {};
    categories.forEach(category => {
      const questions = questionBank[category];
      if (questions && questions.length > 0) {
        mixedCategories[category] = Math.min(5, questions.length); // 5 questions from each category
      }
    });

    if (Object.keys(mixedCategories).length > 0) {
      const totalQuestions = Object.values(mixedCategories).reduce((sum, count) => sum + count, 0);
      dynamicTests.push({
        id: 'dynamic_mixed_1',
        name: 'Dynamic Mixed Test',
        description: 'Random questions from all available categories.',
        categories: mixedCategories,
        duration: Math.max(15, Math.ceil(totalQuestions * 1.5)),
      });
    }
  }

  return dynamicTests;
};

// Cache generated tests
let cachedTests: Test[] | null = null;
let cachedDynamicTests: DynamicTest[] | null = null;

export const getTests = async (): Promise<Test[]> => {
  if (!cachedTests) {
    cachedTests = generateTestsFromQuestionBank();
  }
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(cachedTests!), 300);
  });
};

export const getDynamicTests = async (): Promise<DynamicTest[]> => {
  if (!cachedDynamicTests) {
    cachedDynamicTests = generateDynamicTestsFromQuestionBank();
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(cachedDynamicTests!), 300);
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
  // Ensure tests are generated
  if (!cachedTests) {
    cachedTests = generateTestsFromQuestionBank();
  }
  if (!cachedDynamicTests) {
    cachedDynamicTests = generateDynamicTestsFromQuestionBank();
  }

  // First check regular tests
  let test = cachedTests.find((t) => t.id === id);
  if (!test) {
    // Check dynamic tests and generate if found
    const dynamicTest = cachedDynamicTests.find((t) => t.id === id);
    if (dynamicTest) {
      test = await generateTestFromDynamic(dynamicTest);
    }
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(test || null), 300);
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
    setTimeout(() => resolve(result || null), 200);
  });
};

export const getAllResults = async (): Promise<TestResult[]> => {
  const results = Object.values(resultsDataProxy);
  return new Promise((resolve) => {
    setTimeout(() => resolve(results), 200);
  });
};

export const getResultsByTestId = async (testId: string): Promise<TestResult[]> => {
  const results = Object.values(resultsDataProxy).filter(result => result.testId === testId);
  return new Promise((resolve) => {
    setTimeout(() => resolve(results), 200);
  });
};

export const deleteResult = async (resultId: string): Promise<boolean> => {
  if (resultsDataProxy[resultId]) {
    delete resultsDataProxy[resultId];
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 200);
    });
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(false), 200);
  });
};

// Question bank utilities
export const getAvailableCategories = async (): Promise<string[]> => {
  const categories = Object.keys(questionBank);
  return new Promise((resolve) => {
    setTimeout(() => resolve(categories), 100);
  });
};

export const getQuestionsByCategory = async (category: string): Promise<Question[]> => {
  const questions = questionBank[category] || [];
  return new Promise((resolve) => {
    setTimeout(() => resolve([...questions]), 200);
  });
};

export const getQuestionStats = async (): Promise<{ [category: string]: number }> => {
  const stats: { [category: string]: number } = {};
  Object.keys(questionBank).forEach(category => {
    stats[category] = questionBank[category].length;
  });
  return new Promise((resolve) => {
    setTimeout(() => resolve(stats), 100);
  });
};

// Review-related API functions
export const getReview = async (resultId: string): Promise<TestReview | null> => {
  const review = reviewsDataProxy[resultId];
  return new Promise((resolve) => {
    setTimeout(() => resolve(review || null), 200);
  });
};

export const getAllReviews = async (): Promise<TestReview[]> => {
  const reviews = Object.values(reviewsDataProxy);
  return new Promise((resolve) => {
    setTimeout(() => resolve(reviews), 200);
  });
};

export const saveReview = async (review: TestReview): Promise<TestReview> => {
  reviewsDataProxy[review.attemptId] = review;
  return new Promise((resolve) => {
    setTimeout(() => resolve(review), 200);
  });
};

export const deleteReview = async (resultId: string): Promise<boolean> => {
  if (reviewsDataProxy[resultId]) {
    delete reviewsDataProxy[resultId];
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 200);
    });
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(false), 200);
  });
};