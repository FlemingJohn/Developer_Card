import { DevCard } from '@/components/dev-card';
import { ParticlesBackground } from '@/components/particles-background';

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center p-4 overflow-hidden">
      <ParticlesBackground />
      <div className="z-10">
        <DevCard />
      </div>
    </main>
  );
}
