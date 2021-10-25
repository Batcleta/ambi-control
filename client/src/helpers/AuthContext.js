import { createContext, useContext } from "react";
import { useState } from "react";

const AuthContext = createContext("");

export default function AuthProvider({ children }) {
  const [page, changePage] = useState({
    currentPage: 1,
    totalPages: [],
  });
  const [search, getSearch] = useState();
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    authorization: "",
    status: false,
  });
  return (
    <AuthContext.Provider
      value={{
        pages: { page, changePage },
        authentication: { authState, setAuthState },
        searchInput: { search, getSearch },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { authState, setAuthState } = context.authentication;
  return { authState, setAuthState };
};

export const usePageChange = () => {
  const context = useContext(AuthContext);
  const { page, changePage } = context.pages;
  return { page, changePage };
};

export const useSearch = () => {
  const context = useContext(AuthContext);
  const { search, getSearch } = context.searchInput;
  return { search, getSearch };
};
