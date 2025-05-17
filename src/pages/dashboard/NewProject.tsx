
import React from 'react';
import { ProjectEditorWithTheme } from '@/components/projects/ProjectEditor';
import { useRequireAuth } from '@/hooks/useRequireAuth';

const NewProject = () => {
  useRequireAuth();
  return <ProjectEditorWithTheme />;
};

export default NewProject;
