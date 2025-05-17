
import React from 'react';
import { useParams } from 'react-router-dom';
import { ProjectEditorWithTheme } from '@/components/projects/ProjectEditor';

const ProjectDetail = () => {
  const { id } = useParams();
  
  return <ProjectEditorWithTheme />;
};

export default ProjectDetail;
