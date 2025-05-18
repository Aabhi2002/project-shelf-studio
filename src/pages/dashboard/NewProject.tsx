import React from 'react';
import { ProjectEditorWithTheme } from '@/components/projects/ProjectEditor';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { ThemeProvider } from '@/components/themes/ThemeProvider';

const NewProject = () => {
  useRequireAuth();
  return (
    <ThemeProvider>
      <div className="bg-gradient-to-br from-projectshelf-secondary to-white p-4 md:p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-projectshelf-primary">Create New Project</h1>
        <ProjectEditorWithTheme />
      </div>
    </ThemeProvider>
  );
};

export default NewProject;
