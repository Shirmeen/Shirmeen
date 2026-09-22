import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio with Shirmeen elements', () => {
  render(<App />);
  const elements = screen.getAllByText(/shirmeen/i);
  expect(elements.length).toBeGreaterThan(0);
});
