import React from "react";
import StyledButton, { btnVariants } from "./Button.style";
import { COLORS } from "./constants";

const Button = ({
  children,
  onClick,
  color = "#fff",
  bgColor = COLORS.DARK_PINK,
  variant = btnVariants.raised,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      color={color}
      bgColor={bgColor}
      variant={btnVariants[variant]}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
