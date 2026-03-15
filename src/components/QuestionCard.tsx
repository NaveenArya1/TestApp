import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Question, Answer } from '@/types';

interface QuestionCardProps {
  question: Question;
  answer: Answer | undefined;
  onAnswerChange: (questionId: string, selectedOption: number) => void;
  onMarkForReview: (questionId: string, marked: boolean) => void;
}

export function QuestionCard({
  question,
  answer,
  onAnswerChange,
  onMarkForReview,
}: QuestionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Question {question.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{question.question}</p>
        <RadioGroup
          value={answer?.selectedOption?.toString() || ''}
          onValueChange={(value) => onAnswerChange(question.id, parseInt(value))}
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
        <div className="mt-4">
          <Button
            variant={answer?.markedForReview ? 'default' : 'outline'}
            onClick={() => onMarkForReview(question.id, !answer?.markedForReview)}
          >
            {answer?.markedForReview ? 'Marked for Review' : 'Mark for Review'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}