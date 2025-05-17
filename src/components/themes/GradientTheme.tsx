
import React from 'react';
import { Project } from '@/types/project';

interface GradientThemeProps {
  project: Partial<Project>;
}

const GradientTheme: React.FC<GradientThemeProps> = ({ project }) => {
  return (
    <div className="bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700 text-white p-6 rounded-lg">
      <div className="max-w-4xl mx-auto space-y-8 backdrop-blur-sm">
        {/* Header */}
        <header className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-pink-300">{project.title || 'Project Title'}</h1>
          {project.tagline && (
            <p className="text-xl text-blue-200">{project.tagline}</p>
          )}
        </header>

        {/* Main Image */}
        {project.coverImage && (
          <div className="rounded-lg overflow-hidden shadow-lg border border-purple-500/30 mb-8">
            <img 
              src={project.coverImage} 
              alt={project.title || 'Project Cover'} 
              className="w-full h-auto object-cover" 
            />
          </div>
        )}

        {/* Description */}
        {project.description && (
          <div className="prose prose-invert max-w-none backdrop-blur-md bg-black/20 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-pink-300 mb-4">About This Project</h2>
            <div className="text-gray-100 leading-relaxed">
              {project.description}
            </div>
          </div>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-pink-300 mb-4">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <li key={index} className="bg-gradient-to-br from-purple-900/80 to-blue-900/80 p-4 rounded-lg border border-purple-500/30 backdrop-blur-sm">
                  <h3 className="font-medium text-blue-300">{feature.title}</h3>
                  {feature.description && (
                    <p className="text-gray-200 mt-2">{feature.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-pink-300 mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="bg-gradient-to-r from-blue-700 to-purple-700 text-white px-3 py-1 rounded-full border border-blue-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-purple-500/30 text-center text-blue-200">
          <p>© {new Date().getFullYear()} - {project.title || 'Project'}</p>
        </footer>
      </div>
    </div>
  );
};

export default GradientTheme;
