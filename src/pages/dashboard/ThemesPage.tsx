import React from 'react';
import { useTheme, ThemeName } from '@/components/themes/ThemeProvider';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ThemesPage: React.FC = () => {
  const { currentTheme, setCurrentTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = React.useState<ThemeName>(currentTheme);

  const themes = [
    { value: 'minimalist', label: 'Minimalist', image: '/previews/minimalist.png' }, // Placeholder image path
    { value: 'gray', label: 'Gray Scale', image: '/previews/gray.png' }, // Placeholder image path
    { value: 'gradient', label: 'Gradient Flow', image: '/previews/gradient.png' }, // Placeholder image path
    // We can add 'bold' and 'elegant' later if needed on this page
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Choose Your Theme</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <Card
            key={theme.value}
            className={`cursor-pointer overflow-hidden ${
              selectedTheme === theme.value
                ? 'border-projectshelf-accent border-2'
                : 'border-gray-200'
            }`}
            onClick={() => setSelectedTheme(theme.value as ThemeName)}
          >
            {/* Placeholder for Theme Preview Image */}
            <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                {/* In a real app, replace this with actual theme preview images or components */}
                <span className="text-gray-500">{theme.label} Preview</span>
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{theme.label}</h3>
            </div>
          </Card>
        ))}
      </div>
      {/* Add Apply Button */}
      {selectedTheme !== currentTheme && (
        <div className="mt-8 text-center">
          <Button onClick={() => setCurrentTheme(selectedTheme)}>
            Apply Theme: {selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ThemesPage;
 