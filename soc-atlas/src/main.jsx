import "./styles/index.css";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Consider extracting this logic into a separate file for better maintainability.
// Purpose: Tailwind global styles are imported via styles/index.css; default Vite CSS can be removed.
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
