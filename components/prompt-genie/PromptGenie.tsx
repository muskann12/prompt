'use client';

import { useState, useEffect } from 'react';
import { ChatButton } from './ChatButton';
import { ChatInterface } from './ChatInterface';
import { Message } from './ChatMessage';
import { convertRomanUrduToEnglishPrompt } from '@/lib/prompt-genie/api';
import { cn } from '@/lib/utils';

export function PromptGenie() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Toggle chat open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Handle sending a new message
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Convert Roman Urdu to English prompt
      const response = await convertRomanUrduToEnglishPrompt(content);

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.englishPrompt,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      console.error('Error in prompt conversion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Interface */}
      <div 
        className={cn(
          'mb-4 w-80 sm:w-96 h-[500px] max-h-[70vh] transition-all duration-300 transform',
          isOpen 
            ? 'scale-100 opacity-100' 
            : 'scale-95 opacity-0 pointer-events-none'
        )}
      >
        <ChatInterface 
          messages={messages} 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading} 
        />
      </div>

      {/* Chat Button */}
      <ChatButton isOpen={isOpen} onClick={toggleChat} />
    </div>
  );
}