import "jest-environment-jsdom";
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom";
import { TextEncoder } from 'util';

// Add global declarations for TypeScript
declare global {
  var TextEncoder: typeof TextEncoder;
  var TextDecoder: typeof TextDecoder;
}

global.TextEncoder = TextEncoder;