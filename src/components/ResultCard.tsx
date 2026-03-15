import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TestResult } from '@/types';
import Link from 'next/link';

interface ResultCardProps {
  result: TestResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const percentage = (result.score / (result.correct + result.wrong + result.skipped)) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <div className="text-4xl font-bold">{result.score}</div>
          <div className="text-gray-500">out of {result.correct + result.wrong + result.skipped}</div>
        </div>
        <Progress value={percentage} className="mb-4" />
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Correct:</span>
            <Badge variant="default">{result.correct}</Badge>
          </div>
          <div className="flex justify-between">
            <span>Wrong:</span>
            <Badge variant="destructive">{result.wrong}</Badge>
          </div>
          <div className="flex justify-between">
            <span>Skipped:</span>
            <Badge variant="secondary">{result.skipped}</Badge>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link href={`/review/${result.id}`}>
            <Button variant="outline">Review Answers</Button>
          </Link>
          <Link href="/tests">
            <Button>Start New Test</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}