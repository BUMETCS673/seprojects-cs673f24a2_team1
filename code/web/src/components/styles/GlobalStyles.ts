import { createGlobalStyle } from 'styled-components';
import tw, { css } from 'twin.macro';

const GlobalStyles = createGlobalStyle`
  ${tw`antialiased`}
  ${css`
    /* Tailwind base styles */
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    /* Below animations are for modal created using React-Modal */
    .ReactModal__Overlay {
      transition: transform 300ms ease-in-out;
      transition-delay: 100ms;
      transform: scale(0);
    }
    .ReactModal__Overlay--after-open {
      transform: scale(1);
    }
    .ReactModal__Overlay--before-close {
      transform: scale(0);
    }
  `}
`;

export default GlobalStyles;
