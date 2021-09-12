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
  justify-content: stretch;
  align-items: center;
  text-align: center;
`;

const sharedCornerStyle = css`
  width: 28px;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const CornerRight = styled.div`
  ${sharedCornerStyle}
  justify-content: space-between;
`;

export const CornerLeft = styled.div`
  ${sharedCornerStyle}
  flex-grow: 1;
  justify-content: flex-start;
`;

export const Tikets = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  & > button {
    margin-right: 2px;
    font-size: 12px;
    &:last-child {
      margin-right: 0;
    }
  }
`;