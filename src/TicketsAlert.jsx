import React from "react";
import { Wrapper, Alert } from "./TicketsAlert.styled";

const TicketsAlert = () => {
  return (
    <Wrapper>
      <Alert>
        You need tickets to request songs. Buy some with channel points in the
        chat.
      </Alert>
    </Wrapper>
  );
};

export default TicketsAlert;
