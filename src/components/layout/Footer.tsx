
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-projectshelf-accent flex items-center justify-center">
                <span className="text-white font-bold">PS</span>
              </div>
              <span className="text-lg font-semibold text-projectshelf-primary">ProjectShelf</span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Showcase your work beautifully with detailed case studies that tell your story.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-projectshelf-primary">Features</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="text-gray-600 hover:text-projectshelf-accent">Portfolio Builder</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-projectshelf-accent">Case Studies</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-projectshelf-accent">Media Gallery</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-projectshelf-accent">Analytics</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-projectshelf-primary">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-600 hover:text-projectshelf-accent">About</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-projectshelf-accent">Pricing</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-projectshelf-accent">Blog</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-projectshelf-accent">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-projectshelf-primary">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="text-gray-600 hover:text-projectshelf-accent">Help Center</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-projectshelf-accent">Contact Us</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-projectshelf-accent">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-projectshelf-accent">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} ProjectShelf. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
