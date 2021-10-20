import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import api from "../helpers/api";
import CLientsTable from "../components/themes/CLientsTable";
import { usePageChange } from "../helpers/AuthContext";
import { useAuth } from "../helpers/AuthContext";

function Dashboard() {
  const { authState } = useAuth();
  const [search, setSearch] = useState("");
  const { page, changePage } = usePageChange();
  const [loading, setLoading] = useState();
  const [posts, setPosts] = useState([]);

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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <>
        <Header pathName="inicio > cadastro de clientes">
          <div className="container">
            <MainTitle>
              <h2>Lista de clientes</h2>
            </MainTitle>
            <SearchWrapper>
              <SearchForm
                className="pesquisa"
                action="/"
                onSubmit={handleSubmit((data) => setSearch(data.search))}
              >
                <input
                  type="search"
                  name="search"
                  placeholder="nome, cnpj ou serial"
                  {...register(`search`, {
                    required: true,
                    // validation para strilgOnly
                  })}
                />
                <SearchButton>
                  <i className="fa fa-search">pesquisar</i>
                </SearchButton>
              </SearchForm>
              <FilterButtonWrapper>
                <FilterButton type="button">
                  <i className="fa fa-sort-alpha-down"></i>por nome
                </FilterButton>
                <FilterButton type="button">
                  <i className="fa"></i>por situação
                </FilterButton>
                <FilterButton type="button">
                  <i className="fa fa-filter"></i>filtro
                </FilterButton>
              </FilterButtonWrapper>

              {/* <Menu link="/add" name="incluir cadastro" /> */}
            </SearchWrapper>
          </div>
        </Header>

        <CLientsTable pages={[1, 2, 3, 4, 5, 6]}>
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th>Razão Social</th>
                  <th>Cnpj / Cpf</th>
                  <th>serial</th>
                  <th>Status</th>
                  <th>Validade</th>
                  <th>Versão</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <p className="loading">Loading...</p>
                ) : posts.length !== 0 ? (
                  posts.map((post) => (
                    <tr key={post.PK_SERIAL}>
                      <td>{post.RAZAO_SOCIAL}</td>
                      <td>{post.CNPJ_CPF}</td>
                      <td>{post.PK_SERIAL}</td>
                      <td>{post.STATUS}</td>
                      <td>{post.VALIDADE}</td>
                      <td>{post.VERSAO_PDV}</td>

                      <td className="text-center">
                        <div className="btn-group">
                          {/* <Link
                            to={`/edit/${post.PK_SERIAL}`}
                            className="btn btn-primary"
                          >
                            <i className="fa fa-edit"></i>
                          </Link>
                          <Link
                            to="/"
                            className="btn btn-danger"
                            onClick={() => deleteCLient(post.PK_SERIAL)}
                          >
                            <i className="fa fa-trash"></i>
                          </Link> */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <div>
                    <p>
                      Não foram encontrados resultados compatíveis com a sua
                      pesquisa...
                    </p>
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </CLientsTable>
      </>
    </div>
  );
}

export default Dashboard;

const Header = styled.header``;
const MainTitle = styled.div``;
const SearchWrapper = styled.div``;
// formulário
const SearchForm = styled.form``;
const SearchButton = styled.button``;
// Filtros
const FilterButtonWrapper = styled.div``;
const FilterButton = styled.button``;
