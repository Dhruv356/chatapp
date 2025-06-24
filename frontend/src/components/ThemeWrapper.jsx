import { useEffect } from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { themes } from '../Theme';

const ThemeWrapper = ({ children }) => {
  const theme = useThemeStore((state) => state.theme);
  const currentTheme = themes[theme];

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--bg', currentTheme.background);
    root.style.setProperty('--text', currentTheme.text);
    root.style.setProperty('--primary', currentTheme.primary);
    root.style.setProperty('--accent-muted', currentTheme.accentMuted);
    root.style.setProperty('--surface', currentTheme.surface || '#1a1a24');
  root.style.setProperty('--hover', currentTheme.hover || '#2c2c44');
  root.style.setProperty('--border', currentTheme.border || '#2c2c3a');

root.style.setProperty('--muted', theme.muted || '#9ca3af');
      // Input + status color variables
    root.style.setProperty('--input-bg', currentTheme.inputBg || '#ffffff');
    root.style.setProperty('--input-text', currentTheme.inputText || '#111');
    root.style.setProperty('--input-border', currentTheme.inputBorder || '#9ca3af');
    root.style.setProperty('--muted-bg', currentTheme.mutedBg || '#d1d5db');
    root.style.setProperty('--muted-text', currentTheme.mutedText || '#6b7280');
    root.style.setProperty('--disabled', currentTheme.disabled || '#6ee7b7');
    root.style.setProperty('--danger', currentTheme.danger || '#ef4444');
  }, [currentTheme]);

  return <>{children}</>;
};

export default ThemeWrapper;
