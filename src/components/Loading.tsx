import { Loader2 } from 'lucide-react';

interface LoadingProps {
  message?: string;
}

export function Loading({ message = 'Loading...' }: LoadingProps) {
  return (
    <div className="flex items-center justify-center min-h-50">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}