'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ResultPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to tests page if someone lands here directly
    const timer = setTimeout(() => {
      router.push('/tests');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Result Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Please access your test results through the proper link after completing a test.
            </p>
            <Button onClick={() => router.push('/tests')} className="w-full">
              Go to Tests
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}