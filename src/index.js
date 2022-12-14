import React from 'react';
import  ReactDOM  from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './app/context/auth.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
)