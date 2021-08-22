import React from "react";
import SongCard from "./SongCard";
import { Container, BtnWrapper } from "./SelectedSong.styled";
import Button from "./Button";
import { COLORS } from "./constants";
import ListWarning from "./ListWarning";

const SelectedSong = ({
  addSongError,
  song,
  onCancel,
  onConfirm,
  canAddSong,
  tickets,
  dispatch,
}) => {
  const { perStream, perViewer } = canAddSong;

  if (addSongError) {
    return (
      <ListWarning
        buttonLabel="Back"
        onClick={() =>
          dispatch({ type: "setIsRequestView", payload: {
            view: false,
            difficulty:  0,
          } })
        }
      >
        This is already in the list
      </ListWarning>
    );
  }
  if (tickets <= song.cost) {
    return (
      <ListWarning
        buttonLabel="Back"
        onClick={() =>
          dispatch({ type: "setIsRequestView", payload: {
            view: false,
            difficulty: 0,
          } })
        }
      >
        This is already in the list
      </ListWarning>
    );
  }
  if (!perStream)
    return (
      <Container>
        <ListWarning>
          This stream have reached the maximum amount of songs set by the
          streamer.
        </ListWarning>
      </Container>
    );
  if (!perViewer)
    return (
      <Container>
        <ListWarning>
          You have reached the maximum amount of songs set by the streamer.
        </ListWarning>
      </Container>
    );
  return (
    <Container>
      <SongCard {...song} />
      <BtnWrapper>
        <Button bgColor={COLORS.RED} onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onConfirm} bgColor={COLORS.GREEN}>
          Confirm
        </Button>
      </BtnWrapper>
    </Container>
  );
};

export default SelectedSong;
