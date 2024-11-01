import { render } from '@testing-library/react';
import Resources from './components/Resources';

test('renders the landing page', () => {
  // Mocking state with a token
  const mockState = { token: 'mockToken' };

  // Render Resources with the mock state
  render(<Resources state={mockState} dispatch={() => {}} />);
});
