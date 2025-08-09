
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GitFork, Star } from 'lucide-react';

export interface Project {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks?: number; // Optional, as it's not in the current service
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className="h-full block">
      <Card className="h-full bg-foreground/5 hover:bg-foreground/10 border-primary/20 transition-all duration-300 flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg text-primary">{project.name}</CardTitle>
          <CardDescription className="text-accent/80 flex-grow">{project.description || 'No description available.'}</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto flex items-center gap-4 text-xs text-foreground/70">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{project.stars}</span>
          </div>
          {project.forks !== undefined && (
            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4 text-gray-400" />
              <span>{project.forks}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </a>
  );
}
