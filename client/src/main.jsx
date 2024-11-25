import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fontsource-variable/dm-sans';
import App from './App.jsx'
import AuthenticatedLayout from './layouts/AuthenticatedLayout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthenticatedLayout />
  </StrictMode>,
)
