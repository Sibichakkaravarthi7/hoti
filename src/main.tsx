import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import customTheme from './theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactQueryProvider from './provider/ReactQueryProvider';
import '@fontsource/work-sans/200.css';
import '@fontsource/work-sans/400.css';
import '@fontsource/work-sans/500.css';
import '@fontsource/work-sans/600.css';
import '@fontsource/work-sans/700.css';
import '@fontsource/work-sans/800.css';
import App from './App';
import "./styles/style.css";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    // <GoogleOAuthProvider clientId={"import.meta.env.VITE_GOOGLE_APP_ID"}>
      <ChakraProvider theme={customTheme}>
        <ReactQueryProvider>
          <App />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </ReactQueryProvider>
      </ChakraProvider>
    // </GoogleOAuthProvider>
  // </React.StrictMode>
);
