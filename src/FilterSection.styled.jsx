import styled from "styled-components";
import { COLORS } from "./constants";

export const Filter = styled.div`
  display: flex;
  width: 100%;
  padding: 4px;
  flex-direction: column;
  border-bottom: solid 2px ${COLORS.PURPLE};
`;
export const Regular = styled.div`
  display: flex;
  margin-bottom: 4px;
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  height: 24px;
  border: 2px solid ${COLORS.PURPLE};
  margin-right: 4px;
  & input {
    box-sizing: border-box;
    background-color: white;
    border: none;
    border-radius: 8px;
    flex-grow: 1;
    padding: 0;
    outline: 0;
    padding: 4px;
    text-indent: 8px;
  }
  & select {
    border: none;
    flex-shrink: 0;
    margin-left: 4px;
    background-color: white;
    border-radius: 8px;
  }

  button {
    border: none;
    background: transparent;
    cursor: pointer;

    &:hover {
      fill: ${COLORS.RED};
    }
  }
`;
