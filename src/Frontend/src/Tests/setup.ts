import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest';
import { useDarkMode } from '../Contexts/DarkModeContext';

vi.mock('../Contexts/DarkModeContext', () => ({
  useDarkMode: vi.fn(),
}));

export const mockDarkMode = (overrides?: { background?: string; text?: string }) => {
  const defaultValues = {
    background: 'bg-white',
    text: 'text-black',
  };

  const mockReturnValue = { ...defaultValues, ...overrides };

  (useDarkMode as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
    colorSchemes: mockReturnValue,
  });
};