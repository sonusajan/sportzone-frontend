import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
   <GoogleOAuthProvider clientId='1090079398709-b7he8jghg6fcrnqi45qbomv38tqgt6je.apps.googleusercontent.com'> <App /></GoogleOAuthProvider>
    </BrowserRouter>
   
  </React.StrictMode>
);


