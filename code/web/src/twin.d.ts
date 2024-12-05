/// <reference types="react" />

import type { CSSProp } from 'styled-components';

// Twin Macro module declaration
declare module 'twin.macro' {
  const css: (strings: TemplateStringsArray, ...args: any[]) => CSSProp;
  const styled: typeof import('styled-components').default;
  const theme: (path: string) => string;
  export { css, styled, theme };
}

// Extend React's type definitions to support the `css` prop
declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp | string;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      css?: CSSProp | string;
    }
  }
}
