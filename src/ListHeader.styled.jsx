import styled, { css } from "styled-components";

import { COLORS } from "./constants";

export const Header = styled.header`
  background-color: ${COLORS.PURPLE};
  padding: 4px 8px;
`;

export const Title = styled.div`
  display: flex;
  margin-bottom: 4px;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const sharedCornerStyle = css`
  width: 72px;
  height: 28px;
  display: flex;
  align-items: center;
`;

export const CornerRight = styled.div`
  ${sharedCornerStyle}
  justify-content: flex-end;
`;
export const CornerLeft = styled.div`
  ${sharedCornerStyle}
  justify-content: flex-start;
`;
