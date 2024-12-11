import { jsx as _jsx } from "react/jsx-runtime";
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(_jsx(Auth0Provider, { domain: "dev-hx28tfgen1xje3pq.us.auth0.com", clientId: "ltsgF6xq4PJccTVWqDUZ1tlXjMrTrEec", authorizationParams: {
        redirect_uri: "localhost:4173",
        audience: "https://dev-hx28tfgen1xje3pq.us.auth0.com/api/v2/",
        scope: "read:current_user update:current_user_metadata"
    }, children: _jsx(App, {}) }));
