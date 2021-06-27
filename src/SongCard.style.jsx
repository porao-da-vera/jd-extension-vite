import styled from "styled-components";
import { transparentize } from 'polished';

import { COLORS } from "./constants";

export const Card = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  background-color: ${(props) => props.danced ? transparentize(0.5, '#fff') : '#fff'};
  border: 3px solid ${(props) => props.danced ? transparentize(0.5, COLORS.DARK_PINK) : COLORS.DARK_PINK};
  border-radius: 8px;
  font-size: 14px;
  color: ${COLORS.DARK_GRAY};
  padding: 8px;
  margin: 4px 0;
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};
  transition: all 150ms ease;
  z-index: 1;
  overflow: hidden;
  & b {
    font-weight: bold;
    color: ${COLORS.GRAY};
    font-size: 12px;
  }
  `;

export const Thumb = styled.div`
  opacity: ${(props) => props.danced ? .5 : 1};
  position: relative;
  flex: 0 0 56px;
  width: 56px;
  height: 56px;
  & img {
    border-radius: 8px;
    width: 100%;
    height: 100%;
  }
  `;

export const Source = styled.span`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  padding: 2px 4px;
  font-size: 8px;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: bold;
  background-color: ${COLORS.DARK_PINK};
  color: #fff;
  letter-spacing: 0.07em;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: 16px;
  width: calc(100% - 64px - 16px);
  flex: 1 1 calc(100% - 64px - 16px);
  opacity: ${(props) => props.danced ? .5 : 1};
  & p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    margin: 0;
  }
  `;

export const Difficulty = styled.div`
  display: inline-flex;
  padding: 2px 4px;
  border-radius: 4px;
  background-color: ${props => props.banned ? COLORS.RED : COLORS.GRAY};
  font-size: 10px;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 0.07em;
  align-items: center;
  margin-right: 4px;
  `;
