import styled from "styled-components";
import { rgba, lighten, invert } from "polished";

export const IconButtonWrapper = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  padding: 0;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.active ? props.iconColor : rgba(props.color, 0)};
  transition: all 150ms ease;
  cursor: pointer;
  & > * {
    width: ${(props) => props.size - 4}px;
    height: ${(props) => props.size - 4}px;
    fill: ${(props) => props.active ? invert(props.color) : props.iconColor };
  }
  &:hover {
    background-color: ${(props) => props.active ? lighten(0.2, props.iconColor) : rgba(props.color, 0.15)};
  }
`;
