import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm border border-gray-100 dark:border-slate-700"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-slate-600" />
      ) : (
        <Sun size={20} className="text-amber-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
