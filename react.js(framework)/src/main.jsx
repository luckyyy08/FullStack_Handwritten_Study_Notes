import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FunctionDemo from './FunctionDemo.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FunctionDemo />

  </StrictMode>,
)
