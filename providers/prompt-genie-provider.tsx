'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { PromptGenie } from '@/components/prompt-genie/PromptGenie';

interface PromptGenieContextType {
  isEnabled: boolean;
  enableWidget: () => void;
  disableWidget: () => void;
}

const PromptGenieContext = createContext<PromptGenieContextType>({
  isEnabled: true,
  enableWidget: () => {},
  disableWidget: () => {},
});

export function usePromptGenie() {
  return useContext(PromptGenieContext);
}

interface PromptGenieProviderProps {
  children: ReactNode;
  defaultEnabled?: boolean;
}

export function PromptGenieProvider({
  children,
  defaultEnabled = true,
}: PromptGenieProviderProps) {
  const [isEnabled, setIsEnabled] = useState(defaultEnabled);

  const enableWidget = () => setIsEnabled(true);
  const disableWidget = () => setIsEnabled(false);

  return (
    <PromptGenieContext.Provider
      value={{
        isEnabled,
        enableWidget,
        disableWidget,
      }}
    >
      {children}
      {isEnabled && <PromptGenie />}
    </PromptGenieContext.Provider>
  );
}