import { DevCard } from '@/components/dev-card';

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center p-4 overflow-hidden">
      <div className="z-10 animate-fade-in-scale">
        <DevCard />
      </div>
    </main>
  );
}
