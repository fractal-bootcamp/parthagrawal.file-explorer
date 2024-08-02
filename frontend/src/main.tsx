import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ViewFile } from './routes/ViewFile.tsx'
import { ViewFolder } from './routes/ViewFolder.tsx'
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import styled from 'styled-components'

import { styleReset } from 'react95';



/* Pick a theme of your choice */
import original from 'react95/dist/themes/original';

/* Original Windows95 font (optional) */
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

const router = createBrowserRouter([

  {
    path: "/view-file",
    element: <ViewFile />,
  },
  {
    path: "/",
    element: <ViewFolder />,

  }
])

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
`;

const DesktopBackground = styled.div`
background: ${({ theme }) => theme.desktopBackground};
`;




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <DesktopBackground>
          <RouterProvider router={router} />

        </DesktopBackground>

      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>,
)
