/**
 * @file main.tsx
 */

// Components
import App from './App.tsx';

// Vendors
import {createRoot} from 'react-dom/client';

createRoot(document.getElementById('container')!).render(
    <App/>
);
