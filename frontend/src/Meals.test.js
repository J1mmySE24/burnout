import { render, screen } from '@testing-library/react';
import Meals from './components/Meals';

test('renders the landing page', () => {
  // Mocking state with a token
  const mockState = { token: 'mockToken' };

  // Render Meals with the mock state
  render(<Meals state={mockState} dispatch={() => {}} />);
});
