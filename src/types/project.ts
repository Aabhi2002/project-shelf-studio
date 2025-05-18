export interface TimelineItem {
  id?: string;
  date: string;
  title: string;
  description?: string;
  display_order?: number;
}

export interface MediaItem {
  id?: string;
  type: 'image' | 'video' | 'embed';
  url: string;
  caption?: string;
  display_order?: number;
}

export interface ToolItem {
  id?: string;
  name: string;
  icon?: string;
}

export interface Project {
  id?: string;
  title: string;
  description?: string;
  coverImage?: string;
  category?: string;
  overview?: string;
  challenge?: string;
  process?: string;
  outcome?: string;
  status: 'draft' | 'published' | 'archived';
  theme: 'minimalist' | 'bold' | 'elegant' | 'gray' | 'gradient';
  isPublic?: boolean;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  liveUrl?: string;
  sourceCodeUrl?: string;
  
  // Related items
  timeline?: TimelineItem[];
  media?: MediaItem[];
  tools?: ToolItem[];
}
