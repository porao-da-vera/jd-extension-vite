import styled, { keyframes } from "styled-components";
import { COLORS } from "./constants";

export const StatusWrapper = styled.div`
  position: relative;
  display: flex;  
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  height: 40px;
`;

export const StatusToggle = styled.div`
  margin-left: 0.5rem;
  display: flex;
  flex-direction: row;
  width: 50%;
`;

export const ConfigBroadcaster = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  user-select: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: background 0.5s;

  &:hover {
    background: #dddd;
  }

  svg {
    fill: ${COLORS.LIGHT_PURPLE};
  }
`;

const show = keyframes`
  from{
    opacity:0;
  }
  to{
    opacity:1;

  }

`;
export const ConfigContainer = styled.div`
  position: absolute;
  width: 100%;
  min-height: 250px;
  background: #fff;
  z-index: 1;
  top: 41px;
  right: 0;
  border: 2px solid ${COLORS.DARK_PINK};
  border-radius: 6px;
  animation: ${show} 0.2s ease;
  padding: 1rem;
  z-index: 100;
  max-width: 340px;

  label {
    font-size: 1rem;
  }
  button {
    font-size: 18px;
    flex-basis: 100%;
    margin-top: 1.5rem;
    padding: 6px;
  }
`;
