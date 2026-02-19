'use client';

export interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
}

export interface Settings {
  city: string;
  country: string;
  method: number;
  darkMode: boolean;
  notifications: boolean;
}

export interface AppState {
  completedJuz: number[];
  daysFasted: number[];
  goals: Goal[];
  settings: Settings;
}

const STORAGE_KEY = 'ramadan-companion-2026';

const defaultState: AppState = {
  completedJuz: [],
  daysFasted: [],
  goals: [
    { id: 'quran', title: 'Complete the Quran', target: 30, current: 0, unit: 'Juz' },
    { id: 'taraweeh', title: 'Pray Taraweeh Daily', target: 30, current: 0, unit: 'days' },
    { id: 'sadaqah', title: 'Give Sadaqah Weekly', target: 4, current: 0, unit: 'weeks' },
    { id: 'book', title: 'Read an Islamic Book', target: 100, current: 0, unit: 'pages' },
  ],
  settings: {
    city: 'Durban',
    country: 'South Africa',
    method: 3,
    darkMode: true,
    notifications: false,
  },
};

export function getState(): AppState {
  if (typeof window === 'undefined') return defaultState;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultState;
    const parsed = JSON.parse(stored);
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
}

export function setState(update: Partial<AppState>): void {
  if (typeof window === 'undefined') return;
  const current = getState();
  const next = { ...current, ...update };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function toggleJuz(juzNumber: number): number[] {
  const state = getState();
  const completed = state.completedJuz.includes(juzNumber)
    ? state.completedJuz.filter((j) => j !== juzNumber)
    : [...state.completedJuz, juzNumber];
  setState({ completedJuz: completed });
  return completed;
}

export function toggleFasted(day: number): number[] {
  const state = getState();
  const fasted = state.daysFasted.includes(day)
    ? state.daysFasted.filter((d) => d !== day)
    : [...state.daysFasted, day];
  setState({ daysFasted: fasted });
  return fasted;
}

export function updateGoal(goalId: string, current: number): Goal[] {
  const state = getState();
  const goals = state.goals.map((g) =>
    g.id === goalId ? { ...g, current: Math.min(current, g.target) } : g
  );
  setState({ goals });
  return goals;
}

export function addGoal(goal: Goal): Goal[] {
  const state = getState();
  const goals = [...state.goals, goal];
  setState({ goals });
  return goals;
}

export function removeGoal(goalId: string): Goal[] {
  const state = getState();
  const goals = state.goals.filter((g) => g.id !== goalId);
  setState({ goals });
  return goals;
}

export function updateSettings(settings: Partial<Settings>): Settings {
  const state = getState();
  const updated = { ...state.settings, ...settings };
  setState({ settings: updated });
  return updated;
}
