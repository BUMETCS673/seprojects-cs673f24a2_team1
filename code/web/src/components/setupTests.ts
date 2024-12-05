// jest-dom adds custom jest matchers for asserting on DOM nodes.
// Allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import * as styledComponents from 'styled-components';

jest.mock('styled-components', () => {
  const actualStyledComponents = jest.requireActual<typeof styledComponents>('styled-components');
  return {
    ...actualStyledComponents,
    default: actualStyledComponents,
  };
});
