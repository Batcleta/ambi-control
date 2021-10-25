import React from "react";
import api from "../helpers/api";
import { useForm } from "react-hook-form";
import styled from "styled-components";

function IncluirCadastro(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    api
      .post("/clients", data, {
        headers: {
          apiKey: localStorage.getItem("apiKey"),
        },
      })
      .then((resp) => {
        console.log(resp);
        props.history.push("/dashboard");
      });
  };

  return (
    <div>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label>CNPJ_CPF</label>
          <input
            placeholder="Informe o CNPJ_CPF"
            {...register(`CNPJ_CPF`, {
              required: true,
            })}
          />
          {errors?.CNPJ_CPF && <small>Informe seu nome de usuário</small>}
        </FormGroup>
        <FormGroup>
          <label>RAZAO_SOCIAL</label>
          <input
            placeholder="Informe o RAZAO_SOCIAL"
            {...register(`RAZAO_SOCIAL`, {
              required: true,
            })}
          />
          {errors?.RAZAO_SOCIAL && <small>Informe sua senha</small>}
        </FormGroup>

        <FormGroup>
          <label>STATUS</label>
          <input
            placeholder="Informe o STATUS"
            {...register(`STATUS`, {
              required: true,
            })}
          />
          {errors?.STATUS && <small>Informe sua senha</small>}
        </FormGroup>
        <FormGroup>
          <label>CONTR_DATE</label>
          <input
            type="date"
            placeholder="Informe o CONTR_DATE"
            {...register(`CONTR_DATE`, {
              required: true,
            })}
          />
          {errors?.CONTR_DATE && <small>Informe sua senha</small>}
        </FormGroup>

        <FormGroup>
          <label>NUM_TERMINAIS</label>
          <input
            type="number"
            placeholder="Informe o NUM_TERMINAIS"
            {...register(`NUM_TERMINAIS`, {
              required: true,
            })}
          />
          {errors?.NUM_TERMINAIS && <small>Informe sua senha</small>}
        </FormGroup>
        <FormGroup>
          <label>OBSERVACOES</label>
          <input
            placeholder="Informe o OBSERVACOES"
            {...register(`OBSERVACOES`, {
              required: true,
            })}
          />
          {errors?.OBSERVACOES && <small>Informe sua senha</small>}
        </FormGroup>

        <SubmitButton type="submit">Entrar</SubmitButton>
      </FormWrapper>
    </div>
  );
}

export default IncluirCadastro;

const FormWrapper = styled.form``;
const FormGroup = styled.div``;
const SubmitButton = styled.button``;
