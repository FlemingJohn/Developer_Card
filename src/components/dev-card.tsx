
'use client';

import Image from 'next/image';
import { Github, Linkedin, Link as LinkIcon, MessageSquare, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { Button } from './ui/button';
import { eightBitify, EightBitifyOutput } from '@/ai/flows/eight-bit-flow';
import { useToast } from '@/hooks/use-toast';
import { AIChat } from './ai-chat';

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
  const [bio, setBio] = useState(devData.bio);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { toast } = useToast();

  const handleEightBitify = async () => {
    setIsGenerating(true);
    try {
      const result: EightBitifyOutput = await eightBitify({ text: devData.bio });
      setBio(result.text);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not generate 8-bit bio. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Card className="group relative w-full max-w-4xl overflow-hidden rounded-2xl border-2 border-primary/20 bg-black/50 p-1 shadow-2xl shadow-primary/20 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/40 scanline">
        <div className="relative z-10 flex flex-col items-center gap-6 p-6 text-center text-foreground md:flex-row md:p-8 md:text-left md:gap-8">
          <div className="flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxtYW58ZW58MHx8fHwxNzU0NjI4MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080"
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
            
            <div className="relative">
              <p className="text-sm text-foreground/80 max-w-lg">{bio}</p>
              <Button
                size="icon"
                variant="ghost"
                className="absolute -top-2 -right-2 h-7 w-7 text-accent/80 hover:text-accent hover:bg-white/10"
                onClick={handleEightBitify}
                disabled={isGenerating}
                title="8-Bit My Bio"
              >
                <Sparkles className={`transition-transform duration-500 ${isGenerating ? 'animate-spin' : ''}`} />
              </Button>
            </div>


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
            
            <div className="flex items-center justify-center gap-2 pt-2 md:justify-start">
               <Button onClick={() => setIsChatOpen(true)} size="sm" variant="outline" className="border-primary/30 bg-primary/10 text-accent transition-colors hover:bg-primary/20">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat with my AI assistant
              </Button>
              <div className="flex items-center gap-4">
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
        </div>
      </Card>
      <AIChat 
        open={isChatOpen} 
        onOpenChange={setIsChatOpen}
        devData={devData}
      />
    </>
  );
}
