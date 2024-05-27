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
import { Editor } from './pages/editor.jsx';
import { Summary } from './pages/summary.jsx';
import { Landing } from './pages/landing.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "import",
        element: <ImportCode />, //conditinally render the git repos in this component
      },
      {
        path: "gitauth",
        element: <GitAuth />,
      },
    ]
  },
  {
    path: "/app",
    element: <App />,
    children: [
      {
        index: true,
        element: <Editor />
      },
      {
        path: "summary",
        element: <Summary />
      }
    ]
  } //app layout component
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
