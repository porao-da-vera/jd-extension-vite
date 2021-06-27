import React from "react";
import { Header, Title, CornerRight, CornerLeft } from "./ListHeader.styled";
import TicketIcon from "./TicketIcon";
import IconButton from "./IconButton";
import { ArrowBack, LibraryMusic } from "./icons";
import { LIST_STATUS } from "./constants";

const RightBtn = ({
  isRequestView,
  showTickets,
  listStatus,
  tickets,
  handleRequestClick,
}) => {
  if (isRequestView && showTickets) {
    return (
      <>
        {tickets}&nbsp;
        <TicketIcon color="#fff" size="12" />
      </>
    );
  }
  if (listStatus !== LIST_STATUS.PAUSED && !isRequestView) {
    return (
      <IconButton
        iconColor="#fff"
        color="#fff"
        size={24}
        onClick={handleRequestClick}
      >
        <LibraryMusic />
      </IconButton>
    );
  }
  return null;
};

const ListHeader = ({
  tickets,
  handleRequestClick,
  isRequestView,
  listStatus,
  showTickets,
}) => {
  return (
    <Header>
      <Title>
        <CornerLeft>
          {isRequestView && (
            <IconButton
              iconColor="#fff"
              color="#fff"
              size={24}
              onClick={handleRequestClick}
            >
              <ArrowBack />
            </IconButton>
          )}
        </CornerLeft>
        <span>Just Dance Track list</span>
        <CornerRight>
          <RightBtn
            showTickets={showTickets}
            isRequestView={isRequestView}
            listStatus={listStatus}
            tickets={tickets}
            handleRequestClick={handleRequestClick}
          />
        </CornerRight>
      </Title>
    </Header>
  );
};

export default ListHeader;
