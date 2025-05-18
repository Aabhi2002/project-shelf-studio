import { supabase } from '@/integrations/supabase/client';
import { Project, TimelineItem, MediaItem, ToolItem } from '@/types/project';
import { v4 as uuidv4 } from 'uuid';

export const createProject = async (projectData: Project) => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // First, create the project record
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert({
        title: projectData.title,
        description: projectData.description,
        cover_image: projectData.coverImage,
        category: projectData.category,
        overview: projectData.overview,
        challenge: projectData.challenge,
        process: projectData.process,
        outcome: projectData.outcome,
        status: projectData.status,
        theme: projectData.theme,
        is_public: projectData.isPublic || false,
        slug: projectData.slug || createSlug(projectData.title),
        user_id: user.id, // Add the user_id field
      })
      .select()
      .single();

    if (projectError) throw projectError;

    // Then create related records if any
    if (projectData.timeline && projectData.timeline.length > 0) {
      const timelineData = projectData.timeline.map((item, index) => ({
        project_id: project.id,
        date: item.date,
        title: item.title,
        description: item.description,
        display_order: index,
      }));

      const { error: timelineError } = await supabase
        .from('project_timeline')
        .insert(timelineData);

      if (timelineError) throw timelineError;
    }

    if (projectData.media && projectData.media.length > 0) {
      const mediaData = projectData.media.map((item, index) => ({
        project_id: project.id,
        type: item.type,
        url: item.url,
        caption: item.caption,
        display_order: index,
      }));

      const { error: mediaError } = await supabase
        .from('project_media')
        .insert(mediaData);

      if (mediaError) throw mediaError;
    }

    if (projectData.tools && projectData.tools.length > 0) {
      const toolsData = projectData.tools.map(item => ({
        project_id: project.id,
        name: item.name,
        icon: item.icon,
      }));

      const { error: toolsError } = await supabase
        .from('project_tools')
        .insert(toolsData);

      if (toolsError) throw toolsError;
    }

    return project;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (projectId: string, projectData: Partial<Project>) => {
  try {
    // First, update the project record
    const { error: projectError } = await supabase
      .from('projects')
      .update({
        title: projectData.title,
        description: projectData.description,
        cover_image: projectData.coverImage,
        category: projectData.category,
        overview: projectData.overview,
        challenge: projectData.challenge,
        process: projectData.process,
        outcome: projectData.outcome,
        status: projectData.status,
        theme: projectData.theme,
        is_public: projectData.isPublic,
        updated_at: new Date().toISOString(),
      })
      .eq('id', projectId);

    if (projectError) throw projectError;

    // Handle timeline updates
    if (projectData.timeline) {
      // Delete existing timeline items
      const { error: deleteTimelineError } = await supabase
        .from('project_timeline')
        .delete()
        .eq('project_id', projectId);

      if (deleteTimelineError) throw deleteTimelineError;

      // Insert new timeline items
      if (projectData.timeline.length > 0) {
        const timelineData = projectData.timeline.map((item, index) => ({
          project_id: projectId,
          date: item.date,
          title: item.title,
          description: item.description,
          display_order: index,
        }));

        const { error: insertTimelineError } = await supabase
          .from('project_timeline')
          .insert(timelineData);

        if (insertTimelineError) throw insertTimelineError;
      }
    }

    // Handle media updates
    if (projectData.media) {
      // Delete existing media items
      const { error: deleteMediaError } = await supabase
        .from('project_media')
        .delete()
        .eq('project_id', projectId);

      if (deleteMediaError) throw deleteMediaError;

      // Insert new media items
      if (projectData.media.length > 0) {
        const mediaData = projectData.media.map((item, index) => ({
          project_id: projectId,
          type: item.type,
          url: item.url,
          caption: item.caption,
          display_order: index,
        }));

        const { error: insertMediaError } = await supabase
          .from('project_media')
          .insert(mediaData);

        if (insertMediaError) throw insertMediaError;
      }
    }

    // Handle tools updates
    if (projectData.tools) {
      // Delete existing tools
      const { error: deleteToolsError } = await supabase
        .from('project_tools')
        .delete()
        .eq('project_id', projectId);

      if (deleteToolsError) throw deleteToolsError;

      // Insert new tools
      if (projectData.tools.length > 0) {
        const toolsData = projectData.tools.map(item => ({
          project_id: projectId,
          name: item.name,
          icon: item.icon,
        }));

        const { error: insertToolsError } = await supabase
          .from('project_tools')
          .insert(toolsData);

        if (insertToolsError) throw insertToolsError;
      }
    }

    return { id: projectId };
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const getProjects = async () => {
  try {
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    // Get main project data
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (projectError) throw projectError;

    // Get timeline data
    const { data: timeline, error: timelineError } = await supabase
      .from('project_timeline')
      .select('*')
      .eq('project_id', projectId)
      .order('display_order', { ascending: true });

    if (timelineError) throw timelineError;

    // Get media data
    const { data: media, error: mediaError } = await supabase
      .from('project_media')
      .select('*')
      .eq('project_id', projectId)
      .order('display_order', { ascending: true });

    if (mediaError) throw mediaError;

    // Get tools data
    const { data: tools, error: toolsError } = await supabase
      .from('project_tools')
      .select('*')
      .eq('project_id', projectId);

    if (toolsError) throw toolsError;

    // Convert DB response to frontend Project type
    const fullProject: Project = {
      id: project.id,
      title: project.title,
      description: project.description,
      coverImage: project.cover_image,
      category: project.category,
      overview: project.overview,
      challenge: project.challenge,
      process: project.process,
      outcome: project.outcome,
      status: project.status as 'draft' | 'published' | 'archived', // Type cast to ensure type safety
      theme: project.theme as 'minimalist' | 'bold' | 'elegant', // Type cast to ensure type safety
      isPublic: project.is_public,
      slug: project.slug,
      createdAt: project.created_at,
      updatedAt: project.updated_at,
      userId: project.user_id,
      
      timeline: timeline as TimelineItem[],
      media: media as MediaItem[],
      tools: tools as ToolItem[],
    };

    return fullProject;
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    throw error;
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

export const uploadFile = async (file: File, projectId: string) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${projectId}/${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase
      .storage
      .from('project-media')
      .upload(filePath, file);

    if (error) throw error;

    // Get public URL for the uploaded file
    const { data } = supabase
      .storage
      .from('project-media')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const trackPageView = async (projectId: string | null, pagePath: string) => {
  try {
    const { error } = await supabase
      .from('analytics')
      .insert({
        project_id: projectId,
        page_path: pagePath,
        browser: getBrowser(),
        device: getDeviceType(),
        referrer: document.referrer || null,
      });

    if (error) {
      console.error('Error tracking page view:', error);
    }
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Helper function to create a slug from title
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Helper function to get browser name
const getBrowser = (): string => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Edge') || userAgent.includes('Edg')) return 'Edge';
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'Opera';
  return 'Unknown';
};

// Helper function to get device type
const getDeviceType = (): string => {
  const userAgent = navigator.userAgent;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    return 'Mobile';
  }
  if (/iPad|Tablet|PlayBook/i.test(userAgent)) {
    return 'Tablet';
  }
  return 'Desktop';
};

export const getPublicProjectsByUserId = async (userId: string) => {
  try {
    // First, get the basic project data
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .eq('is_public', true)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching public projects:', error);
      throw error;
    }

    if (!projects || projects.length === 0) {
      console.log('No public projects found for user:', userId);
      return [];
    }

    // Map the database response to our Project type
    const mappedProjects: Project[] = projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      coverImage: project.cover_image,
      category: project.category,
      overview: project.overview,
      challenge: project.challenge,
      process: project.process,
      outcome: project.outcome,
      status: project.status as 'draft' | 'published' | 'archived',
      theme: project.theme as 'minimalist' | 'bold' | 'elegant',
      isPublic: project.is_public,
      slug: project.slug,
      createdAt: project.created_at,
      updatedAt: project.updated_at,
      userId: project.user_id,
      // Initialize empty arrays for related data
      timeline: [],
      media: [],
      tools: []
    }));

    console.log('Fetched and mapped public projects:', mappedProjects);
    return mappedProjects;
  } catch (error) {
    console.error('Error fetching public projects by user ID:', error);
    throw error;
  }
};
