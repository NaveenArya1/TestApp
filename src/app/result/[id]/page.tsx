'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getResult } from '@/api/test.api';
import { ResultCard } from '@/components/ResultCard';
import { Header } from '@/components/Header';

export default function ResultPage() {
  const params = useParams();
  const resultId = params?.id as string;

  if (!resultId) {
    return <div>Invalid result ID</div>;
  }

  const { data: result, isLoading } = useQuery({
    queryKey: ['result', resultId],
    queryFn: () => getResult(resultId),
  });

  if (isLoading || !result) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ResultCard result={result} />
      </main>
    </div>
  );
}