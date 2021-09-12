import React from "react";
import { SpinnerStyled, SpinnerWrapper } from "./Spinner.styled";

const Spinner = ({posAbsolute = false}) => {
  return (
    <SpinnerWrapper posAbsolute={posAbsolute}>
      <SpinnerStyled />
    </SpinnerWrapper>
  );
};

export default Spinner;
