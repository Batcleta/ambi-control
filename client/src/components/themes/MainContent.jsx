import React from "react";
import styled from "styled-components";

function MainContent(props) {
  return <MainContentWrapper>{props.children}</MainContentWrapper>;
}

export default MainContent;

const MainContentWrapper = styled.div`
  grid-area: mainContent;
`;
