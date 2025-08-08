
'use client';
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { askAssistant, AskAssistantInput, AskAssistantOutput } from '@/ai/flows/assistant-flow';
import { Bot, Send, User, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  devData: any;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIChat({ open, onOpenChange, devData }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    const question = input;
    setInput('');
    setIsLoading(true);

    try {
      const assistantInput: AskAssistantInput = {
        question,
        context: JSON.stringify(devData, null, 2),
      };
      const result: AskAssistantOutput = await askAssistant(assistantInput);
      
      setMessages([...newMessages, { role: 'assistant', content: result.answer }]);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to get response from AI assistant.',
        variant: 'destructive',
      });
       setMessages([...newMessages, { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg bg-background/90 backdrop-blur-xl border-primary/20">
        <SheetHeader>
          <SheetTitle className="text-primary">AI Assistant</SheetTitle>
          <SheetDescription className="text-accent">
            Ask me anything about {devData.name.split(' ')[0]}.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 p-4 my-4 border rounded-md border-primary/20 bg-black/20">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                {message.role === 'assistant' && <Bot className="w-6 h-6 text-primary flex-shrink-0" />}
                <div className={`p-3 rounded-lg max-w-xs lg:max-w-md ${
                    message.role === 'user'
                      ? 'bg-primary/20 text-accent'
                      : 'bg-foreground/10 text-foreground/90'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.role === 'user' && <User className="w-6 h-6 text-accent flex-shrink-0" />}
              </div>
            ))}
             {isLoading && (
              <div className="flex items-start gap-3">
                <Bot className="w-6 h-6 text-primary flex-shrink-0" />
                <div className="p-3 rounded-lg bg-foreground/10">
                  <Loader className="w-5 h-5 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="e.g., What are your top skills?"
            disabled={isLoading}
            className="bg-black/20 border-primary/20 focus-visible:ring-accent"
          />
          <Button onClick={handleSend} disabled={isLoading} size="icon" className="flex-shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
