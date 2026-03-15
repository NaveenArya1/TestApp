'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTests, getDynamicTests } from '@/api/test.api';
import { TestCard } from '@/components/TestCard';
import { Loading } from '@/components/Loading';
import { Test, DynamicTest } from '@/types';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/Header';
import { Separator } from '@/components/ui/separator';

export default function TestsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: tests, isLoading: loadingTests, error: errorTests } = useQuery({
    queryKey: ['tests'],
    queryFn: getTests,
  });

  const { data: dynamicTests, isLoading: loadingDynamic, error: errorDynamic } = useQuery({
    queryKey: ['dynamicTests'],
    queryFn: getDynamicTests,
  });

  if (loadingTests || loadingDynamic) return <Loading message="Loading tests..." />;
  if (errorTests || errorDynamic) return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Tests</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </main>
    </div>
  );

  const allTests = [...(tests || []), ...(dynamicTests || [])];
  const filteredTests = allTests.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Available Tests</h1>
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search tests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <Separator className="mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
        {filteredTests.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No tests found matching your search.</p>
        )}
      </main>
    </div>
  );
}