import React from "react";
import styled from "styled-components";
import { usePageChange } from "../../helpers/AuthContext";

function CLientsTable(props) {
  const { handlePageChange, pages, currentPage } = props;
  const { page, changePage } = usePageChange();
  return (
    <>
      <ClientsList>{props.children}</ClientsList>
      <Pagination page={page} className="container pagination">
        {pages || currentPage || handlePageChange
          ? pages.length > 1
            ? pages.map((numPage, key) => (
                <button key={key} onClick={() => changePage(numPage)}>
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
