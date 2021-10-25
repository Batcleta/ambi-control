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
        <LogoWrapper>Logo</LogoWrapper>
        <NavWrapper>
          <NavLink to="/dashboard" activeClassName="activeLink">
            <i class="uil uil-estate"></i>
            <p>Inicio</p>
          </NavLink>
          <NavLink to="adicionar" activeClassName="activeLink">
            <i class="uil uil-book-medical"></i>
            <p>Incluir Cadastro</p>
          </NavLink>
        </NavWrapper>
        <LouOutWrapper>
          {authState.status && (
            <>
              <i class="uil uil-signout"></i>
              <div onClick={logOut}>Sair</div>
            </>
          )}
        </LouOutWrapper>
      </SideMenuWrapper>
    </div>
  );
}

export default SideMenu;

const SideMenuWrapper = styled.div`
  grid-area: sideMenu;
  background: #333269;
  width: 13rem;
  height: 100vh;

  padding: 2rem 1rem;

  display: grid;
  gap: 6rem;
  grid-template-rows: auto 1fr auto;

  button {
    margin-top: 1rem;
  }
`;

const LogoWrapper = styled.div``;

const NavWrapper = styled.div`
  display: grid;
  gap: 1.2rem;
  align-content: flex-start;

  a {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    padding: 0.8rem;
    border-radius: 0.8rem;

    transition: 0.5s;

    p {
      color: white;
      font-size: 0.9rem;
    }

    i {
      color: white;
      font-size: 1rem;
    }
  }
`;

const LouOutWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  transition: 0.3s;

  background: rgba(255, 255, 255, 0.9);

  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  color: #333269;

  cursor: pointer;

  :hover {
    transform: scale(1.02);
  }
`;
