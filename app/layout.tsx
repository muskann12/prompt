import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PromptGenieProvider } from '@/providers/prompt-genie-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PromptGenie - Roman Urdu to English Prompt Converter',
  description: 'Convert Roman Urdu ideas into professional English prompts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PromptGenieProvider>
          {children}
        </PromptGenieProvider>
      </body>
    </html>
  );
}