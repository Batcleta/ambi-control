import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../helpers/api";
import CLientsTable from "../components/themes/CLientsTable";
import { useForm } from "react-hook-form";
import { usePageChange } from "../helpers/AuthContext";
import { useAuth, useSearch } from "../helpers/AuthContext";

function Dashboard(props) {
  const { authState } = useAuth();
  const { search } = useSearch();
  // const [search, setSearch] = useState("");
  const { page, changePage } = usePageChange();
  const [loading, setLoading] = useState();
  const [posts, setPosts] = useState([]);
  const [deleteModal, setDeleteModal] = useState({
    id: undefined,
    status: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoading(true);

    if (authState.username !== "") {
      api
        .get("/clients", {
          headers: {
            apiKey: localStorage.getItem("apiKey"),
          },
          params: { page: page.currentPage - 1, search },
        })
        .then((resp) => {
          const totalPages = [...Array(resp.data.totalPages).keys()].map(
            (num) => num + 1
          );
          setPosts(resp.data.clients);
          changePage({ ...page, totalPages: totalPages });
        });
    }

    setLoading(false);
  }, [page.currentPage, search, authState]);

  const onSubmit = (data) => {
    if (
      deleteModal.status &&
      deleteModal.id &&
      deleteModal.id === data.deletedSerial
    ) {
      api
        .delete(`/clients/delete/${deleteModal.id}`, {
          headers: {
            apiKey: localStorage.getItem("apiKey"),
          },
        })
        .then(() => {
          setPosts(
            posts.filter((item) => {
              return item.PK_SERIAL != deleteModal.id;
            })
          );
        });
      setDeleteModal({ status: false, id: undefined });
    }
  };

  return (
    <div>
      <DeletedModal deleteModal={deleteModal.status}>
        <div>
          <h2>Deseja mesmo excluir as informações de cliente? </h2>
          <p>
            Ao clicar em excluir, os dados de serial e as permissões de uso cos
            produtos ambisoft serão perdidas
          </p>
          <div>
            <p>Confirme o serial do cliente para continuar</p>
            <form id="serialField" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                {...register(`deletedSerial`, {
                  required: true,
                  validate: {
                    serialCheck: (serial) => {
                      if (serial === deleteModal.id) {
                        return true;
                      }
                      return false;
                    },
                  },
                })}
              />
              {errors?.deletedSerial?.type === "required" && (
                <small>Informe um serial válido</small>
              )}

              {errors.deletedSerial?.type === "serialCheck" && (
                <small style={{ fontSize: ".8rem" }}>
                  Informe um serial válido
                </small>
              )}
            </form>
          </div>
          <div>
            <button
              onClick={() =>
                setDeleteModal({
                  status: false,
                  id: undefined,
                })
              }
            >
              Voltar
            </button>
            <button type="submit" form="serialField">
              Excluir{" "}
            </button>
          </div>
        </div>
      </DeletedModal>
      <MainContainer>
        <Header pathName="inicio > cadastro de clientes">
          <HeaderContent>
            <MainTitle>
              <h2 style={{ fontWeight: "bold", color: "#5855d6" }}>
                Lista de clientes
              </h2>
            </MainTitle>

            <CountWrapper>{posts.length} resultados</CountWrapper>
          </HeaderContent>
        </Header>

        <CLientsTable>
          <ClientsContentTable>
            <ClientsContentHeader>
              <div>Razão Social</div>
              <div>serial</div>
              <div>Status</div>
              <div>Validade</div>
              <div>Versão</div>
            </ClientsContentHeader>
            <ClientsContentBody>
              {loading ? (
                <tr className="loading">Loading...</tr>
              ) : posts.length !== 0 ? (
                posts.map((post) => (
                  <ContentRow key={post.PK_SERIAL}>
                    <div>
                      <p className="RAZAO_SOCIAL">{post.RAZAO_SOCIAL}</p>
                      <small>CNPJ: {post.CNPJ_CPF}</small>
                    </div>

                    <div>{post.PK_SERIAL}</div>
                    <div>{post.STATUS === "A" && "Ativo"}</div>
                    <div>{post.VALIDADE}</div>
                    <div>{post.VERSAO_PDV}</div>

                    <div className="btn-group">
                      <p
                        className="btn btn-edit"
                        onClick={() =>
                          props.history.push(`/cadastro/${post.PK_SERIAL}`)
                        }
                      >
                        <i class="uil uil-pen"></i>
                      </p>
                      <p
                        className="btn btn-delete"
                        onClick={() =>
                          setDeleteModal({ id: post.PK_SERIAL, status: true })
                        }
                      >
                        <i class="uil uil-trash-alt"></i>
                      </p>
                    </div>
                  </ContentRow>
                ))
              ) : (
                <td />
              )}
            </ClientsContentBody>
          </ClientsContentTable>
        </CLientsTable>
      </MainContainer>
    </div>
  );
}

