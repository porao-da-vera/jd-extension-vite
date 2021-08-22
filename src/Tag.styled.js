import styled from "styled-components";
import { transparentize } from "polished";

import { COLORS } from "./constants";

export const types = {
  banned: "banned",
  regular: "regular",
};

export const states = {
  regular: "regular",
  disabled: "disabled",
};

const statesValues = {
  [states.regular]: 0,
  [states.disabled]: 0.8,
};
const typesValues = {
  [types.regular]: COLORS.GRAY,
  [types.banned]: COLORS.RED,
};

export const StyledTag = styled.div`
  display: inline-flex;
  padding: 2px 4px;
  border-radius: 4px;
  background-color: ${(props) => transparentize(statesValues[props.state || states.regular], typesValues[props.type || types.regular])};
  font-size: 10px;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 0.07em;
  align-items: center;
  margin-right: 4px;
`;
