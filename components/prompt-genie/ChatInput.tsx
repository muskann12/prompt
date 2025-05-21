'use client';

import { useState, useRef, FormEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };
  
  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setMessage(textarea.value);
    
    // Reset height to calculate new height
    textarea.style.height = 'auto';
    // Set new height
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-end border-t bg-card/80 backdrop-blur-sm p-4 rounded-b-lg"
    >
      <div className="relative flex-grow">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaChange}
          placeholder="Type your message in Roman Urdu..."
          className="w-full resize-none bg-background py-3 px-4 pr-12 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-sm min-h-[52px] max-h-[120px]"
          rows={1}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="absolute right-2 bottom-2 p-2 text-primary hover:text-primary/80 disabled:text-muted-foreground disabled:hover:text-muted-foreground transition-colors rounded-full"
        >
          <Send size={20} className={isLoading ? 'opacity-50' : ''} />
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </form>
  );
}