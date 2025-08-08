import { DevCard } from '@/components/dev-card';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.1),transparent_70%)]">
      <DevCard />
    </main>
  );
}
