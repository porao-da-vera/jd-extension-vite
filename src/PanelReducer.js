import { REWARDS } from "./constants";

const defaultTickets = Object.keys(REWARDS).reduce((acc, cur) => {
  const label = REWARDS[cur];
  if (label !== REWARDS.RAID && label !== REWARDS.SUB) {
    acc[label] = 0;
  }
  return acc;
}, {});

const initialState = {
  songList: [],
  filteredSongs: [],
  requestedSongs: [],
  display_name: "",
  filter: { searchString: "", difficulty: 0, mode: 0 },
  tickets: defaultTickets,
  selectedSong: null,
  auth: null,
  loading: true,
  error: null,
  unlimited: true,
  extremeCost: null,
  bannedCost: null,
  bannedIds: [],
  config: null,
  gameList: null,
  isRequestView: false,
  listConfig: null,
  handleAddSongError: "",
};

const SONG_ACTION_TYPE = {
  ADD: "SONG_ADD",
  CHANGE: "SONG_CHANGE",
  DELETE: "SONG_DELETE",
};

const LIST_ACTION_TYPE = {
  ADD: "LIST_CREATE",
  CHANGE: "LIST_CHANGE",
  DELETE: "LIST_DELETE",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "setViewerInit":
      return {
        ...state,
        ...payload,
      };
    case "setAddSongError":
      return {
        ...state,
        handleAddSongError: payload,
        loading: false,
      };
    case "setListConfig":
    case LIST_ACTION_TYPE.CHANGE:
      return {
        ...state,
        listConfig: payload.listConfig,
      };
    case LIST_ACTION_TYPE.ADD:
      return {
        ...state,
        listConfig: payload.listConfig,
        requestedSongs: [],
      };
    case LIST_ACTION_TYPE.DELETE:
      const userId = window.Twitch.ext.viewer.id;
      const ticketsToReturn = payload.ticketsToReturn[userId] ?? [];
      const tickets = ticketsToReturn.reduce(
        (acc, cur) => {
          acc[cur] += 1;
          return acc;
        },
        { ...state.tickets }
      );
      return {
        ...state,
        listConfig: payload.listConfig,
        tickets,
        requestedSongs: [],
      };
    case "setSongList":
      return {
        ...state,
        songList: payload,
        filteredSongs: payload,
        loading: false,
      };
    case "setRequestedSongs":
      return {
        ...state,
        requestedSongs: payload,
      };
    case "setGameList":
      return {
        ...state,
        gameList: payload,
      };
    case "setFilteredSongs":
      return {
        ...state,
        filteredSongs: payload,
      };
    case "setFilter":
      
      return {
        ...state,
        filter: payload,
      };
    case "setTickets":
      return {
        ...state,
        tickets: payload,
      };
    case "setSelectedSong":
      let newState = {
        ...state,
        ...payload,
        loading: false,
      };
      return newState;
    case "setLoading": {
      return {
        ...state,
        loading: payload,
      };
    }
    case "setViewer":
      return {
        ...state,
        listConfig: payload.listStatus,
        requestedSongs: payload.requestedSongs,
      };
    case "setIsRequestView":
      if (!payload.view) {
        const { selectedSong, handleAddSongError } = initialState;
        return {
          ...state,
          isRequestView: payload.view,
          selectedSong,
          handleAddSongError,
        };
      }
      
      return {
        ...state,
        filter: { ...state.filter, difficulty: payload.difficulty },
        isRequestView: payload.view,
      };

    case "setError":
      return {
        error: payload,
      };

    case SONG_ACTION_TYPE.ADD:
      if (
        state.requestedSongs.find((item) => item.id === payload.change.song.id)
      )
        return state;
      return {
        ...state,
        requestedSongs: [...state.requestedSongs, payload.change],
      };
    case SONG_ACTION_TYPE.CHANGE:
      return {
        ...state,
        requestedSongs: state.requestedSongs.map((song) =>
          payload.songId === song.song.id
            ? { ...song, song: { ...song.song, ...payload.change } }
            : song
        ),
      };
    case SONG_ACTION_TYPE.DELETE:
      const newList = state.requestedSongs.filter(
        (song) => song.song.id !== payload.songId
      );
      return {
        ...state,
        requestedSongs: newList,
      };
    default:
      return state;
  }
}

export { initialState, reducer };
