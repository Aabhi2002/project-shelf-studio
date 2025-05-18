import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LayoutGrid, List, Plus, Search, Eye, ArrowRight, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getProjects, deleteProject } from '@/services/projectService';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Project } from '@/types/project';

const Projects = () => {
  useRequireAuth();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();

  const {
    data: projects,
    isLoading,
    error
  } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: 'Project deleted',
        description: 'The project has been successfully deleted.',
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete the project.',
      });
    }
  });

  const handleDeleteProject = (projectId: string) => {
    deleteMutation.mutate(projectId);
  };

  const filteredProjects = projects 
    ? projects.filter(project => 
        project.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-projectshelf-primary">Projects</h1>
          <p className="text-gray-600">Manage your portfolio projects and case studies</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/dashboard/projects/new">
            <Button className="bg-projectshelf-accent hover:bg-projectshelf-accent/90">
              <Plus className="h-4 w-4 mr-2" /> New Project
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'} 
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'} 
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading projects...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">Failed to load projects. Please try again.</p>
          <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['projects'] })}>Retry</Button>
        </div>
      )}

      {!isLoading && !error && filteredProjects.length === 0 && (
        <div className="text-center py-12">
          {searchQuery ? (
            <>
              <p className="text-gray-500 mb-4">No projects found matching your search criteria.</p>
              <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
            </>
          ) : (
            <>
              <p className="text-gray-500 mb-4">You haven't created any projects yet.</p>
              <Link to="/dashboard/projects/new">
                <Button>Create Your First Project</Button>
              </Link>
            </>
          )}
        </div>
      )}

      {!isLoading && !error && filteredProjects.length > 0 && viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project: any) => (
            <Card key={project.id} className="overflow-hidden">
              <div 
                className="h-48 bg-cover bg-center" 
                style={{ backgroundImage: project.cover_image ? `url(${project.cover_image})` : 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158)' }}
              ></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>Updated {new Date(project.updated_at).toLocaleDateString()}</CardDescription>
                  </div>
                  {project.status === 'draft' && (
                    <div className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-md">
                      Draft
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-gray-600 line-clamp-2">{project.description || 'No description provided'}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link to={`/dashboard/projects/${project.id}`} className="flex-1">
                  <Button variant="ghost" className="w-full justify-between">
                    Edit <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your project and all of its data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteProject(project.id)} className="bg-red-600 hover:bg-red-700">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && !error && filteredProjects.length > 0 && viewMode === 'list' && (
        <div className="space-y-4">
          {filteredProjects.map((project: any) => (
            <div 
              key={project.id} 
              className="flex flex-col md:flex-row gap-4 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div 
                className="w-full md:w-32 h-24 bg-cover bg-center rounded-md flex-shrink-0" 
                style={{ backgroundImage: project.cover_image ? `url(${project.cover_image})` : 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158)' }}
              ></div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{project.title}</h3>
                  {project.status === 'draft' && (
                    <div className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-md">
                      Draft
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-sm mt-1">{project.description || 'No description provided'}</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-gray-500">
                    Updated {new Date(project.updated_at).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/dashboard/projects/${project.id}`}>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your project and all of its data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteProject(project.id)} className="bg-red-600 hover:bg-red-700">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
