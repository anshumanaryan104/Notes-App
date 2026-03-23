import { useTheme } from './ThemeContext';

export default function ThemeToggle() {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full
                 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200
                 shadow-lg hover:scale-105 transition-transform duration-200"
      aria-label="Toggle theme"
    >
      <span className="text-lg">{dark ? '☀️' : '🌙'}</span>
      <span className="text-sm font-medium">{dark ? 'Light' : 'Dark'}</span>
    </button>
  );
}
