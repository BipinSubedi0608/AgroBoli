import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuth() {
  const { currentUser, loading } = useContext(AuthContext);
  return { currentUser, loading };
}
