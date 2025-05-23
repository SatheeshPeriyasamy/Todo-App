// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App.tsx';
// import './index.css';
// import ErrorBoundary from './ErrorBoundary.tsx';

// createRoot(document.getElementById('root')!).render(
//   <ErrorBoundary>
//     <App />
//   <StrictMode>
//     <App />
//   </StrictMode>
//   </ErrorBoundary>
// );


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './ErrorBoundary.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);