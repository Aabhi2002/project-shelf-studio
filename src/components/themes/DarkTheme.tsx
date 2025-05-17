
import React from 'react';
import { Project } from '@/types/project';

interface DarkThemeProps {
  project: Partial<Project>;
}

const DarkTheme: React.FC<DarkThemeProps> = ({ project }) => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-400">{project.title || 'Project Title'}</h1>
          {project.tagline && (
            <p className="text-xl text-gray-300">{project.tagline}</p>
          )}
        </header>

        {/* Main Image */}
        {project.coverImage && (
          <div className="rounded-lg overflow-hidden shadow-lg border border-gray-700 mb-8">
            <img 
              src={project.coverImage} 
              alt={project.title || 'Project Cover'} 
              className="w-full h-auto object-cover" 
            />
          </div>
        )}

        {/* Description */}
        {project.description && (
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">About This Project</h2>
            <div className="text-gray-300 leading-relaxed">
              {project.description}
            </div>
          </div>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <li key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="font-medium text-blue-300">{feature.title}</h3>
                  {feature.description && (
                    <p className="text-gray-400 mt-2">{feature.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="bg-gray-800 text-blue-300 px-3 py-1 rounded-full border border-blue-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} - {project.title || 'Project'}</p>
        </footer>
      </div>
    </div>
  );
};

export default DarkTheme;
