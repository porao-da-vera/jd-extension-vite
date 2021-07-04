import styled from "styled-components";

export const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 20px 0;
  min-height: 100px;
`;

export const CostConfigWrapper = styled.div`
  display: flex;
  & > * {
    flex-basis: 50%;
    width: 50%;
  }
`;