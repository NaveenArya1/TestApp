import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Objective Test Book</h1>
          <p className="text-xl text-gray-600">Practice MCQ Tests</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quantitative Aptitude</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Practice math and logic problems</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>English</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Improve your language skills</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Reasoning</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Logical and analytical reasoning</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/tests">
            <Button size="lg">Start Practice</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
