import React from 'react';
import { useTheme, ThemeName } from './ThemeProvider';
import { RadioGroup } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const themes: { value: ThemeName; label: string; description: string }[] = [
  { 
    value: 'minimalist', 
    label: 'Minimalist', 
    description: 'Clean and simple design focused on content' 
  },
  { 
    value: 'bold', 
    label: 'Bold & Creative', 
    description: 'Vibrant colors with strong visual hierarchy' 
  },
  { 
    value: 'elegant', 
    label: 'Elegant', 
    description: 'Refined typography with sophisticated layout' 
  },
  { 
    value: 'gray', 
    label: 'Gray Scale', 
    description: 'A modern look using shades of gray' 
  },
  { 
    value: 'gradient', 
    label: 'Gradient Flow', 
    description: 'Smooth color transitions for a dynamic feel' 
  },
];

const ThemeSelector: React.FC = () => {
  const { currentTheme, setCurrentTheme } = useTheme();

  return (
    <RadioGroup 
      defaultValue={currentTheme} 
      value={currentTheme}
      onValueChange={(value) => setCurrentTheme(value as ThemeName)}
    >
      <div className="space-y-4">
        {themes.map((theme) => (
          <div 
            key={theme.value}
            className={`flex items-start space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors
              ${currentTheme === theme.value ? 'border-projectshelf-accent bg-projectshelf-accent/5' : 'border-gray-200'}`}
            onClick={() => setCurrentTheme(theme.value)}
          >
            <input 
              type="radio" 
              id={`theme-${theme.value}`} 
              value={theme.value} 
              checked={currentTheme === theme.value} 
              className="mt-1" 
              readOnly
            />
            <div>
              <Label htmlFor={`theme-${theme.value}`} className="font-medium cursor-pointer">{theme.label}</Label>
              <p className="text-sm text-gray-500 mt-1">{theme.description}</p>
            </div>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
};

export default ThemeSelector;
