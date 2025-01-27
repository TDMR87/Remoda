import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest';
import { useAppContext } from '../Contexts/AppContext';

vi.mock('../Contexts/DarkModeContext', () => ({
  useDarkMode: vi.fn(),
}));

export const mockDarkMode = (overrides?: { background?: string; text?: string }) => {
  const defaultValues = {
    background: 'bg-white',
    text: 'text-black',
  };

  const mockReturnValue = { ...defaultValues, ...overrides };

  (useAppContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
    colorSchemes: mockReturnValue,
  });
};