import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import api from "../helpers/api";
import { useHistory } from "react-router-dom";
import { useAuth } from "../helpers/AuthContext";

function Login() {
  const history = useHistory();
  const { setAuthState } = useAuth();
  const [loginError, setLoginError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    api.post("/users/login", data).then((resp) => {
      if (resp.data.error) {
        setLoginError(resp.data);
      } else {
        localStorage.setItem("apiKey", resp.data.apiKey);
        setAuthState({
          username: resp.data.username,
          id: resp.data.id,
          authorization: resp.data.authorization,
          status: true,
        });
        history.push("/dashboard");
      }
    });
  };

  return (
    <LoginWrapper>
      <LoginContainer>
        <h3>Login</h3>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <label>Cu do arthur</label>
            <input
              placeholder="Informe seu usuário"
              {...register(`username`, {
                required: true,
              })}
            />
            {errors?.username && <small>Informe seu nome de usuário</small>}
          </FormGroup>
          <FormGroup>
            <label>Senha</label>
            <input
              type="password"
              {...register(`password`, {
                required: true,
              })}
            />
            {errors?.password && <small>Informe sua senha</small>}
          </FormGroup>
          {loginError && (
            <>
              <small>{loginError.error}</small>
              <br />
            </>
          )}

          <SubmitButton type="submit">Entrar</SubmitButton>
        </FormWrapper>
      </LoginContainer>
    </LoginWrapper>
  );
}

export default Login;

const LoginWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  height: 100vh;
`;
const LoginContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;

  display: grid;
  gap: 1rem;

  box-shadow: 9.9px 11.1px 2.2px rgba(0, 0, 0, -0.01),
    14.3px 16px 5.3px rgba(0, 0, 0, -0.015),
    15.9px 17.9px 10px rgba(0, 0, 0, -0.015),
    16.3px 18.4px 17.9px rgba(0, 0, 0, -0.006),
    17px 19.1px 33.4px rgba(0, 0, 0, 0.018), 24px 27px 80px rgba(0, 0, 0, 0.07);
`;
const FormWrapper = styled.form`
  display: grid;
  gap: 1rem;
`;
const FormGroup = styled.div`
  display: grid;
  gap: 0.3rem;

  input {
    padding: 0.8rem;
  }
`;
const SubmitButton = styled.button``;
