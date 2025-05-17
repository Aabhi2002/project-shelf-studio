
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from '@/components/themes/ThemeProvider';
import ThemePreview from '@/components/themes/ThemePreview';
import { useQuery } from '@tanstack/react-query';
import { getProjectById, trackPageView } from '@/services/projectService';

const ProjectView = () => {
  const { slug } = useParams();
  
  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => getProjectById(slug as string),
  });

  useEffect(() => {
    // Track page view
    if (project?.id) {
      trackPageView(project.id, window.location.pathname);
    }
  }, [project]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-center">Loading project...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p>The project you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="py-8">
        <ThemePreview project={project} />
      </div>
    </ThemeProvider>
  );
};

export default ProjectView;
