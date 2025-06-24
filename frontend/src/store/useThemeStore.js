import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'dark', // default theme
      setTheme: (themeKey) => set({ theme: themeKey }),
    }),
    {
      name: 'chatty-theme', // key in localStorage
      getStorage: () => localStorage, // (optional, default)
    }
  )
);
