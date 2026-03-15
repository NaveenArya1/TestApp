import { create } from 'zustand';

interface TimerStore {
  timeLeft: number;
  isRunning: boolean;
  setTimeLeft: (time: number) => void;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: (initialTime: number) => void;
}

export const useTimerStore = create<TimerStore>((set) => ({
  timeLeft: 0,
  isRunning: false,

  setTimeLeft: (time) => set({ timeLeft: time }),

  startTimer: () => set({ isRunning: true }),

  stopTimer: () => set({ isRunning: false }),

  resetTimer: (initialTime) =>
    set({ timeLeft: initialTime, isRunning: false }),
}));