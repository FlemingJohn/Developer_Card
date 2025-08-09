
'use client';

import Image from 'next/image';
import { Github, Linkedin, Link as LinkIcon, MessageSquare, Sparkles, Star, GitFork, User, BarChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { eightBitify, EightBitifyOutput } from '@/ai/flows/eight-bit-flow';
import { useToast } from '@/hooks/use-toast';
import { AIChat } from './ai-chat';
import { getGithubRepositories } from '@/services/github';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ProjectCard, Project } from './project-card';
import { PlayerStats } from './player-stats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const devData = {
  name: "Fleming John",
  title: "Polyglot developer",
  bio: "Crafting digital experiences with a retro twist. I turn caffeine into clean, efficient, and visually stunning code. Ready to press start on a new project.",
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Firebase", "Solidity"],
  socials: [
    {
      name: 'GitHub',
      url: 'https://github.com/FlemingJohn',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/fleming-john-0b4ab3263/',
      icon: Linkedin,
    },
    {
      name: 'Portfolio',
      url: '#',
      icon: LinkIcon,
    },
  ],
  stats: {
    frameworks: [
      { name: 'React/Next.js', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'Firebase', level: 80 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Solidity', level: 70 },
    ]
  }
};

export function DevCard() {
  const [bio, setBio] = useState(devData.bio);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoadingProjects(true);
        const userProjects = await getGithubRepositories('FlemingJohn');
        setProjects(userProjects);
      } catch (error) {
        console.error("Failed to fetch projects", error);
        toast({
          title: 'Error',
          description: 'Could not fetch GitHub projects.',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingProjects(false);
      }
    };
    fetchProjects();
  }, [toast]);

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
      <Card className="group relative w-full max-w-4xl overflow-hidden rounded-2xl border-2 border-primary/20 bg-black/50 p-1 shadow-2xl shadow-primary/20 backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-primary/40 scanline">
        <div className="relative z-10 flex flex-col p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-shrink-0 text-center">
              <Image
                src="https://images.unsplash.com/photo-1542410613-d073472c3135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNXx8YmF0bWFufGVufDB8fHx8MTc1NDY0NzgzOXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Developer's profile picture"
                width={128}
                height={128}
                className="rounded-full border-4 border-primary/50 object-cover shadow-lg transition-all duration-300 group-hover:border-accent"
                data-ai-hint="man portrait"
              />
               <h1 className="font-headline text-2xl md:text-3xl font-bold text-primary tracking-tighter mt-4">
                {devData.name}
              </h1>
              <p className="text-md text-accent font-medium">{devData.title}</p>
                 <div className="flex items-center justify-center gap-4 pt-4">
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

            <Tabs defaultValue="player-info" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-black/20 border-primary/20 border">
                <TabsTrigger value="player-info"><User className="w-4 h-4 mr-2"/>Player Info</TabsTrigger>
                <TabsTrigger value="player-stats"><BarChart className="w-4 h-4 mr-2" />Player Stats</TabsTrigger>
              </TabsList>
              <TabsContent value="player-info" className="mt-4 text-left bg-black/20 p-4 rounded-md border border-primary/20">
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
                  <div className="flex flex-wrap gap-2 mt-4">
                    {devData.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="border-primary/30 bg-primary/10 text-accent transition-all duration-200 hover:bg-primary/20 hover:shadow-md hover:shadow-primary/40 hover:scale-110"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
              </TabsContent>
              <TabsContent value="player-stats" className="mt-4 bg-black/20 p-6 rounded-md border border-primary/20">
                <PlayerStats stats={devData.stats} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-8">
             <h2 className="font-headline text-xl text-primary mb-4 text-center">Top Repositories</h2>
             {isLoadingProjects ? (
               <div className="text-center text-accent">Loading projects...</div>
             ) : (
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full"
              >
                <CarouselContent>
                  {projects.map((project) => (
                    <CarouselItem key={project.name} className="md:basis-1/2 lg:basis-1/3">
                       <div className="p-1 h-full">
                        <ProjectCard project={project} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="text-accent border-accent/50 hover:bg-accent/20 hover:text-white" />
                <CarouselNext className="text-accent border-accent/50 hover:bg-accent/20 hover:text-white" />
              </Carousel>
             )}
          </div>
          
           <div className="flex justify-center pt-8">
               <Button onClick={() => setIsChatOpen(true)} size="sm" variant="outline" className="border-primary/30 bg-primary/10 text-accent transition-colors hover:bg-primary/20">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat with my AI assistant
              </Button>
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
