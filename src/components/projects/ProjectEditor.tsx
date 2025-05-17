import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Image, Upload, X, Plus, LayoutGrid, Edit } from 'lucide-react';
import { Project } from '@/types/project';
import { ThemeProvider, useTheme, ThemeName } from '@/components/themes/ThemeProvider';
import ThemeSelector from '@/components/themes/ThemeSelector';
import ThemePreview from '@/components/themes/ThemePreview';
import { createProject, updateProject, getProjectById, uploadFile } from '@/services/projectService';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useQueryClient } from '@tanstack/react-query';

// Define props interface for the ProjectEditorWithTheme component
interface ProjectEditorProps {
  projectId?: string;
}

// Wrapper component to provide theme context
export const ProjectEditorWithTheme: React.FC<ProjectEditorProps> = ({ projectId }) => {
  return (
    <ThemeProvider>
      <ProjectEditorInner projectId={projectId} />
    </ThemeProvider>
  );
};

// Define props for the inner component too
interface ProjectEditorInnerProps {
  projectId?: string;
}

const ProjectEditorInner: React.FC<ProjectEditorInnerProps> = ({ projectId }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!projectId;
  const { user } = useRequireAuth();
  const { setPreviewMode, isPreviewMode } = useTheme();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    coverImage: '',
    category: 'web-design',
    overview: '',
    challenge: '',
    process: '',
    outcome: '',
    timeline: [],
    tools: [],
    media: [],
    status: 'draft',
    theme: 'minimalist',
    isPublic: false
  });

  const [selectedTab, setSelectedTab] = useState('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);

  // Fetch project data when editing
  useEffect(() => {
    if (isEditing && projectId) {
      const fetchProject = async () => {
        try {
          const project = await getProjectById(projectId);
          setFormData({
            ...project,
            coverImage: project.coverImage || '',
            theme: project.theme || 'minimalist',
          });
        } catch (error) {
          console.error('Error fetching project:', error);
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to load project data.',
          });
        }
      };

      fetchProject();
    }
  }, [projectId, isEditing, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleAddTool = () => {
    setFormData({
      ...formData,
      tools: [...(formData.tools || []), { name: '', icon: '' }],
    });
  };

  const handleToolChange = (index: number, field: string, value: string) => {
    const updatedTools = [...(formData.tools || [])];
    updatedTools[index] = { ...updatedTools[index], [field]: value };
    
    setFormData({
      ...formData,
      tools: updatedTools,
    });
  };

  const handleRemoveTool = (index: number) => {
    const updatedTools = (formData.tools || []).filter((_, i) => i !== index);
    setFormData({
      ...formData,
      tools: updatedTools,
    });
  };

  const handleAddMedia = () => {
    setFormData({
      ...formData,
      media: [...(formData.media || []), { type: 'image', url: '', caption: '' }],
    });
  };

  const handleMediaChange = (index: number, field: string, value: string) => {
    const updatedMedia = [...(formData.media || [])];
    updatedMedia[index] = { ...updatedMedia[index], [field]: value };
    
    setFormData({
      ...formData,
      media: updatedMedia,
    });
  };

  const handleRemoveMedia = (index: number) => {
    const updatedMedia = (formData.media || []).filter((_, i) => i !== index);
    setFormData({
      ...formData,
      media: updatedMedia,
    });
  };

  const handleAddTimelineItem = () => {
    setFormData({
      ...formData,
      timeline: [...(formData.timeline || []), { date: '', title: '', description: '' }],
    });
  };

  const handleTimelineChange = (index: number, field: string, value: string) => {
    const updatedTimeline = [...(formData.timeline || [])];
    updatedTimeline[index] = { ...updatedTimeline[index], [field]: value };
    
    setFormData({
      ...formData,
      timeline: updatedTimeline,
    });
  };

  const handleRemoveTimelineItem = (index: number) => {
    const updatedTimeline = (formData.timeline || []).filter((_, i) => i !== index);
    setFormData({
      ...formData,
      timeline: updatedTimeline,
    });
  };

  const handleFileUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    setFileUploading(true);
    
    try {
      // Upload file to Supabase storage
      const projectId = formData.id || 'new';
      const fileUrl = await uploadFile(file, projectId);
      
      // Update media item with the file URL
      const updatedMedia = [...(formData.media || [])];
      updatedMedia[index] = { ...updatedMedia[index], url: fileUrl, type: 'image' };
      
      setFormData({
        ...formData,
        media: updatedMedia,
      });
      
      toast({
        title: 'File uploaded',
        description: 'The file has been uploaded successfully.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: error.message || 'Failed to upload file',
      });
    } finally {
      setFileUploading(false);
    }
  };

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    setFileUploading(true);
    
    try {
      // Upload file to Supabase storage
      const projectId = formData.id || 'new';
      const fileUrl = await uploadFile(file, projectId);
      
      setFormData({
        ...formData,
        coverImage: fileUrl,
      });
      
      toast({
        title: 'Cover image uploaded',
        description: 'The cover image has been uploaded successfully.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: error.message || 'Failed to upload cover image',
      });
    } finally {
      setFileUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, status: 'draft' | 'published') => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.title.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Project title is required.',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const projectToSave = {
        ...formData,
        status,
      };

      if (isEditing && projectId) {
        await updateProject(projectId, projectToSave);
        // Invalidate cached project data
        queryClient.invalidateQueries({ queryKey: ['project', projectId] });
        queryClient.invalidateQueries({ queryKey: ['projects'] });
      } else {
        await createProject(projectToSave);
        // Invalidate cached projects list
        queryClient.invalidateQueries({ queryKey: ['projects'] });
      }

      toast({
        title: `Project ${isEditing ? 'updated' : 'created'}!`,
        description: `Your project has been ${isEditing ? 'updated' : 'created'} as a ${status}.`,
      });
      navigate('/dashboard/projects');
    } catch (error: any) {
      console.error('Error saving project:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || `Failed to ${isEditing ? 'update' : 'create'} project. Please try again.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = (status: string) => {
    setFormData({
      ...formData,
      status: status as 'draft' | 'published' | 'archived',
    });
  };

  const handleThemeChange = (theme: ThemeName) => {
    setFormData({
      ...formData,
      theme,
    });
  };

  const handleVisibilityChange = (isPublic: boolean) => {
    setFormData({
      ...formData,
      isPublic,
    });
  };

  const calculateProgress = () => {
    let score = 0;
    const totalFields = 5; // Basic info, content, media, timeline, tools

    if (formData.title && formData.description) score += 1;
    if (formData.overview) score += 1;
    if (formData.media && formData.media.length > 0) score += 1;
    if (formData.timeline && formData.timeline.length > 0) score += 1;
    if (formData.tools && formData.tools.length > 0) score += 1;

    return Math.round((score / totalFields) * 100);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-projectshelf-primary">
            {isEditing ? 'Edit Project' : 'Create New Project'}
          </h1>
          <p className="text-gray-600">
            {isEditing 
              ? 'Update your existing project' 
              : 'Create a new case study to showcase your work'}
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={(e) => handleSubmit(e, 'draft')} 
            disabled={isSubmitting || fileUploading}
          >
            Save as Draft
          </Button>
          <Button 
            className="bg-projectshelf-accent hover:bg-projectshelf-accent/90"
            onClick={(e) => handleSubmit(e, 'published')} 
            disabled={isSubmitting || fileUploading}
          >
            {isSubmitting ? 'Saving...' : `${isEditing ? 'Update' : 'Publish'} Project`}
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-3/4">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="details">Project Details</TabsTrigger>
              <TabsTrigger value="content">Case Study Content</TabsTrigger>
              <TabsTrigger value="media">Media Gallery</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="tools">Tools & Tech</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <TabsContent value="details">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="title">
                      Project Title
                    </label>
                    <Input 
                      id="title" 
                      name="title" 
                      placeholder="Enter project title" 
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="description">
                      Short Description
                    </label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      placeholder="Brief summary of your project" 
                      value={formData.description || ''}
                      onChange={handleChange}
                      rows={3}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      This will be displayed in project cards and previews (max 150 characters).
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="category">
                      Project Category
                    </label>
                    <Select 
                      value={formData.category || 'web-design'}
                      onValueChange={(value) => handleSelectChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-design">Web Design</SelectItem>
                        <SelectItem value="mobile-app">Mobile App</SelectItem>
                        <SelectItem value="branding">Branding</SelectItem>
                        <SelectItem value="ui-design">UI Design</SelectItem>
                        <SelectItem value="illustration">Illustration</SelectItem>
                        <SelectItem value="3d-design">3D Design</SelectItem>
                        <SelectItem value="motion">Motion Design</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="coverImage">
                      Cover Image
                    </label>
                    <div className="space-y-2">
                      {formData.coverImage && (
                        <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
                          <img 
                            src={formData.coverImage} 
                            alt="Cover Preview" 
                            className="w-full h-full object-cover" 
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 w-8 h-8"
                            onClick={() => setFormData({...formData, coverImage: ''})}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <div className="flex gap-2 items-center">
                        <Input
                          id="coverImageUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleCoverImageUpload}
                          className={fileUploading ? "opacity-50 pointer-events-none" : ""}
                        />
                        <span className="text-xs text-gray-500">or</span>
                        <Input 
                          id="coverImage" 
                          name="coverImage" 
                          placeholder="https://example.com/image.jpg" 
                          value={formData.coverImage}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      This will be the main image for your project.
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={() => setSelectedTab('content')}
                      className="bg-projectshelf-accent hover:bg-projectshelf-accent/90"
                    >
                      Next: Case Study Content
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="content">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="overview">
                      Project Overview
                    </label>
                    <Textarea 
                      id="overview" 
                      name="overview" 
                      placeholder="Introduce your project and explain its purpose" 
                      value={formData.overview || ''}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="challenge">
                      The Challenge
                    </label>
                    <Textarea 
                      id="challenge" 
                      name="challenge" 
                      placeholder="Describe the problem you were solving" 
                      value={formData.challenge || ''}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="process">
                      Process & Approach
                    </label>
                    <Textarea 
                      id="process" 
                      name="process" 
                      placeholder="Explain your process, research, and methodology" 
                      value={formData.process || ''}
                      onChange={handleChange}
                      rows={6}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="outcome">
                      Outcome & Results
                    </label>
                    <Textarea 
                      id="outcome" 
                      name="outcome" 
                      placeholder="Describe the results and impact of your project" 
                      value={formData.outcome || ''}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedTab('details')}
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={() => setSelectedTab('media')}
                      className="bg-projectshelf-accent hover:bg-projectshelf-accent/90"
                    >
                      Next: Media Gallery
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="media">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Media Gallery</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleAddMedia}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Media
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {(!formData.media || formData.media.length === 0) ? (
                      <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <Image className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <h3 className="text-gray-500 font-medium">No media added yet</h3>
                        <p className="text-gray-400 text-sm mb-4">Add images or videos to your project gallery</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleAddMedia}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add Media
                        </Button>
                      </div>
                    ) : (
                      formData.media.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                          <div className="flex justify-between">
                            <h4 className="font-medium">Media Item #{index + 1}</h4>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveMedia(index)}
                              className="text-gray-500 h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          {item.url && item.type === 'image' && (
                            <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden mb-4">
                              <img 
                                src={item.url} 
                                alt="Media Preview" 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1" htmlFor={`media-type-${index}`}>
                                Type
                              </label>
                              <Select 
                                value={item.type || 'image'}
                                onValueChange={(value) => handleMediaChange(index, 'type', value)}
                              >
                                <SelectTrigger id={`media-type-${index}`}>
                                  <SelectValue placeholder="Select media type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="image">Image</SelectItem>
                                  <SelectItem value="video">Video</SelectItem>
                                  <SelectItem value="embed">Embed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1" htmlFor={`media-url-${index}`}>
                                {item.type === 'image' ? 'Upload / URL' : 'URL'}
                              </label>
                              {item.type === 'image' ? (
                                <div className="flex gap-2">
                                  <Input
                                    id={`media-upload-${index}`}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(index, e)}
                                    className={fileUploading ? "opacity-50 pointer-events-none flex-1" : "flex-1"}
                                  />
                                  <Input 
                                    id={`media-url-${index}`}
                                    placeholder="https://example.com/image.jpg" 
                                    value={item.url || ''}
                                    onChange={(e) => handleMediaChange(index, 'url', e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              ) : (
                                <Input 
                                  id={`media-url-${index}`}
                                  placeholder={
                                    item.type === 'video' 
                                      ? 'https://youtube.com/watch?v=...'
                                      : 'https://example.com/embed'
                                  }
                                  value={item.url || ''}
                                  onChange={(e) => handleMediaChange(index, 'url', e.target.value)}
                                />
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1" htmlFor={`media-caption-${index}`}>
                              Caption
                            </label>
                            <Input 
                              id={`media-caption-${index}`}
                              placeholder="Describe this media" 
                              value={item.caption || ''}
                              onChange={(e) => handleMediaChange(index, 'caption', e.target.value)}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedTab('content')}
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={() => setSelectedTab('timeline')}
                      className="bg-projectshelf-accent hover:bg-projectshelf-accent/90"
                    >
                      Next: Timeline
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="timeline">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Project Timeline</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleAddTimelineItem}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Timeline Item
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {(!formData.timeline || formData.timeline.length === 0) ? (
                      <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <h3 className="text-gray-500 font-medium">No timeline items yet</h3>
                        <p className="text-gray-400 text-sm mb-4">Add key milestones to your project timeline</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleAddTimelineItem}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add Timeline Item
                        </Button>
                      </div>
                    ) : (
                      formData.timeline.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                          <div className="flex justify-between">
                            <h4 className="font-medium">Timeline Item #{index + 1}</h4>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveTimelineItem(index)}
                              className="text-gray-500 h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1" htmlFor={`timeline-date-${index}`}>
                                Date / Phase
                              </label>
                              <Input 
                                id={`timeline-date-${index}`}
                                placeholder="Jan 2025 / Research Phase" 
                                value={item.date || ''}
                                onChange={(e) => handleTimelineChange(index, 'date', e.target.value)}
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1" htmlFor={`timeline-title-${index}`}>
                                Title
                              </label>
                              <Input 
                                id={`timeline-title-${index}`}
                                placeholder="Milestone Title" 
                                value={item.title || ''}
                                onChange={(e) => handleTimelineChange(index, 'title', e.target.value)}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1" htmlFor={`timeline-description-${index}`}>
                              Description
                            </label>
                            <Textarea 
                              id={`timeline-description-${index}`}
                              placeholder="Describe what happened during this phase" 
                              value={item.description || ''}
                              onChange={(e) => handleTimelineChange(index, 'description', e.target.value)}
                              rows={2}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedTab('media')}
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={() => setSelectedTab('tools')}
                      className="bg-projectshelf-accent hover:bg-projectshelf-accent/90"
                    >
                      Next: Tools & Tech
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tools">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Tools & Technologies Used</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleAddTool}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Tool
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {(!formData.tools || formData.tools.length === 0) ? (
                      <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <LayoutGrid className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <h3 className="text-gray-500 font-medium">No tools added yet</h3>
                        <p className="text-gray-400 text-sm mb-4">Add tools and technologies used in your project</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleAddTool}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add Tool
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.tools.map((tool, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                            <div className="flex-1">
                              <Input 
                                placeholder="Tool name" 
                                value={tool.name || ''}
                                onChange={(e) => handleToolChange(index, 'name', e.target.value)}
                                className="mb-2"
                              />
                              <Input 
                                placeholder="Icon URL (optional)" 
                                value={tool.icon || ''}
                                onChange={(e) => handleToolChange(index, 'icon', e.target.value)}
                              />
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveTool(index)}
                              className="ml-2 text-gray-500 h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedTab('timeline')}
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={() => setSelectedTab('preview')}
                      className="bg-projectshelf-accent hover:bg-projectshelf-accent/90"
                    >
                      Next: Preview
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview">
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Preview Your Project</h3>
                    <Button 
                      variant={isPreviewMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode(!isPreviewMode)}
                      className="ml-auto"
                    >
                      {isPreviewMode ? 'Exit Preview' : 'Preview'}
                    </Button>
                  </div>

                  {isPreviewMode ? (
                    <Card className="overflow-hidden">
                      <ThemePreview project={formData} />
                    </Card>
                  ) : (
                    <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
                      <Edit className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                      <h3 className="text-lg font-medium mb-2">Theme Preview</h3>
                      <p className="text-gray-500 mb-4">
                        See how your portfolio will look with different themes. Select a theme and click Preview.
                      </p>
                      <div className="max-w-md mx-auto mt-6">
                        <ThemeSelector />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-6">
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedTab('tools')}
                    >
                      Back
                    </Button>
                    <div className="space-x-3">
                      <Button 
                        variant="outline" 
                        onClick={(e) => handleSubmit(e, 'draft')} 
                        disabled={isSubmitting || fileUploading}
                      >
                        Save as Draft
                      </Button>
                      <Button 
                        className="bg-projectshelf-accent hover:bg-projectshelf-accent/90"
                        onClick={(e) => handleSubmit(e, 'published')} 
                        disabled={isSubmitting || fileUploading}
                      >
                        {isSubmitting ? 'Saving...' : `${isEditing ? 'Update' : 'Publish'} Project`}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <h3 className="font-medium mb-3">Project Status</h3>
            <Select 
              value={formData.status} 
              onValueChange={handleStatusChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={(e) => handleVisibilityChange(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span>Make project public</span>
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Public projects can be viewed by anyone with the link
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <h3 className="font-medium mb-3">Theme</h3>
            <Select 
              value={formData.theme} 
              onValueChange={(value) => handleThemeChange(value as ThemeName)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimalist">Minimalist</SelectItem>
                <SelectItem value="bold">Bold & Creative</SelectItem>
                <SelectItem value="elegant">Elegant</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-3 text-xs text-gray-500">
              Choose how your case study will be displayed.
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-medium mb-3">Completion Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-projectshelf-accent h-2.5 rounded-full" 
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              {calculateProgress()}% complete. Fill out all sections to improve your project showcase.
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <div className={`h-4 w-4 rounded-full ${formData.title ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="ml-2 text-sm">Basic Details</span>
              </div>
              <div className="flex items-center">
                <div className={`h-4 w-4 rounded-full ${formData.overview ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="ml-2 text-sm">Project Content</span>
              </div>
              <div className="flex items-center">
                <div className={`h-4 w-4 rounded-full ${formData.media && formData.media.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="ml-2 text-sm">Media Gallery</span>
              </div>
              <div className="flex items-center">
                <div className={`h-4 w-4 rounded-full ${formData.timeline && formData.timeline.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="ml-2 text-sm">Timeline</span>
              </div>
              <div className="flex items-center">
                <div className={`h-4 w-4 rounded-full ${formData.tools && formData.tools.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="ml-2 text-sm">Tools & Tech</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Default export for the wrapped component
export default ProjectEditorWithTheme;
