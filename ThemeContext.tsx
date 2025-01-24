// ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { MD3LightTheme, MD3DarkTheme, MD3Theme } from 'react-native-paper'; // Import MD3 themes
import { customTheme } from './theme'; // Import custom theme from theme.ts

type ThemeContextType = {
  theme: MD3Theme; // The theme is of type MD3Theme (both light and dark themes)
  toggleTheme: () => void; // Function to toggle between themes
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Use customTheme (MD3LightTheme as the default theme)
  const [theme, setTheme] = useState<MD3Theme>(MD3LightTheme);

  const toggleTheme = () => {
    console.log('---toggleTheme--', theme)
    setTheme((prevTheme: any) =>
      prevTheme === MD3LightTheme ? MD3DarkTheme : MD3LightTheme // Toggle between light and dark theme
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
