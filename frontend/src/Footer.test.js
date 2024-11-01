import { render, screen } from '@testing-library/react';
import Footer from './components/Footer';

test('renders the landing page', () => {
  render(<Footer />);
  expect(screen.getByText(/Jinming Xing, Krisha Patel, Shreyas Devaraj/i)).toBeInTheDocument
});