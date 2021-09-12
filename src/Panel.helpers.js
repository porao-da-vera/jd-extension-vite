import { getInitialViewer } from "./api";
import Fuse from "fuse.js";

export const handleFilter = (filter, songList) => {
  const { searchString, difficulty, mode } = filter;
  let filteredSongs = [...songList];
  if (searchString) {
    // fuzzy search title and artist
    const options = {
      keys: [
        {
          name: "name",
          weight: 2,
        },
        {
          name: "artist",
          weight: 1,
        }
      ],
      includeScore: true,
      location: 0,
      threshold: 0.1,
      sortFn: (a,b) => {
        return (a.score - b.score) || a.item[0].v.indexOf(searchString) - b.item[0].v.indexOf(searchString) || a.item[1].v.indexOf(searchString) - b.item[1].v.indexOf(searchString) || a.refIndex - b.refIndex;
      }
    };
    const fuse = new Fuse(filteredSongs, options);
    filteredSongs = fuse.search(searchString).map((res) => res.item);
  }
  const filtered = filteredSongs.filter((song) => {
    return (
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
