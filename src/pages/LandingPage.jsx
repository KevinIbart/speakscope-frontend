import { Landing } from "../components/LandingComponent/Landing";
import {useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
export function LandingPage() {
  const { isAuthenticated } = useAuth();

  // Redirect to home or dashboard if the user is already authenticated
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }
  return <Landing/>
}
