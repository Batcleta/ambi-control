import React from "react";
import styled from "styled-components";
import { usePageChange } from "../../helpers/AuthContext";

function CLientsTable(props) {
  const { page, changePage } = usePageChange();
  return (
    <>
      <ClientsList>{props.children}</ClientsList>
      <Pagination page={page.currentPage}>
        {page.totalPages
          ? page.totalPages.length > 1
            ? page.totalPages.map((numPage, key) => (
                <button
                  key={key}
                  onClick={() => changePage({ ...page, currentPage: numPage })}
                >
                  {numPage}
                </button>
              ))
            : ""
          : ""}
      </Pagination>
    </>
  );
}

export default CLientsTable;

const ClientsList = styled.div``;
const Pagination = styled.div`
  button:nth-child(${({ page }) => page}) {
    background-color: pink;
  }
`;
