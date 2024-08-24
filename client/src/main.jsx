import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'sonner'
import { SocketProvider } from './Context/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
<SocketProvider>
    <App />
    <Toaster closeButton/>
</SocketProvider>
)
