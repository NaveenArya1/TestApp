import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Objective Test Book</h1>
          <nav className="space-x-4">
            <Button variant="ghost">Home</Button>
            <Button variant="ghost">Tests</Button>
          </nav>
        </div>
      </div>
    </header>
  );
}