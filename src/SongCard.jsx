import React from "react";
import TicketIcon from "./TicketIcon";
import { Card, Thumb, Source, Info, Difficulty } from "./SongCard.style";
import SongControls from "./SongControls";
import Spinner from "./Spinner";
import SongCardOverlay from "./SongCardOverlay";
import { DIFFICULTIES, MODES, BASE_URL } from "./constants";

const SongCard = ({
  id,
  cost,
  name,
  artist,
  difficulty,
  coaches,
  thumb,
  source,
  danced,
  showControls = false,
  clickable = true,
  removeSong,
  changeSongStatus,
  onBanSong,
  showOverlay = false,
  onClick,
  disabled,
  overlay,
  ...props
}) => {
  return (
    <Card
      danced={danced}
      clickable={clickable}
      onClick={() =>
        typeof onClick === "function" &&
        onClick({
          id,
          cost,
          name,
          artist,
          difficulty,
          coaches,
          thumb,
          source,
          danced,
        })
      }
      {...props}
    >
      {showOverlay && <SongCardOverlay overlay={overlay} />}
      <Thumb danced={danced}>
        <img
          loading="lazy"
          src={`${BASE_URL}/images/${thumb}`}
          alt={name + " - " + artist}
        />
        <Source>{source}</Source>
      </Thumb>
      <Info danced={danced}>
        <p className="title">{name}</p>
        <p className="artist">
          <b>Artist: </b>
          {artist}
        </p>
        <div>
          {!!Number(cost) && (
            <Difficulty>
              {cost}&nbsp;
              <TicketIcon />
            </Difficulty>
          )}
          <Difficulty banned={difficulty === 5}>
            {DIFFICULTIES[difficulty]}
          </Difficulty>
          <Difficulty>{MODES[coaches]}</Difficulty>
        </div>
      </Info>

      {showControls && (
        <SongControls
          danced={danced}
          removeSong={removeSong}
          changeSongStatus={changeSongStatus}
          songId={id}
        />
      )}
    </Card>
  );
};
export default SongCard;
