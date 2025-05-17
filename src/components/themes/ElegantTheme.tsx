
import React from 'react';
import { Project } from '@/types/project';

interface ElegantThemeProps {
  project: Partial<Project>;
}

const ElegantTheme: React.FC<ElegantThemeProps> = ({ project }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div className="mb-12 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">{project.title || 'Project Title'}</h1>
        <div className="w-24 h-0.5 bg-projectshelf-primary mx-auto mb-6"></div>
        <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">{project.description || 'Project description will appear here.'}</p>
      </div>

      {/* Cover Image */}
      {project.coverImage && (
        <div className="mb-16">
          <img 
            src={project.coverImage} 
            alt={project.title || 'Project Cover'} 
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Overview */}
      {project.overview && (
        <div className="mb-16 px-4">
          <h2 className="text-2xl font-serif mb-8 text-center">Overview</h2>
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{project.overview}</p>
        </div>
      )}

      {/* Challenge */}
      {project.challenge && (
        <div className="mb-16 px-4">
          <h2 className="text-2xl font-serif mb-8 text-center">The Challenge</h2>
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{project.challenge}</p>
        </div>
      )}

      {/* Timeline */}
      {project.timeline && project.timeline.length > 0 && (
        <div className="mb-16 px-4">
          <h2 className="text-2xl font-serif mb-12 text-center">Project Timeline</h2>
          <div className="space-y-12">
            {project.timeline.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-2 md:mb-0">
                  <div className="font-serif italic text-projectshelf-primary">{item.date}</div>
                </div>
                <div className="md:w-2/3">
                  <div className="font-medium text-xl mb-2">{item.title}</div>
                  <div className="text-gray-600">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Process */}
      {project.process && (
        <div className="mb-16 px-4">
          <h2 className="text-2xl font-serif mb-8 text-center">Process & Approach</h2>
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{project.process}</p>
        </div>
      )}

      {/* Media Gallery */}
      {project.media && project.media.length > 0 && (
        <div className="mb-16 px-4">
          <h2 className="text-2xl font-serif mb-12 text-center">Gallery</h2>
          <div className="grid grid-cols-1 gap-8">
            {project.media.map((item, index) => (
              <div key={index} className="overflow-hidden">
                {item.type === 'image' && item.url && (
                  <img src={item.url} alt={item.caption || `Image ${index + 1}`} className="w-full h-auto" />
                )}
                {item.caption && (
                  <div className="mt-3 text-center italic text-gray-500">{item.caption}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Outcome */}
      {project.outcome && (
        <div className="mb-16 px-4">
          <h2 className="text-2xl font-serif mb-8 text-center">Outcome & Results</h2>
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{project.outcome}</p>
        </div>
      )}

      {/* Tools */}
      {project.tools && project.tools.length > 0 && (
        <div className="mb-16 px-4 text-center">
          <h2 className="text-2xl font-serif mb-8">Tools & Technologies</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {project.tools.map((tool, index) => (
              <div key={index} className="border border-gray-300 px-4 py-1 rounded-sm text-sm">
                {tool.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ElegantTheme;
