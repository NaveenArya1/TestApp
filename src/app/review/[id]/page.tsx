'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useReviewsStore } from '@/store/reviewsStore';
import { useQuery } from '@tanstack/react-query';
import { getResult, getTestById } from '@/api/test.api';

export default function ReviewPage() {
  const params = useParams();
  const resultId = params?.id as string;

  if (!resultId) {
    return <div>Invalid result ID</div>;
  }

  const { data: result, isLoading: loadingResult } = useQuery({
    queryKey: ['result', resultId],
    queryFn: () => getResult(resultId),
  });

  const { data: test, isLoading: loadingTest } = useQuery({
    queryKey: ['test', result?.testId],
    queryFn: () => getTestById(result!.testId),
    enabled: !!result,
  });

  const { getReview, addReview, updateQuestionReview } = useReviewsStore();

  if (loadingResult || loadingTest || !result || !test) return <div>Loading...</div>;

  const existingReview = getReview(result.testId, resultId);

  const [overallReview, setOverallReview] = useState(existingReview?.overallReview || '');
  const [questionReviews, setQuestionReviews] = useState<Record<string, string>>(
    existingReview?.questionReviews.reduce((acc, qr) => ({ ...acc, [qr.questionId]: qr.review }), {}) || {}
  );

  const handleSaveReview = () => {
    const review: any = {
      testId: result.testId,
      attemptId: resultId,
      overallReview,
      questionReviews: Object.entries(questionReviews).map(([questionId, review]) => ({ questionId, review })),
      date: new Date().toISOString(),
    };
    if (existingReview) {
      addReview(review);
    } else {
      addReview(review);
    }
    alert('Review saved!');
  };

  const handleQuestionReviewChange = (questionId: string, review: string) => {
    setQuestionReviews(prev => ({ ...prev, [questionId]: review }));
    updateQuestionReview(result.testId, resultId, questionId, review);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Answer Review</h1>

        {/* Overall Review */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Overall Review</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="overall">Your feedback on this test:</Label>
            <Textarea
              id="overall"
              value={overallReview}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setOverallReview(e.target.value)}
              placeholder="Enter your overall review..."
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Accordion type="single" collapsible className="space-y-4">
          {test.questions.map((q, index) => {
            const userAnswer = result.answers.find(a => a.questionId === q.id);
            return (
              <AccordionItem key={q.id} value={q.id}>
                <AccordionTrigger>
                  <div className="flex items-center space-x-4">
                    <span>Question {index + 1}</span>
                    <Badge variant={userAnswer?.selectedOption === q.correctAnswer ? 'default' : 'destructive'}>
                      {userAnswer?.selectedOption === q.correctAnswer ? 'Correct' : 'Wrong'}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardHeader>
                      <CardTitle>{q.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p><strong>Your Answer:</strong> {userAnswer?.selectedOption !== null && userAnswer?.selectedOption !== undefined ? q.options[userAnswer.selectedOption] : 'Not answered'}</p>
                      <p><strong>Correct Answer:</strong> {q.options[q.correctAnswer]}</p>
                      <Separator className="my-4" />
                      <p><strong>Explanation:</strong> {q.explanation}</p>
                      <Separator className="my-4" />
                      <Label htmlFor={`review-${q.id}`}>Your review for this question:</Label>
                      <Textarea
                        id={`review-${q.id}`}
                        value={questionReviews[q.id] || ''}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleQuestionReviewChange(q.id, e.target.value)}
                        placeholder="Enter your review for this question..."
                        className="mt-2"
                      />
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        <div className="mt-6 text-center">
          <Button onClick={handleSaveReview}>Save Review</Button>
        </div>
      </main>
    </div>
  );
}