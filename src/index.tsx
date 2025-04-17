import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_AUDIENCE } from "./env";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Auth0Provider
          domain={AUTH0_DOMAIN}
          clientId={AUTH0_CLIENT_ID}
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: AUTH0_AUDIENCE,
            scope: "openid profile email",
          }}
          cacheLocation="localstorage"
          onRedirectCallback={(appState) => {
            window.history.replaceState(
              {},
              document.title,
              appState?.returnTo || "/"
            );
            window.location.reload();
          }}
        >
          <App />
        </Auth0Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
