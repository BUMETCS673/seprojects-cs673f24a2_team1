import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState } from 'react';
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return (_jsx(AuthContext.Provider, { value: { isAuthenticated, setIsAuthenticated }, children: children }));
};
