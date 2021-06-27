import styled from "styled-components";
import { COLORS } from "./constants";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 5px;
  border: 3px solid ${COLORS.DARK_PINK};
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const PermissionInfo = styled.div`
  margin-bottom: 50px;
`;
