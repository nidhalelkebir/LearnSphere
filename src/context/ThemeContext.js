// src/context/ThemeContext.js
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const ThemeContext = createContext();

// Constants
const THEME_STORAGE_KEY = 'app-theme';
const THEME_TYPES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

// Helper function to get system theme preference
const getSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Custom hook for theme media query
const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = useState(getSystemTheme());

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return systemTheme;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [themeType, setThemeType] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      return savedTheme || THEME_TYPES.SYSTEM;
    } catch (error) {
      console.error('Error reading theme from localStorage:', error);
      return THEME_TYPES.SYSTEM;
    }
  });

  const systemTheme = useSystemTheme();
  
  // Calculate current theme based on themeType
  const currentTheme = useMemo(() => {
    if (themeType === THEME_TYPES.SYSTEM) {
      return systemTheme;
    }
    return themeType;
  }, [themeType, systemTheme]);

  // Apply theme to document
  useEffect(() => {
    try {
      const root = document.documentElement;
      
      // Remove all theme classes
      root.classList.remove(THEME_TYPES.LIGHT, THEME_TYPES.DARK);
      
      // Add current theme class
      root.classList.add(currentTheme);
      
      // Add data-theme attribute for CSS selectors
      root.setAttribute('data-theme', currentTheme);
      
      // Save to localStorage
      localStorage.setItem(THEME_STORAGE_KEY, themeType);
      
      // Dispatch custom event for any other components that might need to react
      const event = new CustomEvent('themechange', { detail: { theme: currentTheme } });
      window.dispatchEvent(event);
      
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }, [currentTheme, themeType]);

  // Set theme with validation
  const setTheme = useCallback((newTheme) => {
    if (Object.values(THEME_TYPES).includes(newTheme)) {
      setThemeType(newTheme);
    } else {
      console.warn(`Invalid theme type: ${newTheme}. Valid options are: ${Object.values(THEME_TYPES).join(', ')}`);
    }
  }, []);

  // Toggle between light and dark (skipping system)
  const toggleTheme = useCallback(() => {
    setThemeType(prev => {
      if (prev === THEME_TYPES.SYSTEM) {
        return systemTheme === THEME_TYPES.DARK ? THEME_TYPES.LIGHT : THEME_TYPES.DARK;
      }
      return prev === THEME_TYPES.DARK ? THEME_TYPES.LIGHT : THEME_TYPES.DARK;
    });
  }, [systemTheme]);

  // Check if dark mode is active
  const isDarkMode = currentTheme === THEME_TYPES.DARK;

  // Check if using system theme
  const isSystemTheme = themeType === THEME_TYPES.SYSTEM;

  // Get all available themes
  const availableThemes = Object.values(THEME_TYPES);

  // Context value
  const contextValue = useMemo(() => ({
    theme: currentTheme,
    themeType,
    isDarkMode,
    isSystemTheme,
    setTheme,
    toggleTheme,
    availableThemes,
    THEME_TYPES
  }), [currentTheme, themeType, isDarkMode, isSystemTheme, setTheme, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Optional: Higher Order Component for class components
export const withTheme = (Component) => {
  return function WrappedComponent(props) {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
};

// Optional: Custom hook for theme-aware styling
export const useThemeStyles = (lightStyles, darkStyles) => {
  const { isDarkMode } = useTheme();
  return isDarkMode ? darkStyles : lightStyles;
};

// Optional: Component to render children based on theme
export const ThemeAware = ({ light, dark, children }) => {
  const { isDarkMode } = useTheme();
  
  if (children) {
    return children;
  }
  
  return isDarkMode ? dark : light;
};