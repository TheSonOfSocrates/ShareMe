import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root'))

root.render(<GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH2_CLIENT_ID}>
  <Router>
    <App />
  </Router>
</GoogleOAuthProvider>);
