import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import api from "../helpers/api";
import CLientsTable from "../components/themes/CLientsTable";
import { usePageChange } from "../helpers/AuthContext";

function Dashboard() {
  const [search, setSearch] = useState("");
  const { page } = usePageChange();

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
          <div>Loading de página</div>
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
