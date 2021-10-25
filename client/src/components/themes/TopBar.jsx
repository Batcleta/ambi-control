import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useAuth, useSearch } from "../../helpers/AuthContext";

function TopBar() {
  const { authState } = useAuth();
  const { getSearch } = useSearch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (data.search) {
      getSearch(data);
    } else {
      getSearch(undefined);
    }
  };

  return (
    <TopBarWrapper>
      <SearchContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputContainer">
            <i class="uil uil-search"></i>
            <input
              placeholder="Pesquisar por nome do cliente, cnpj ou serial"
              {...register(`search`)}
            />
          </div>
          <button>Pesquisar</button>
        </form>
      </SearchContainer>
      <Messaging>| Messaging Section |</Messaging>

      <ProfileSection>
        <ProfileInfo>
          {authState.username && (
            <p className="userProfileName">{authState.username}</p>
          )}
          <small className="userProfileCargo">[Editar perfil]</small>
        </ProfileInfo>

        <ProfilePicture></ProfilePicture>
      </ProfileSection>
    </TopBarWrapper>
  );
}

export default TopBar;

const TopBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
  padding: 0.8rem 2rem;

  box-shadow: 0px 0px 2.2px rgba(0, 0, 0, 0.015),
    0px 0px 5.3px rgba(0, 0, 0, 0.024), 0px 0px 10px rgba(0, 0, 0, 0.032),
    0px 0.1px 17.9px rgba(0, 0, 0, 0.039), 0px 0.4px 33.4px rgba(0, 0, 0, 0.049),
    0px 1px 80px rgba(0, 0, 0, 0.07);
`;
const SearchContainer = styled.div`
  form {
    display: flex;
    align-items: center;
    gap: 1rem;

    .inputContainer {
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      i {
        color: #5855d6;
      }

      input {
        border: none;
        padding: 0.8rem 1rem;
        width: 23rem;

        ::placeholder {
          color: #8695a0;
        }
      }
    }

    button {
      border-radius: 2rem;
      padding: 0.5rem 1.5rem;
      max-height: 2rem;
      border: none;
      outline: none;
      background-color: #5855d6;
      color: white;
      cursor: pointer;
    }
  }
`;

const Messaging = styled.div`
  align-self: center;
`;
const ProfileSection = styled.div`
  display: flex;
  gap: 1rem;
`;
const ProfileInfo = styled.div`
  text-align: right;
  display: grid;
  align-items: center;

  p.userProfileName {
    font-weight: 900;
  }
  small.userProfileCargo {
    font-size: 0.7rem;
    color: #5855d6;
  }
`;
const ProfilePicture = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #5855d6;
`;
