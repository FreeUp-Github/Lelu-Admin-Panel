import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function RedirectAuthenticated({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  if (auth.hasToken && location.state) {
    return <Navigate to="/panel/rooms" state={{ from: location }} replace />;
  }

  return children;
}

export { RedirectAuthenticated };
