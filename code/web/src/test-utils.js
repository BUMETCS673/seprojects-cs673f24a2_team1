import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
const AllTheProviders = ({ children }) => {
    return (_jsx(Router, { children: children }));
};
const customRender = (ui, options) => render(ui, Object.assign({ wrapper: AllTheProviders }, options));
export * from '@testing-library/react';
export { customRender as render };
