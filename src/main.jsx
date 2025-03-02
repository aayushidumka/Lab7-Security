// import asgardeo
import { AuthProvider } from "@asgardeo/auth-react";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// import context
import { AppProvider } from "./context/AppContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
   {/* wrap app in authprovider */}
   <AuthProvider
        config={ {
            signInRedirectURL: "http://localhost:5173/",
            signOutRedirectURL: "http://localhost:5173/",
            clientID: "9gQd8aPfanyHWS6gdDDZaNfowEYa",
            baseUrl: "https://api.asgardeo.io/t/aayushidumka",
            scope: [ "openid","profile" ]
        } }
    >
      <AppProvider>
        <App />
      </AppProvider>
    </AuthProvider>
  </StrictMode>,
)
