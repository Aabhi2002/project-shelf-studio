
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LayoutGrid, List, Plus, Search, Eye, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Projects = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock projects data
  const projects = [
    { 
      id: 1, 
      title: 'E-commerce Website Redesign', 
      description: 'Complete redesign of an e-commerce platform focusing on user experience and conversion optimization.',
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      status: 'published',
      lastUpdated: '2025-05-10',
      views: 247
    },
    { 
      id: 2, 
      title: 'Mobile Banking App', 
      description: 'A mobile banking application designed to simplify financial management for young adults.',
      thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
      status: 'published',
      lastUpdated: '2025-05-08',
      views: 189
    },
    { 
      id: 3, 
      title: 'Corporate Branding Project', 
      description: 'Complete brand identity redesign for a tech startup, including logo, color palette, and guidelines.',
      thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      status: 'published',
      lastUpdated: '2025-05-05',
      views: 156
    },
    { 
      id: 4, 
      title: 'Healthcare Dashboard', 
      description: 'Data visualization dashboard for healthcare providers to monitor patient outcomes.',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      status: 'draft',
      lastUpdated: '2025-05-02',
      views: 0
    },
    { 
      id: 5, 
      title: 'Restaurant Booking System', 
      description: 'User interface design for a restaurant reservation platform.',
      thumbnail: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
      status: 'draft',
      lastUpdated: '2025-04-28',
      views: 0
    }
  ];

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProject = (projectId: number) => {
    // In a real app, we'd call an API to delete the project
    toast({
      title: 'Project deleted',
      description: 'The project has been successfully deleted.',
    });
  };

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

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No projects found matching your search criteria.</p>
          <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <Card key={project.id} className="overflow-hidden">
              <div 
                className="h-48 bg-cover bg-center" 
                style={{ backgroundImage: `url(${project.thumbnail})` }}
              ></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>Updated {new Date(project.lastUpdated).toLocaleDateString()}</CardDescription>
                  </div>
                  {project.status === 'draft' && (
                    <div className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-md">
                      Draft
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-gray-600 line-clamp-2">{project.description}</p>
                {project.status === 'published' && (
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Eye className="h-3 w-3 mr-1" /> {project.views} views
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Link to={`/dashboard/projects/${project.id}`} className="w-full">
                  <Button variant="ghost" className="w-full justify-between">
                    View Details <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map(project => (
            <div 
              key={project.id} 
              className="flex flex-col md:flex-row gap-4 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div 
                className="w-full md:w-32 h-24 bg-cover bg-center rounded-md flex-shrink-0" 
                style={{ backgroundImage: `url(${project.thumbnail})` }}
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
                <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-gray-500">
                    Updated {new Date(project.lastUpdated).toLocaleDateString()}
                    {project.status === 'published' && (
                      <span className="ml-3">
                        <Eye className="h-3 w-3 inline mr-1" /> {project.views} views
                      </span>
                    )}
                  </div>
                  <Link to={`/dashboard/projects/${project.id}`}>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </Link>
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
