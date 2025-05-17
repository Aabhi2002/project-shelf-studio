
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-projectshelf-secondary to-white">
        <div className="container mx-auto px-4 py-20 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6 animate-slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-projectshelf-primary">
                Build impressive portfolios with detailed case studies
              </h1>
              <p className="text-lg text-gray-700 max-w-md">
                ProjectShelf helps designers, developers, and writers showcase their work beautifully with engaging case studies.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/signup">
                  <Button className="bg-projectshelf-accent hover:bg-projectshelf-accent/90 px-6 py-6 text-base">
                    Create Your Portfolio
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button variant="outline" className="px-6 py-6 text-base">
                    Explore Examples
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 animate-fade-in">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-projectshelf-accent rounded-lg"></div>
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                  alt="Portfolio showcase" 
                  className="rounded-lg shadow-xl w-full object-cover h-[400px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-projectshelf-primary mb-4">
              Everything you need to showcase your best work
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform is designed with creatives in mind, providing all the tools you need to build impressive case studies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <LayoutGrid className="h-6 w-6 text-projectshelf-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Portfolio Builder</h3>
              <p className="text-gray-600">
                Create and customize your portfolio with intuitive drag-and-drop tools designed for creatives.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Image className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Media Gallery</h3>
              <p className="text-gray-600">
                Showcase your work with beautiful galleries that support images, videos, and interactive media.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">
                Track visitor engagement and interactions to understand which projects get the most attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Themes Section */}
      <section className="bg-projectshelf-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-projectshelf-primary mb-4">
              Choose your style with customizable themes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pick from professionally designed themes or customize your own to match your personal brand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Theme 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-64 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Theme Preview 1
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Minimalist</h3>
                <p className="text-gray-600 mb-4">
                  Clean, modern design that puts your work front and center with plenty of whitespace.
                </p>
                <Button variant="outline" className="w-full">Preview Theme</Button>
              </div>
            </div>

            {/* Theme 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-64 bg-gray-800 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                  Theme Preview 2
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Bold & Creative</h3>
                <p className="text-gray-600 mb-4">
                  Make a statement with rich colors, dynamic layouts, and interactive elements.
                </p>
                <Button variant="outline" className="w-full">Preview Theme</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-projectshelf-accent to-blue-600 rounded-xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to showcase your best work?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of creatives who are using ProjectShelf to build impressive portfolios and land their dream clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="bg-white text-projectshelf-accent hover:bg-gray-100 px-8 py-6 text-base">
                  Get Started For Free
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-base">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
