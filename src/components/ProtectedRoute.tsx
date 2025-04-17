import { useAuth0 } from "@auth0/auth0-react";
import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { Spinner } from "./Spinner";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
