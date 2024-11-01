import { render, screen } from '@testing-library/react';
import Landing from './components/Landing';

test('renders the landing page', () => {
    render(<Landing />);
});