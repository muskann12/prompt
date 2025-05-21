'use client';

import { cn } from '@/lib/utils';

export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      'flex w-full mb-4',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      <div className={cn(
        'max-w-[80%] px-4 py-3 rounded-2xl',
        isUser 
          ? 'bg-primary text-primary-foreground rounded-br-none' 
          : 'bg-muted text-foreground rounded-bl-none'
      )}>
        <p className="text-sm leading-relaxed break-words">{message.content}</p>
        <div className={cn(
          'text-xs mt-1 opacity-70',
          isUser ? 'text-right' : 'text-left'
        )}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
}