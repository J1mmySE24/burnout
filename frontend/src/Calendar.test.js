import { render } from '@testing-library/react';
import calender from './components/calender';

test('renders the landing page', () => {
  // Mocking state with a token
  const mockState = { token: 'mockToken' };

  // Render calender with the mock state
  render(<calender state={mockState} dispatch={() => {}} />);
});
