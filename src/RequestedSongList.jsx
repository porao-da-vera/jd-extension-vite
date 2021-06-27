import React, { useEffect } from "react";
import SongCard from "./SongCard";
import Requester from "./Requester";
import { Song, Songs, ListWrapper } from "./RequestedSongList.styled";

const RequestedSongList = ({
  songList,
  onRemove,
  onStatusChange,
  showControls,
  useRewards
}) => {
 
  return (
    <ListWrapper>
      <Songs>
        {songList.map((song, index) => (
          <Song key={index} danced={song.song.danced}>
            <SongCard
              showControls={showControls}
              clickable={false}
              {...song.song}
              useRewards={useRewards}
              removeSong={onRemove}
              changeSongStatus={onStatusChange}
              extremeCost={song.song.difficulty}
            />
            <Requester danced={song.song.danced} {...song.viewer} />
          </Song>
        ))}
      </Songs>
    </ListWrapper>
  );
};

export default RequestedSongList;
