
import React from 'react';
import { useParams } from 'react-router-dom';
import { ProjectEditorWithTheme } from '@/components/projects/ProjectEditor';
import { useRequireAuth } from '@/hooks/useRequireAuth';

const ProjectDetail = () => {
  const { id } = useParams();
  useRequireAuth();
  
  return <ProjectEditorWithTheme projectId={id} />;
};

export default ProjectDetail;
