import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './auth'
import { EditorStateProvider } from './state/EditorState'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <EditorStateProvider>
        <App />
      </EditorStateProvider>
    </AuthProvider>
  </StrictMode>,
)
