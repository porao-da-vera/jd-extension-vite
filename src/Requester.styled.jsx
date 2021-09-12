import styled from "styled-components";
import { COLORS } from "./constants";

export const Wrapper = styled.div`
  ${(props) => {
    if (props.danced) {
      return `
      opacity:.5;      
      `;
    }
  }}
  color: #fff;
  margin-top: -5px;
`;

export const Name = styled.div`
  box-sizing: border-box;
  width: calc(100% - 24px);
  text-align: center;
  position: relative;
  margin: 0 12px;
  padding: 4px;
  font-size: 14px;
  background-color: ${COLORS.BLUE};
  color: #fff;
  z-index: 0;
  border-radius: 0 0 5px 5px;
`;