export default Dashboard;

const MainContainer = styled.div`
  padding: 4rem 2rem 0rem;
  display: grid;
  gap: 2rem;
`;
const Header = styled.header``;
const MainTitle = styled.div``;
const HeaderContent = styled.div``;
// Filtros
const CountWrapper = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 0.6rem;
`;

const ClientsContentTable = styled.div``;

const ClientsContentHeader = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 18fr 8fr 5fr 5fr 4fr 4fr;

  padding: 1rem 1.5rem;
  margin-bottom: 1rem;

  border-radius: 0.5rem;
  background: white;
  box-shadow: 9.9px 11.1px 2.2px rgba(0, 0, 0, -0.01),
    14.3px 16px 5.3px rgba(0, 0, 0, -0.015),
    15.9px 17.9px 10px rgba(0, 0, 0, -0.015),
    16.3px 18.4px 17.9px rgba(0, 0, 0, -0.006),
    17px 19.1px 33.4px rgba(0, 0, 0, 0.018), 24px 27px 80px rgba(0, 0, 0, 0.07);

  div {
    font-weight: 700;
    font-size: 0.9rem;
  }
`;

const ClientsContentBody = styled.div`
  display: grid;
  gap: 0.3rem;
`;

const ContentRow = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 18fr 8fr 5fr 5fr 4fr 4fr;
  align-items: center;

  padding: 0.8rem 1.5rem;
  font-size: 0.8rem;

  border-radius: 0.5rem;
  background: white;
  box-shadow: 9.9px 11.1px 2.2px rgba(0, 0, 0, -0.01),
    14.3px 16px 5.3px rgba(0, 0, 0, -0.015),
    15.9px 17.9px 10px rgba(0, 0, 0, -0.015),
    16.3px 18.4px 17.9px rgba(0, 0, 0, -0.006),
    17px 19.1px 33.4px rgba(0, 0, 0, 0.018), 24px 27px 80px rgba(0, 0, 0, 0.07);

  p.RAZAO_SOCIAL {
    font-size: 1rem;
    margin-bottom: 0.2rem;
    font-weight: 600;
  }

  small {
    font-size: 0.7rem;
    font-weight: 500;
  }

  div.btn-group {
    display: flex;
    gap: 0.4rem;
    p.btn-edit {
      cursor: pointer;
      i.uil-pen {
        padding: 0.35rem 0.4rem;
        border-radius: 0.3rem;
        background: rgba(0, 0, 255, 0.2);
        color: rgba(0, 0, 255, 1);
        font-size: 1rem;
      }
    }
    p.btn-delete {
      cursor: pointer;
      i.uil-trash-alt {
        padding: 0.35rem 0.4rem;
        border-radius: 0.3rem;
        background: rgba(255, 0, 0, 0.2);
        color: rgba(255, 0, 0, 1);
        font-size: 1rem;
      }
    }
  }
`;

const DeletedModal = styled.div`
  position: fixed;
  width: 90vw;
  height: 93vh;
  background: rgba(0, 0, 0, 0.3);
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  visibility: ${({ deleteModal }) => (deleteModal ? " visible" : "hidden")};
  opacity: ${({ deleteModal }) => (deleteModal ? " 1" : "0")};
  transform: ${({ deleteModal }) => (deleteModal ? "scale(1)" : "scale(0)")};

  > div {
    position: fixed;
    top: calc(-50vh + 50%);
    bottom: calc(-50vh + 50%);
    left: calc(-50vw + 50%);
    right: calc(-50vw + 50%);

    margin: auto;

    background: rgba(255, 255, 255, 1);
    border-radius: 0.6rem;
    padding: 2rem;

    width: ${({ deleteModal }) => (deleteModal ? "25rem" : "0rem")};
    height: ${({ deleteModal }) => (deleteModal ? " 20rem" : "0rem")};

    display: grid;
    gap: 1.5rem;
    justify-items: center;
    align-content: center;

    text-align: center;

    > p {
      font-size: 0.8rem;
    }

    > h2 {
      font-size: 1.5rem;
      font-weight: 700;
    }

    > div {
      display: flex;
      gap: 1rem;
    }
  }
`;
