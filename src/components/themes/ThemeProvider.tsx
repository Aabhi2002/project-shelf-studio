import React, { createContext, useContext, useState } from 'react';

export type ThemeName = 'minimalist' | 'bold' | 'elegant' | 'gray' | 'gradient';

interface ThemeContextType {
  currentTheme: ThemeName;
  setCurrentTheme: (theme: ThemeName) => void;
  isPreviewMode: boolean;
  setPreviewMode: (isPreview: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('minimalist');
  const [isPreviewMode, setPreviewMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, isPreviewMode, setPreviewMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
