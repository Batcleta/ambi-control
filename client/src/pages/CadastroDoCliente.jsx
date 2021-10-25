import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../helpers/api";

// useParams
function CadastroDoCliente() {
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/clients/${id}`, {
        headers: {
          apiKey: localStorage.getItem("apiKey"),
        },
      })
      .then((resp) => {
        console.log(resp.data);
      });
  });

  return <div></div>;
}

export default CadastroDoCliente;
