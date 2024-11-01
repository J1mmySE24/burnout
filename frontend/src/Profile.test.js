import { render, screen } from '@testing-library/react';
import Profile from './components/Profile';

test('renders the landing page', () => {
      // Mocking state with a token
      const mockState = { token: 'mockToken' };

      // Render Profile with the mock state
      render(<Profile state={mockState} dispatch={() => {}} />);
});