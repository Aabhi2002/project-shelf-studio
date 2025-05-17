
import React from 'react';
import { useParams } from 'react-router-dom';
import { ProjectEditorWithTheme } from '@/components/projects/ProjectEditor';
import { useRequireAuth } from '@/hooks/useRequireAuth';

const ProjectDetail = () => {
  const { id } = useParams();
  useRequireAuth();
  
  // The ProjectEditorWithTheme component accepts projectId as a prop
  // but needs to be explicitly typed
  return id ? <ProjectEditorWithTheme projectId={id} /> : null;
};

export default ProjectDetail;
