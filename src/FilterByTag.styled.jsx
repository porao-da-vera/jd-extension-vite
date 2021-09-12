import styled from "styled-components";
import { COLORS } from "./constants";
import { rgba } from "polished";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;
export const SectionWrapper = styled.div`
  display: flex;
  padding: 4px 0 0;
  &:first-child {
    padding-top: 0;
  }
`;
export const Tag = styled.button`
  cursor: ${(props) => props.selected ? 'default' : 'pointer'};
  box-sizing: border-box;
  font-weight: bold;
  border: solid 2px ${(props) => (props.selected ? "transparent" : COLORS.GRAY)};
  display: inline-flex;
  padding: 2px 4px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.selected ? COLORS.GRAY : "transparent"};
  font-size: 10px;
  text-transform: uppercase;
  color: ${(props) => (props.selected ? "#fff" : COLORS.GRAY)};
  letter-spacing: 0.07em;
  align-items: center;
  margin-right: 4px;
  transition: all 150ms ease;
  &:hover {
    background-color: ${(props) => props.selected ? COLORS.GRAY : rgba(COLORS.GRAY, 0.2)};
  }
`;
