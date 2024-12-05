// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
require('@testing-library/jest-dom');
jest.mock('styled-components', () => {
    const actualStyledComponents = jest.requireActual('styled-components');
    return {
      ...actualStyledComponents,
      default: actualStyledComponents,
    };
  });
  