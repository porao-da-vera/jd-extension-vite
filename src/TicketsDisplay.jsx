import React from "react";

import { TicketButton } from "./TicketsDisplay.styled";
import { TicketIcon } from "./icons";
import Button from "./Button";

const TicketsDisplay = ({ type, tickets, ...props }) => {
  return (
    <Button {...props}>
      {type}
      &nbsp; {tickets}
    </Button>
  );
};

export default TicketsDisplay;
