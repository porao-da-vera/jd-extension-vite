import React, { useEffect } from "react";
import { Header, Title, CornerRight, CornerLeft, Tikets } from "./ListHeader.styled";
import IconButton from "./IconButton";
import { ArrowBack, LibraryMusic } from "./icons";
import { LIST_STATUS, REWARDS } from "./constants";
import TicketsDisplay from "./TicketsDisplay";
import { useConfig } from "./TwitchExt";
import { COLORS } from './constants';

const RightBtn = ({
  isRequestView,
  showTickets,
  listStatus,
  tickets,
  handleRequestClick,
}) => {
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

  const config = useConfig();

  return (
    <Header>
      <Title>
          {isRequestView && (
        <CornerLeft>
            <IconButton
              iconColor="#fff"
              color="#fff"
              size={24}
              onClick={handleRequestClick}
            >
              <ArrowBack />
            </IconButton>
        </CornerLeft>
          )}
        <Tikets>
          {tickets &&
            Object.entries(tickets).reduce((acc, [key, value], index) => {
              if((key === REWARDS.BANNED && !config.useBanned) || (key === REWARDS.EXTREME && !config.useExtreme)) return acc;
              acc.push(<TicketsDisplay
                  bgColor={COLORS.GREEN}
                  key={index}
                  type={key}
                  tickets={value}
                  disabled={value === 0 || isRequestView}
                  onClick={(e) => handleRequestClick(e, key, value)}
                />
              );
              return acc;
            }, [])}
        </Tikets>
      </Title>
    </Header>
  );
};

export default ListHeader;
