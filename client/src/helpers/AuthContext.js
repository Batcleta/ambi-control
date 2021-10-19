import { createContext, useContext } from "react";
import { useState } from "react";

const AuthContext = createContext("");

export default function AuthProvider({ children }) {
  const [page, changePage] = useState(1);
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    authorization: "",
    status: false,
  });
  return (
    <AuthContext.Provider value={{ page, changePage, authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { authState, setAuthState } = context;
  return { authState, setAuthState };
};

export const usePageChange = () => {
  const context = useContext(AuthContext);
  const { page, changePage } = context;
  return { page, changePage };
};
