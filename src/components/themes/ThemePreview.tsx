import React from 'react';
import { Project } from '@/types/project';
import { useTheme, ThemeName } from './ThemeProvider';
import MinimalistTheme from './MinimalistTheme';
import BoldTheme from './BoldTheme';
import ElegantTheme from './ElegantTheme';

interface ThemePreviewProps {
  project: Partial<Project>;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ project }) => {
  const { currentTheme } = useTheme();
  
  const renderTheme = (theme: ThemeName) => {
    switch (theme) {
      case 'minimalist':
        return <MinimalistTheme project={project} />;
      case 'bold':
        return <BoldTheme project={project} />;
      case 'elegant':
        return <ElegantTheme project={project} />;
      default:
        return <MinimalistTheme project={project} />;
    }
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg">
      {renderTheme(currentTheme)}
    </div>
  );
};

export default ThemePreview;
