import React from 'react';
import { useParams } from 'react-router-dom';
import { ProjectEditorWithTheme } from '@/components/projects/ProjectEditor';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { ThemeProvider } from '@/components/themes/ThemeProvider';

const ProjectDetail = () => {
  const { id } = useParams();
  useRequireAuth();
  
  return id ? (
    <ThemeProvider>
      <div className="bg-gradient-to-br from-projectshelf-secondary to-white p-4 md:p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-projectshelf-primary">Edit Project</h1>
        <ProjectEditorWithTheme projectId={id} />
      </div>
    </ThemeProvider>
  ) : null;
};

export default ProjectDetail;
