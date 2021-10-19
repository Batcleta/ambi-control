import { useAuth } from "../../helpers/AuthContext";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";

function SideMenu() {
  const { authState, setAuthState } = useAuth();
  const history = useHistory();

  const logOut = () => {
    localStorage.removeItem("apiKey");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    history.push("/");
  };

  return (
    <div>
      <SideMenuWrapper>
        <p>{authState.username}</p>
        <div>
          <NavLink to="/">
            <p>Home</p>
          </NavLink>
          <NavLink to="/">
            <p>Incluir Cadastro</p>
          </NavLink>
        </div>
        {authState.status && <button onClick={logOut}>Logout</button>}
      </SideMenuWrapper>
    </div>
  );
}

export default SideMenu;

const SideMenuWrapper = styled.div`
  grid-area: sideMenu;
  width: 12rem;
`;
