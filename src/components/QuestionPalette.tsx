import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Answer } from '@/types';

interface QuestionPaletteProps {
  totalQuestions: number;
  answers: Record<string, Answer>;
  currentQuestion: number;
  onQuestionClick: (questionNumber: number) => void;
}

export function QuestionPalette({
  totalQuestions,
  answers,
  currentQuestion,
  onQuestionClick,
}: QuestionPaletteProps) {
  const getStatusColor = (questionId: string) => {
    const answer = answers[questionId];
    if (!answer) return 'gray';
    if (answer.markedForReview) return 'yellow';
    if (answer.selectedOption !== null) return 'green';
    return 'gray';
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Question Palette</h3>
      <ScrollArea className="h-32">
        <div className="grid grid-cols-10 gap-2">
          {Array.from({ length: totalQuestions }, (_, i) => {
            const questionId = `q${i + 1}`;
            const status = getStatusColor(questionId);
            return (
              <Button
                key={i}
                variant={currentQuestion === i ? 'default' : 'outline'}
                size="sm"
                className={`w-8 h-8 p-0 ${
                  status === 'green'
                    ? 'bg-green-500'
                    : status === 'yellow'
                    ? 'bg-yellow-500'
                    : 'bg-gray-500'
                }`}
                onClick={() => onQuestionClick(i)}
              >
                {i + 1}
              </Button>
            );
          })}
        </div>
      </ScrollArea>
      <div className="mt-2 flex space-x-2">
        <Badge variant="secondary">Answered</Badge>
        <Badge variant="outline">Not Visited</Badge>
        <Badge variant="destructive">Review</Badge>
      </div>
    </div>
  );
}