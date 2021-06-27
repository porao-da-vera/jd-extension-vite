import styled from "styled-components";
import { COLORS } from "./constants";
import { lighten } from "polished";

export const StyledBroadcasterForm = styled.form`
  width: 100%;
  color: #000;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 320px;

  input {
    font-size: 24px;
    box-sizing: border-box;
    background-color: #fff;
    border: 2px solid ${COLORS.PURPLE};
    border-radius: 8px;
    flex-grow: 1;
    width: 100%;
    padding: 0;
    outline: 0;
    padding: 4px;
    text-indent: 8px;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: calc(50% - 10px);
  &:first-child {
    margin-right: 20px;
  }
`;

export const CloseList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s;
  color:${COLORS.RED};
  border: solid 1px ${COLORS.RED};
  border-radius: 6px;
  padding: 0.3rem;
  & svg {
    fill: ${COLORS.RED};
  }
  &:hover {
    background: ${lighten(0.1, COLORS.RED)};    
    color: #fff;
    svg {
      fill: #fff;
    }
  }  
`;

export const BroadcasterFormActions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 1rem;
  padding: 0 1rem;
  left: 0;
  button {
    flex-basis: 50%;
    margin-top: 0;
  }
`;
