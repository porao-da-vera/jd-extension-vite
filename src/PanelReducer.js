const initialState = {
  songList: [],
  filteredSongs: [],
  display_name: "",
  filter: { searchString: "", difficulty: 0, mode: 0 },
  tickets: -1,
  selectedSong: null,
  auth: null,
  loading: true,
  error: null,
  unlimited: true,
  requestedIds: [],
  extremeCost: null,
  bannedCost: null,
  bannedIds: [],
  config: null,
  gameList: null,
  requestedSongs: null,
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
    case LIST_ACTION_TYPE.ADD:
    case LIST_ACTION_TYPE.CHANGE:
    case LIST_ACTION_TYPE.DELETE:
      return {
        ...state,
        listConfig: payload,
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
        requestedIds: payload.requestedIds,
      };
    case "setIsRequestView":
      if (!payload) {
        const { selectedSong, handleAddSongError } = initialState;
        return {
          ...state,
          isRequestView: payload,
          selectedSong,
          handleAddSongError,
        };
      }
      return {
        ...state,
        isRequestView: payload,
      };

    case "setError":
      return {
        error: payload,
      };

    case SONG_ACTION_TYPE.ADD:
      return {
        ...state,
        requestedSongs: [...state.requestedSongs, payload.change],
        requestedIds: [...state.requestedIds, payload.change.song.id],
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
      return {
        ...state,
        requestedSongs: state.requestedSongs.filter(
          (song) => song.song.id !== payload.songId
        ),
      };
    default:
      return state;
  }
}

export { initialState, reducer };
