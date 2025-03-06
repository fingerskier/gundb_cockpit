import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GunProvider } from 'api/gunContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GunProvider>
      <App />
    </GunProvider>
  </StrictMode>,
)
