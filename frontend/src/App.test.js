import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './components/App';


test('renders the landing page', () => {
    <MemoryRouter>
      <App />
    </MemoryRouter>
  });