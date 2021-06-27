import React, { useEffect } from "react";
import { Wrapper, SongList, Header, Title } from "./BannedSongList.styled";
import SongCard from "./SongCard";
import FilterSection from "./FilterSection";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

const BannedSongList = ({
  songList,
  title,
  showFilter = false,
  showOverlay = false,
  onClick,
  overlay,
  setFilter,
  filter
}) => {
  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
        {showFilter && <FilterSection filter={filter} dispatch={value => setFilter(value.payload)} />}
      </Header>
      <SongList>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={songList.length}
              itemSize={83}
              width={width}
              style={{ overflowX: 'hidden' }}
            >
              {({ index, style }) => {
                const song = songList[index];
                return (
                  <div
                    style={{
                      ...style,
                      bottom: style.bottom || 0 + 4,
                      height: style.height || 0 + 4,
                    }}
                  >
                    <SongCard
                      overlay={overlay}
                      onClick={onClick}
                      showOverlay={showOverlay}
                      key={song.id}
                      {...song}
                    />
                  </div>
                );
              }}
            </List>
          )}
        </AutoSizer>
      </SongList>
    </Wrapper>
  );
};

export default BannedSongList;
