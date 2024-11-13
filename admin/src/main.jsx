import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import AdminContextProvider from './context/AdminContext.jsx'
import ServiceContextProvider from './context/ServiceContext.jsx'
import AppContextProvider from './context/AppContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <ServiceContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </ServiceContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
)
