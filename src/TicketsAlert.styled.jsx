import styled from "styled-components";
import { COLORS } from "./constants";

export const Wrapper = styled.div`
  border: 2px solid ${COLORS.DARK_PINK};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Alert = styled.div`
  text-align: center;
`;
