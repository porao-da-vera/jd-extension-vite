import React, { useEffect, useState } from "react";
import { Wrapper, IconWrapperCircle } from "./bannedControl.styled";
import BannedSongList from "./BannedSongList";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import { removeFromObject } from "./utils";
import useDebounce from "./useDebounce";

const IconWrapper = ({ children }) => (
  <IconWrapperCircle>{children}</IconWrapperCircle>
);

const BannedControl = ({ bannedIds, dispatch, bannedSongs, songList }) => {
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [filter, setFilter] = useState({searchString: "", mode: 0, difficulty: 0});
  const debounce = useDebounce(filter.searchString, 500);

  const handleBan = (song) => {
    const banned = { ...bannedSongs, [song.id]: song };
    dispatch({ type: "setBannedSongs", payload: banned });
  };

  const handleUnBan = ({ id }) => {
    const key = id;
    dispatch({
      type: "setBannedSongs",
      payload: removeFromObject(key, bannedSongs),
    });
  };

  useEffect(() => {
    const { searchString, difficulty, mode } = filter;
    const text = searchString.toLowerCase();
    const songs = songList.filter((song) => {
      if (
        (song.name.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
          song.artist.toLowerCase().indexOf(text.toLowerCase()) > -1) &&
        (!difficulty || difficulty === song.difficulty) &&
        (!mode || mode === song.coaches)
      )
        return song;
    });

    setFilteredSongs(songs);
  }, [debounce, filter.difficulty, filter.mode]);

  useEffect(() => {
    setFilteredSongs(songList);
  }, [songList]);

  useEffect(() => {
    if (bannedIds?.length > 0 && songList?.length > 0) {
      const bannedSongs = bannedIds.reduce((acc, curr) => {
        const song = songList.find((song) => song.id === curr);
        acc[curr] = song;
        return acc;
      }, []);
      dispatch({ type: "setBannedSongs", payload: bannedSongs });
    }
  }, [bannedIds, songList]);

  return (
    <Wrapper>
      <BannedSongList
        showOverlay={true}
        showFilter={true}
        title="Allowed"
        songList={filteredSongs.filter(
          (song) => !bannedSongs.hasOwnProperty(song.id)
        )}
        onClick={handleBan}
        setFilter={setFilter}
        filter={filter}
        overlay={
          <IconWrapper>
            <ArrowForwardIosRoundedIcon />
          </IconWrapper>
        }
      />
      <BannedSongList
        showOverlay={true}
        title="Banned"
        songList={Object.values(bannedSongs)}
        onClick={handleUnBan}
        overlay={
          <IconWrapper>
            <ArrowBackIosRoundedIcon />
          </IconWrapper>
        }
      />
    </Wrapper>
  );
};

export default BannedControl;
