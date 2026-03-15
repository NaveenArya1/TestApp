import { useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { useTimerStore } from '@/store/timerStore';

export function Timer() {
  const { timeLeft, isRunning, setTimeLeft } = useTimerStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, setTimeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Badge variant="outline" className="text-lg">
      ⏱ Time Left: {formatTime(timeLeft)}
    </Badge>
  );
}