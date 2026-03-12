import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard greeting', () => {
  render(<App />);
  const greeting = screen.getByText(/Good morning, Alex/i);
  expect(greeting).toBeInTheDocument();
});
