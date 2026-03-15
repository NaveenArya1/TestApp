'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getTestById } from '@/api/test.api';
import { QuestionCard } from '@/components/QuestionCard';
import { QuestionPalette } from '@/components/QuestionPalette';
import { Timer } from '@/components/Timer';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTestStore } from '@/store/testStore';
import { useTimerStore } from '@/store/timerStore';
import { Answer } from '@/types';
import { useRouter } from 'next/navigation';

export default function TestPage() {
  const params = useParams();
  const router = useRouter();

  if (!params || !params.id) {
    return <div>Invalid test ID</div>;
  }

  const id = params.id as string;

  const { data: test, isLoading } = useQuery({
    queryKey: ['test', id],
    queryFn: () => getTestById(id),
  });

  const {
    currentQuestion,
    answers,
    language,
    setCurrentQuestion,
    setAnswer,
    markForReview,
    setLanguage,
  } = useTestStore();

  const { timeLeft, startTimer, resetTimer } = useTimerStore();
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  useEffect(() => {
    if (test) {
      resetTimer(test.duration * 60);
      startTimer();
    }
  }, [test, resetTimer, startTimer]);

  if (isLoading || !test) return <div>Loading...</div>;

  const currentQ = test.questions[currentQuestion];
  if (!currentQ) return <div>Question not found</div>;
  const answeredCount = Object.values(answers).filter(a => a.selectedOption !== null).length;
  const progress = ((currentQuestion + 1) / test.questions.length) * 100;

  const handleAnswerChange = (questionId: string, selectedOption: number) => {
    setAnswer(questionId, selectedOption);
  };

  const handleMarkForReview = (questionId: string, marked: boolean) => {
    markForReview(questionId, marked);
  };

  const handleSubmit = async () => {
    const resultId = await useTestStore.getState().submitTest(id);
    router.push(`/result/${resultId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">{test.name}</h1>
            <div className="flex items-center gap-4">
              <LanguageSelector
                selectedLanguage={language}
                onLanguageChange={setLanguage}
              />
              <Timer />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Progress value={progress} className="mb-4" />
        <p className="text-center mb-6">Question {currentQuestion + 1} / {test.questions.length}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <QuestionCard
              question={currentQ}
              answer={answers[currentQ.id]}
              language={language}
              onAnswerChange={handleAnswerChange}
              onMarkForReview={handleMarkForReview}
            />
            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(Math.min(test.questions.length - 1, currentQuestion + 1))}
                disabled={currentQuestion === test.questions.length - 1}
              >
                Next
              </Button>
            </div>
          </div>

          <div>
            <QuestionPalette
              totalQuestions={test.questions.length}
              answers={answers}
              currentQuestion={currentQuestion}
              onQuestionClick={setCurrentQuestion}
            />
            <Button
              className="w-full mt-4"
              onClick={() => setShowSubmitDialog(true)}
            >
              Submit Test
            </Button>
          </div>
        </div>
      </main>

      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Test?</DialogTitle>
            <DialogDescription>
              Answered: {answeredCount}<br />
              Not Answered: {test.questions.length - answeredCount}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}