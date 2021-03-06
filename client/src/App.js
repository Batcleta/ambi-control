import "./App.css";
import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
// helpers
import api from "./helpers/api";
import { useAuth } from "./helpers/AuthContext";
// pages
import Login from "./pages/Login";
import DashBoard from "./pages/Dashboard";
import IncluirCadastro from "./pages/IncluirCadastro";
import CadastroDoCliente from "./pages/CadastroDoCliente";
// components
import SideMenu from "./components/themes/SideMenu";
import MainContent from "./components/themes/MainContent";
import styled from "styled-components";
import TopBar from "./components/themes/TopBar";

function App() {
  const history = useHistory();
  const { authState, setAuthState } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("apiKey")) {
      api
        .get("/users/auth", {
          headers: {
            apiKey: localStorage.getItem("apiKey"),
          },
        })
        .then((resp) => {
          if (resp.data.error) {
            setAuthState({
              ...authState,
              status: false,
            });
            history.push("/");
          } else {
            setAuthState({
              username: resp.data.username,
              id: resp.data.id,
              authorization: resp.data.authorization,
              status: true,
            });
            history.push("/dashboard");
          }
        });
    } else {
      history.push("/");
    }
  }, []);

  return (
    <AppWrapper>
      {authState.status && <SideMenu />}
      <MainContent>
        {authState.status && <TopBar />}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={DashBoard} />
          <Route exact path="/adicionar" component={IncluirCadastro} />
          <Route exact path="/cadastro/:id" component={CadastroDoCliente} />
        </Switch>
      </MainContent>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: "sideMenu mainContent";
`;
