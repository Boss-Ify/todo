import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='max-w-[600px] mx-auto bg-gray-100'><App /></div>
  </React.StrictMode>
);
