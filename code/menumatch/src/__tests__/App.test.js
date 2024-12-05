import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('styled-components', () => {
  const actualStyledComponents = jest.requireActual('styled-components');
  return {
    ...actualStyledComponents,
    default: actualStyledComponents,
  };
});
jest.mock('twin.macro', () => () => '');

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/welcome/i);
  expect(welcomeElement).toBeInTheDocument();
});
