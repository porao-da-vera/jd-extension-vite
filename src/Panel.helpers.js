import { getInitialViewer } from "./api";

export const handleFilter = (filter, songList) => {
  const { searchString, difficulty, mode } = filter;

  const filtered = songList.filter((song) => {
    return (
      (song.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1 ||
        song.artist.toLowerCase().indexOf(searchString.toLowerCase()) > -1) &&
      (!difficulty || difficulty === song.difficulty) &&
      (!mode || mode === song.coaches)
    );
  });
  return filtered;
};

export const getCost = ({ banned, bannedCost, extremeCost, difficulty }) => {
  if (banned) {
    return Number(bannedCost);
  }
  return difficulty >= 4 ? extremeCost : 1;
};

export const viewerListener = ({ opaque_user_id, dispatch }) => {
  getInitialViewer()
    .then((result) => {
      const { listStatus, list, tickets, display_name } = result;
      
      const payload = {
        listConfig: listStatus,
        requestedSongs: list,
        display_name,
      };
      if (tickets) {
        payload.tickets = tickets;
      }
      console.log(tickets);
      dispatch({
        type: "setViewerInit",
        payload,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  window.Twitch.ext.listen("broadcast", (target, contentType, message) => {
    const { type, data } = JSON.parse(message);
    dispatch({
      type,
      payload: data,
    });
  });
  window.Twitch.ext.listen(
    "whisper-" + opaque_user_id,
    (target, contentType, message) => {
      const { type, data } = JSON.parse(message);
      if (type === "tickets") {
        dispatch({
          type: "setViewerInit",
          payload: { tickets: data },
        });
      }
    }
  );
};

export const mapSongList = ({ config, gameList }) => {
  const { bannedIds, unlimited, useRewards, game } = config;
  const unlimitedSongs = unlimited ? gameList["unlimited"] : [];
  const list = [...gameList[game], ...unlimitedSongs];
  const listWithCost = list.map((song, index) => {
    const banned = bannedIds.includes(song.id);
    return {
      ...song,
      difficulty: banned ? 5 : song.difficulty,
    };
  });
  return listWithCost;
};
