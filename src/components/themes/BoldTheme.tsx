
import React from 'react';
import { Project } from '@/types/project';

interface BoldThemeProps {
  project: Partial<Project>;
}

const BoldTheme: React.FC<BoldThemeProps> = ({ project }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with background */}
      <div className="bg-projectshelf-accent text-white p-8 md:p-12 mb-12 rounded-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title || 'Project Title'}</h1>
        <p className="text-white/80 text-xl">{project.description || 'Project description will appear here.'}</p>
      </div>

      {/* Cover Image */}
      {project.coverImage && (
        <div className="mb-12 transform -mt-16 px-4">
          <img 
            src={project.coverImage} 
            alt={project.title || 'Project Cover'} 
            className="w-full h-auto rounded-lg shadow-xl"
          />
        </div>
      )}

      {/* Overview */}
      {project.overview && (
        <div className="mb-12 px-4">
          <h2 className="text-3xl font-bold mb-6 text-projectshelf-primary">Overview</h2>
          <p className="whitespace-pre-wrap text-gray-800 text-lg">{project.overview}</p>
        </div>
      )}

      {/* Challenge */}
      {project.challenge && (
        <div className="mb-12 bg-gray-100 p-8 rounded-lg mx-4">
          <h2 className="text-3xl font-bold mb-6 text-projectshelf-primary">The Challenge</h2>
          <p className="whitespace-pre-wrap text-gray-800 text-lg">{project.challenge}</p>
        </div>
      )}

      {/* Timeline */}
      {project.timeline && project.timeline.length > 0 && (
        <div className="mb-12 px-4">
          <h2 className="text-3xl font-bold mb-8 text-projectshelf-primary">Project Timeline</h2>
          <div className="space-y-10">
            {project.timeline.map((item, index) => (
              <div key={index} className="flex">
                <div className="mr-6 relative">
                  <div className="h-8 w-8 rounded-full bg-projectshelf-accent flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  {index < project.timeline.length - 1 && (
                    <div className="absolute top-8 bottom-0 left-4 w-1 -ml-px bg-gray-300"></div>
                  )}
                </div>
                <div className="pb-6">
                  <div className="text-projectshelf-accent font-bold">{item.date}</div>
                  <div className="font-bold text-xl mb-2">{item.title}</div>
                  <div className="text-gray-700">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Process */}
      {project.process && (
        <div className="mb-12 px-4">
          <h2 className="text-3xl font-bold mb-6 text-projectshelf-primary">Process & Approach</h2>
          <p className="whitespace-pre-wrap text-gray-800 text-lg">{project.process}</p>
        </div>
      )}

      {/* Media Gallery */}
      {project.media && project.media.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-projectshelf-primary px-4">Gallery</h2>
          <div className="grid grid-cols-1 gap-6">
            {project.media.map((item, index) => (
              <div key={index} className="overflow-hidden">
                {item.type === 'image' && item.url && (
                  <img src={item.url} alt={item.caption || `Image ${index + 1}`} className="w-full h-auto" />
                )}
                {item.caption && (
                  <div className="p-4 text-base bg-gray-100">{item.caption}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Outcome */}
      {project.outcome && (
        <div className="mb-12 bg-projectshelf-accent/10 p-8 rounded-lg mx-4">
          <h2 className="text-3xl font-bold mb-6 text-projectshelf-primary">Outcome & Results</h2>
          <p className="whitespace-pre-wrap text-gray-800 text-lg">{project.outcome}</p>
        </div>
      )}

      {/* Tools */}
      {project.tools && project.tools.length > 0 && (
        <div className="mb-12 px-4">
          <h2 className="text-3xl font-bold mb-6 text-projectshelf-primary">Tools & Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {project.tools.map((tool, index) => (
              <div key={index} className="bg-gray-800 text-white px-4 py-2 rounded-md text-base">
                {tool.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BoldTheme;
