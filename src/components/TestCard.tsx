import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Test, DynamicTest } from '@/types';
import Link from 'next/link';

interface TestCardProps {
  test: Test | DynamicTest;
}

export function TestCard({ test }: TestCardProps) {
  const totalQuestions = 'totalQuestions' in test ? test.totalQuestions : Object.values(test.categories).reduce((sum, count) => sum + count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{test.name}</CardTitle>
        <CardDescription>{test.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary">
            {totalQuestions} Questions
          </Badge>
          <Badge variant="outline">
            {test.duration} Minutes
          </Badge>
        </div>
        <Link href={`/tests/${test.id}`}>
          <Button className="w-full">Start Test</Button>
        </Link>
      </CardContent>
    </Card>
  );
}