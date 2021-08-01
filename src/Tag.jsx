import React from "react";
import { StyledTag, types as tagTypes, states as tagStates } from "./Tag.styled";

export const types = tagTypes;
export const states = tagStates;

function Tag({ type = types.regular, state = states.regular, children }) {
  return (
    <StyledTag type={type} state={state}>
      {children}
    </StyledTag>
  );
}

export default Tag;
