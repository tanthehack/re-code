import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './layouts/app.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { Home } from './layouts/home.jsx';
import { ImportCode } from './pages/importCode.jsx';
import { GitAuth } from './pages/gitAuth.jsx';
import { MainEditor } from './pages/editor.jsx';
import { Summary } from './pages/summary.jsx';
import { Landing } from './pages/landing.jsx';
import { Repos } from './pages/repos.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import { GitRedirect } from './pages/gitRedirect.jsx';
import Protected from './utils/protected.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Provider store={store}>
      <Home />
    </Provider>,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "import",
        element: <ImportCode />,
      },
      {
        path: "import/repos",
        element: <Repos />
      },
      {
        path: "gitauth",
        element:
          <Protected path="/import/repos">
            <GitAuth />,
          </Protected>
      },
      {
        path: "gitauth/redirect",
        element: <Protected path="/import/repos">
          <GitRedirect />,
        </Protected>
      },
      {
        path: "/summary",
        element: <Summary />
      }
    ]
  },
  {
    path: "/app",
    element: <App />,
    children: [
      {
        index: true,
        element: <MainEditor />
      },
    ]
  }, //app layout component
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer
      position="top-center"
      autoClose={1000}
      stacked
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={localStorage.getItem('color-theme')}
    />
    <RouterProvider router={router} />
  </React.StrictMode>
);
