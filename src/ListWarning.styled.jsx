import styled from "styled-components";
import { COLORS } from "./constants";

export const ListWarningWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ListWarningContent = styled.div`
  min-height: 100px;
  display: flex;
  align-items: center;
  padding: 16px;
  border: 3px solid ${COLORS.DARK_PINK};
  border-radius: 8px;
  text-align: center;
  margin: 16px;
  white-space: pre-line;
  flex-direction: column;

  button {
    margin-top: 1rem;
    padding: 0.2rem 1rem;
  }
`;
