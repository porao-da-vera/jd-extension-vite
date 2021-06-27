import React from "react";
import { LIST_STATUS } from "./constants";
import SongCard from "./SongCard";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

const PanelSongList = ({
  songList,
  dispatch,
  listStatus,
  requestedIds,
  extremeCost,
  bannedCost,
  bannedIds,
}) => (
  <AutoSizer>
    {({ height, width }) => (
      <List
        height={height}
        itemCount={songList.length}
        itemSize={83}
        width={width}
        style={{ overflowX: "hidden" }}
      >
        {({ index, style }) => {
          const song = songList[index];
          const requested = requestedIds.includes(song.id);
          return (
            <div
              style={{
                ...style,
                bottom: (style.bottom ?? 0) + 4,
                height: (style.height ?? 0) + 4,
              }}
            >
              <SongCard
                onClick={
                  requested
                    ? undefined
                    : () =>
                        listStatus === LIST_STATUS.ACTIVE &&
                        dispatch({
                          type: "setSelectedSong",
                          payload: { selectedSong: song },
                        })
                }
                extremeCost={extremeCost}
                banned={bannedIds.includes(song.id) && bannedCost}
                danced={requested}
                clickable={!requested}
                key={index}
                {...song}
              />
            </div>
          );
        }}
      </List>
    )}
  </AutoSizer>
);

export default PanelSongList;
