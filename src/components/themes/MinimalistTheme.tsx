
import React from 'react';
import { Project } from '@/types/project';

interface MinimalistThemeProps {
  project: Partial<Project>;
}

const MinimalistTheme: React.FC<MinimalistThemeProps> = ({ project }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-light tracking-tight mb-4">{project.title || 'Project Title'}</h1>
        <p className="text-gray-600 text-lg">{project.description || 'Project description will appear here.'}</p>
      </div>

      {/* Cover Image */}
      {project.coverImage && (
        <div className="mb-12">
          <img 
            src={project.coverImage} 
            alt={project.title || 'Project Cover'} 
            className="w-full h-auto rounded-sm"
          />
        </div>
      )}

      {/* Overview */}
      {project.overview && (
        <div className="mb-12">
          <h2 className="text-2xl font-light mb-4 border-b pb-2">Overview</h2>
          <p className="whitespace-pre-wrap text-gray-700">{project.overview}</p>
        </div>
      )}

      {/* Challenge */}
      {project.challenge && (
        <div className="mb-12">
          <h2 className="text-2xl font-light mb-4 border-b pb-2">The Challenge</h2>
          <p className="whitespace-pre-wrap text-gray-700">{project.challenge}</p>
        </div>
      )}

      {/* Timeline */}
      {project.timeline && project.timeline.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-light mb-6 border-b pb-2">Project Timeline</h2>
          <div className="space-y-8">
            {project.timeline.map((item, index) => (
              <div key={index} className="flex">
                <div className="mr-4 relative">
                  <div className="h-4 w-4 rounded-full bg-gray-300"></div>
                  {index < project.timeline.length - 1 && (
                    <div className="absolute top-4 bottom-0 left-1.5 w-0.5 -ml-px bg-gray-200"></div>
                  )}
                </div>
                <div className="pb-6">
                  <div className="text-sm font-medium text-gray-500">{item.date}</div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-gray-600 text-sm mt-1">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Process */}
      {project.process && (
        <div className="mb-12">
          <h2 className="text-2xl font-light mb-4 border-b pb-2">Process & Approach</h2>
          <p className="whitespace-pre-wrap text-gray-700">{project.process}</p>
        </div>
      )}

      {/* Media Gallery */}
      {project.media && project.media.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-light mb-6 border-b pb-2">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {project.media.map((item, index) => (
              <div key={index} className="shadow-sm rounded-sm overflow-hidden">
                {item.type === 'image' && item.url && (
                  <img src={item.url} alt={item.caption || `Image ${index + 1}`} className="w-full h-auto" />
                )}
                {item.caption && (
                  <div className="p-2 text-sm text-gray-500">{item.caption}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Outcome */}
      {project.outcome && (
        <div className="mb-12">
          <h2 className="text-2xl font-light mb-4 border-b pb-2">Outcome & Results</h2>
          <p className="whitespace-pre-wrap text-gray-700">{project.outcome}</p>
        </div>
      )}

      {/* Tools */}
      {project.tools && project.tools.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-light mb-6 border-b pb-2">Tools & Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool, index) => (
              <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {tool.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalistTheme;
