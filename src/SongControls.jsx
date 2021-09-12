import React, { useState } from "react";
import { COLORS } from "./constants";

import { ControlWrapper } from "./songControls.styled";
import { DoneIcon, CloseIcon, ReturnIcon, BlockIcon } from "./icons";
import { IconButton } from "./songControls.styled";
import Spinner from './Spinner'

const SongControls = ({
  removeSong,
  changeSongStatus,
  songId,
  danced = false,
  showBanButton = false,
  onBanSong,
  showUnbanButton = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveSong = (songId) => {
    setIsLoading(true)
    removeSong(songId)
      .then((result) => setIsLoading(false))
      .catch((err) => setIsLoading(false));
  };

  const handleSongStatus = (songId, danced) => {
    setIsLoading(true)
    changeSongStatus(songId, danced).then(response =>{
      setIsLoading(false)
    }).catch(err =>{
      setIsLoading(false)
    })
  };

  return isLoading? <Spinner posAbsolute={true}/>: (
    <ControlWrapper>
      {danced ? (
        <>
          <IconButton
            color={COLORS.GREEN}
            onClick={() => handleSongStatus(songId, false)}
          >
            <ReturnIcon size={24} />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            onClick={() => handleSongStatus(songId, true)}
            color={COLORS.GREEN}
          >
            <DoneIcon />
          </IconButton>
          <IconButton
            onClick={() => handleRemoveSong(songId)}
            color={COLORS.RED}
          >
            <CloseIcon />
          </IconButton>
        </>
      )}
    </ControlWrapper>
  );
};

export default SongControls;
