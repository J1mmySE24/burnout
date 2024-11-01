import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Events from './components/Events';

test('renders the landing page', () => {
  // Mocking state with a token
  const mockState = { token: 'mockToken' };

  // Render Meals within MemoryRouter to provide React Router context
  render(
    <MemoryRouter>
      <Events state={mockState} dispatch={() => {}} />
    </MemoryRouter>
  );
});