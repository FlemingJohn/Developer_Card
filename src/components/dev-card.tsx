import Image from 'next/image';
import { Github, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const devData = {
  name: "Alex 'Arcade' Doe",
  title: "Pixel-Perfect Full-Stack Developer",
  bio: "Crafting digital experiences with a retro twist. I turn caffeine into clean, efficient, and visually stunning code. Ready to press start on a new project.",
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Firebase", "Solidity"],
  socials: [
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: Linkedin,
    },
    {
      name: 'Portfolio',
      url: '#',
      icon: LinkIcon,
    },
  ],
};

export function DevCard() {
  return (
    <Card className="group relative w-full max-w-4xl overflow-hidden rounded-2xl border-2 border-primary/20 bg-black/50 p-1 shadow-2xl shadow-primary/20 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/40 scanline">
      <div className="relative z-10 flex flex-col items-center gap-6 p-6 text-center text-foreground md:flex-row md:p-8 md:text-left md:gap-8">
        <div className="flex-shrink-0">
          <Image
            src="https://placehold.co/128x128.png"
            alt="Developer's profile picture"
            width={128}
            height={128}
            className="rounded-full border-4 border-primary/50 object-cover shadow-lg transition-all duration-300 group-hover:border-accent"
            data-ai-hint="man portrait"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="font-headline text-2xl md:text-3xl font-bold text-primary tracking-tighter">
              {devData.name}
            </h1>
            <p className="text-md text-accent font-medium">{devData.title}</p>
          </div>

          <p className="text-sm text-foreground/80 max-w-lg">{devData.bio}</p>

          <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            {devData.skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="border-primary/30 bg-primary/10 text-accent transition-colors hover:bg-primary/20"
              >
                {skill}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-4 pt-2 md:justify-start">
            {devData.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-foreground/70 transition-colors hover:text-accent"
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
