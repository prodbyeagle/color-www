import { create } from 'zustand';

export const useColorStore = create<{
	result: string[];
	format: 'hex' | 'rgb' | 'hsl' | 'oklch';
	setResult: (r: string[]) => void;
	setFormat: (f: 'hex' | 'rgb' | 'hsl' | 'oklch') => void;
}>((set) => ({
	result: [],
	format: 'hex',
	setResult: (result) => set({ result }),
	setFormat: (format) => set({ format }),
}));
