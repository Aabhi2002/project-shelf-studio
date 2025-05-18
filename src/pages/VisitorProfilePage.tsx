import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, ArrowRight, Code, Smartphone, Database, Paintbrush, ArrowDown } from 'lucide-react';
import '../styles/illustration.css';
import { getUserIdByUsername } from '@/services/userService';
import { getPublicProjectsByUserId } from '@/services/projectService';
import { Project } from '@/types/project';

const categoryIcons: { [key: string]: JSX.Element } = {
  'web-design': <Code size={24} className="text-white" />,
  'mobile-development': <Smartphone size={24} className="text-white" />,
  'ui-ux-design': <Paintbrush size={24} className="text-white" />,
  'backend-development': <Database size={24} className="text-white" />,
};

const VisitorProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const userProfile = {
    fullName: username || 'username',
    username: username || 'username',
    title: 'Expert Application Developer',
    bio: 'Specialized in creating efficient, scalable software solutions with a focus on mobile and web applications. Transforming ideas into exceptional digital experiences.',
    profilePicture: '',
    socialLinks: [
      { label: 'GitHub', url: '#', icon: <Github size={24} /> },
      { label: 'LinkedIn', url: '#', icon: <Linkedin size={24} /> },
      { label: 'Twitter', url: '#', icon: <Twitter size={24} /> },
      { label: 'Instagram', url: '#', icon: <Instagram size={24} /> },
    ],
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoadingProjects(true);
        setError(null);

        if (!username) {
          throw new Error('Username is required');
        }

        const userId = await getUserIdByUsername(username);
        if (!userId) {
          throw new Error('User not found');
        }

        console.log('Fetching projects for user:', userId);
        const projects = await getPublicProjectsByUserId(userId);
        console.log('Fetched projects:', projects);

        setUserProjects(projects.filter(project => project.isPublic !== false));
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error instanceof Error ? error.message : 'Failed to load projects');
      } finally {
        setIsLoadingProjects(false);
      }
    };

    fetchProjects();
  }, [username]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left side: Text and Buttons */}
        <div className="flex flex-col gap-6">
          <motion.p
            className="text-orange-500 text-xl font-semibold uppercase tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to My Portfolio
          </motion.p>
          <motion.h1
            className="text-[4.5rem] font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hi! I'm <span className="text-orange-500">{username}</span>
          </motion.h1>
          <motion.h2
            className="text-[2.25rem] font-semibold text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {userProfile.title}
          </motion.h2>
          <motion.p
            className="text-gray-400 text-[1.4rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {userProfile.bio}
          </motion.p>
          <motion.div
            className="flex gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-12 py-6 rounded-md text-xl">
              View Case Study <ArrowDown className="ml-3 h-6 w-6" />
            </Button>
          </motion.div>
          <motion.div
            className="flex gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {userProfile.socialLinks.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                {link.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right side: Illustration */}
        <motion.div
          className="hidden md:flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="workspace">
            <div className="laptop">
              <div className="laptop-screen">
                <div className="code-window">
                  <div className="window-header">
                    <div className="dot red"></div>
                    <div className="dot yellow"></div>
                    <div className="dot green"></div>
                  </div>
                  <div className="code-content">
                    <div className="code-line"></div>
                    <div className="code-line"></div>
                    <div className="code-line"></div>
                  </div>
                </div>
              </div>
              <div className="laptop-base"></div>
            </div>
            {/* Mobile App */}
            <div className="mobile-app floating-item">
              <div className="app-header"></div>
              <div className="app-line"></div>
              <div className="app-line"></div>
              <div className="app-line" style={{ width: '70%' }}></div>
            </div>
            {/* Browser Window */}
            <div className="browser floating-item">
              <div className="browser-header"></div>
              <div className="browser-line"></div>
              <div className="browser-line" style={{ width: '85%' }}></div>
            </div>
            {/* UI and Code Cards */}
            <div className="ui-card floating-item">
              <Paintbrush size={20} className="text-orange-500" />
              <span>UI Design</span>
            </div>
            <div className="code-card floating-item">
              <Code size={20} className="text-orange-500" />
              <span>Code</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Case Studies Section */}
      <div className="max-w-7xl w-full px-4 py-12 mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Case Studies</h2>

        {isLoadingProjects && (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading projects...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        )}

        {!isLoadingProjects && !error && userProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No public projects found.</p>
          </div>
        )}

        {!isLoadingProjects && !error && userProjects.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
            {userProjects.map(study => (
              <motion.div
                key={study.id}
                className="bg-gray-900 rounded-xl shadow-md overflow-hidden relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Cover Image */}
                <div className="w-full">
                  <img 
                    src={study.coverImage} 
                    alt={`${study.title} Cover`} 
                    className="w-full h-auto object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/600x400/1a1a1a/333333?text=No+Image';
                    }}
                  />
                </div>

                <div className="p-6 space-y-4">
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white">{study.title}</h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm flex-grow">
                    {study.description || 'No description provided.'}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 text-xs mt-auto">
                    {study.category && (
                      <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {study.category === 'web-design' ? 'Web Development' :
                         study.category === 'mobile-development' ? 'Mobile Development' :
                         study.category === 'ui-ux-design' ? 'UI/UX Design' :
                         study.category === 'backend-development' ? 'Backend Development' :
                         study.category}
                      </span>
                    )}
                    {Array.isArray(study.tools) && study.tools.map((tool, index) => (
                      <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full">
                        {tool.name}
                      </span>
                    ))}
                  </div>

                  {/* View Details Button - Only visible on hover */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105"
                      onClick={() => {
                        navigate(`/projects/${study.id}`);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorProfilePage; 