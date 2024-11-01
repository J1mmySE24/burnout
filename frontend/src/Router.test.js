import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router from './components/Router';

test('renders the landing page', () => {
  <MemoryRouter >
  render(<Router />);
  </MemoryRouter>
});