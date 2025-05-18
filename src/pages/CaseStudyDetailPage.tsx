import React, { useState, useEffect } from "react";
import { FaReact, FaNodeJs, FaDatabase, FaGithub } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { getProjectById } from '@/services/projectService';
import { Project, TimelineItem } from '@/types/project';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme, ThemeProvider } from '@/components/themes/ThemeProvider';
import { Button } from '@/components/ui/button';

// New component for an animated timeline item
interface AnimatedTimelineItemProps {
  item: TimelineItem;
  index: number;
}

const AnimatedTimelineItem: React.FC<AnimatedTimelineItemProps> = ({ item, index }) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const isLeft = index % 2 === 0; // Determine if item is on the left side

  return (
    <motion.div // Apply motion to the item container
      ref={ref}
      key={item.id || index}
      className={`mb-8 flex justify-between items-center w-full ${
        isLeft ? '' : ' flex-row-reverse'
      }`}
      initial={{ opacity: 0, y: 50, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="order-1 w-5/12"></div>{/* Placeholder for layout */}
      {/* Timeline marker */}
      <div className={`z-20 flex items-center order-1 bg-blue-600 shadow-xl w-8 h-8 rounded-full ring-4 ring-white dark:ring-gray-500 ${
        inView ? 'scale-110' : 'scale-80' // Simple scale animation
      }`}>
         {/* Optional: Add an icon inside the circle */}
      </div>
      {/* Content Block */}
      <div className="order-1 bg-white rounded-lg shadow-xl w-5/12 px-6 py-4 opacity-0" // opacity-0 will be overridden by motion animate
           style={{ opacity: inView ? 1 : 0 }}> {/* Fallback opacity */}
        <h3 className="mb-3 font-bold text-gray-800 text-xl">{item.date}</h3>
        <h4 className="mb-3 font-bold text-gray-700 text-lg">{item.title}</h4>
        {item.description && <p className="text-sm leading-snug tracking-wide text-gray-600 text-opacity-100">{item.description}</p>}
      </div>
    </motion.div>
  );
};

// Create a component that uses the theme context
const CaseStudyDetailContent: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { projectData: previewProjectData, theme: previewTheme } = location.state || {};

  const [project, setProject] = useState<Project | null>(previewProjectData || null);
  const [isLoading, setIsLoading] = useState(!previewProjectData && !!projectId);
  const [error, setError] = useState<string | null>(null);

  // Use the theme from the state if in preview mode, otherwise use the project's saved theme
  const { setCurrentTheme, currentTheme } = useTheme();

  useEffect(() => {
    if (previewTheme) {
      setCurrentTheme(previewTheme);
    } else if (project?.theme) {
      setCurrentTheme(project.theme);
    }
  }, [setCurrentTheme, previewTheme, project?.theme]);

  useEffect(() => {
    if (!previewProjectData && projectId) {
      const fetchProject = async () => {
        if (!projectId) return;

        try {
          setIsLoading(true);
          setError(null);
          const data = await getProjectById(projectId);
          setProject(data);
        } catch (err) {
          console.error('Error fetching project details:', err);
          setError('Failed to load project details.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchProject();
    }
  }, [projectId]);

  if (isLoading) {
    return <div className="min-h-screen bg-white text-gray-800 font-sans flex justify-center items-center">Loading project details...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-white text-gray-800 font-sans flex justify-center items-center text-red-500">Error: {error}</div>;
  }

  if (!project) {
    return <div className="min-h-screen bg-white text-gray-800 font-sans flex justify-center items-center">Project not found.</div>;
  }

  // Helper function to render tools/technologies
  const renderTools = (tools: Project['tools']) => {
    if (!tools || tools.length === 0) return null;

    // A simple mapping from tool name to a react-icon component (extend as needed)
    const getToolIcon = (toolName: string) => {
      switch (toolName.toLowerCase()) {
        case 'react': return <FaReact className="text-blue-500" size={24} />;
        case 'nodejs': return <FaNodeJs className="text-green-500" size={24} />;
        case 'mongodb': return <FaDatabase className="text-purple-500" size={24} />;
        case 'github': return <FaGithub className="text-gray-700" size={24} />;
        // Add more mappings here based on your project tools
        default: return null; // Or a generic icon
      }
    };

    return (
      <section
        className="p-8 bg-gray-50"
      >
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">Tools & Technologies Used</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {tools.map((tool, index) => {
            const IconComponent = getToolIcon(tool.name);
            return (
              <div key={index} className="flex items-center space-x-3 bg-white shadow rounded-lg p-4">
                {IconComponent}
                <span className="text-gray-800 font-semibold">{tool.name}</span>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  // Helper function to render timeline
  const renderTimeline = (timeline: Project['timeline']) => {
    if (!timeline || timeline.length === 0) return null;
    return (
      <section className="p-8 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">Project Timeline</h2>
        <div className="relative wrap overflow-hidden p-10 h-full">
          {/* Adjusted line styling for better visibility */}
          <div className="border-2-2 absolute border-opacity-20 border-gray-300 h-full border" style={{ left: '50%' }}></div>
          {timeline.map((item, index) => (
            // Render the new animated component for each item
            <AnimatedTimelineItem key={item.id || index} item={item} index={index} />
          ))}
        </div>
      </section>
    );
  };


  return (
    <div className={`bg-white text-gray-800 font-sans theme-${currentTheme}`}>
      {/* Back to Editor button for preview mode */}
      {previewProjectData && (
        <div className="p-4 bg-gray-100">
          <Button onClick={() => navigate(-1)}>Back to Editor</Button>
        </div>
      )}

      <div className="bg-white text-gray-800 font-sans">

        {/* Hero Section */}
        <section
          className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 items-center bg-gray-50"
        >
          {project.coverImage && (
            <motion.img
              src={project.coverImage}
              alt={`${project.title} Cover`}
              className="w-full rounded-2xl shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            />
          )}
          <div>
            <motion.h1
              className="text-4xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {project.title}
            </motion.h1>
            <motion.p
              className="text-lg mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {project.description}
            </motion.p>
            {project.tools && project.tools.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {project.tools.map((tool, index) => (
                  <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">#{tool.name}</span>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Overview & Challenge */}
        {(project.overview || project.challenge) && (
          <section
            className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8"
          >
            <div>
              {project.overview && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="text-2xl font-semibold mb-2">Project Overview</h2>
                  <p className="mb-4">{project.overview}</p>
                </motion.div>
              )}
              {project.challenge && (
                <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, amount: 0.5 }}
                   transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-semibold mb-2 mt-6">The Challenge</h2>
                  <p>{project.challenge}</p>
                </motion.div>
              )}
            </div>
            {project.media && project.media.length > 0 && project.media[0] && (
               project.media[0].type === 'image' ? (
                 <motion.img
                   src={project.media[0].url} alt="App Screenshot" className="w-full rounded-2xl"
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true, amount: 0.5 }}
                   transition={{ duration: 0.6, delay: 0.3 }}
                 />
               ) : (
                 // Handle other media types like video if needed
                  <motion.div
                    className="w-full rounded-2xl bg-gray-200 flex items-center justify-center" style={{ height: '300px' }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                     Media Placeholder
                  </motion.div>
               )
            )}
          </section>
        )}

        {/* Process */}
        {project.process && (
          <section className="p-8 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Process & Approach</h2>
            <ul className="list-none space-y-4">
              {project.process.split('\n').map((point, index) => point.trim() && (
                <li key={index} className="flex items-start text-gray-700">
                  <svg className="w-3 h-3 text-blue-600 mt-2 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
                  <span>{point.trim()}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Outcome & Results */}
        {project.outcome && (
          <section className="p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Outcome & Results</h2>
            <ul className="list-none space-y-4">
              {project.outcome.split('\n').map((point, index) => point.trim() && (
                <li key={index} className="flex items-start text-gray-700">
                   <svg className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  <span>{point.trim()}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Timeline */}
        {project.timeline && project.timeline.length > 0 && (
          <section
            className="p-8 bg-gray-50"
          >
            {renderTimeline(project.timeline)}
          </section>
        )}

        {/* Tools & Technologies */}
        {project.tools && project.tools.length > 0 && (
          <section
            className="p-8 bg-gray-50"
          >
            {renderTools(project.tools)}
          </section>
        )}

        {/* CTA */}
        {(project.liveUrl || project.sourceCodeUrl) && (
          <section
            className="p-8 bg-gray-50 text-center"
          >
            <h2 className="text-2xl font-semibold mb-4">Explore More</h2>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">Visit Live Project</a>
              )}
              {project.sourceCodeUrl && (
                <a href={project.sourceCodeUrl} target="_blank" rel="noopener noreferrer" className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white">View Source Code</a>
              )}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

// Main component that provides the theme context
const CaseStudyDetailPage: React.FC = () => {
  return (
    <ThemeProvider>
      <CaseStudyDetailContent />
    </ThemeProvider>
  );
};

export default CaseStudyDetailPage; 