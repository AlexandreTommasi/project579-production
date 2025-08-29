import { create } from 'zustand';

interface AppState {
  // Exemplo de estado global
  user: { name: string } | null;
  login: (name: string) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  login: (name) => set({ user: { name } }),
  logout: () => set({ user: null }),
}));
