const initialState = {
  user: null,
  songList: [],
  listConfig: null,
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
    case "setListConfig":
    case LIST_ACTION_TYPE.ADD:
    case LIST_ACTION_TYPE.CHANGE:
      return {
        ...state,
        listConfig: payload.listConfig,
      };
    case LIST_ACTION_TYPE.DELETE:
      return {
        ...state,
        listConfig: payload.listConfig,
        songList: [],
      };
    case "setListStatus":
      return {
        ...state,
        listConfig: {
          ...state.listConfig,
          status: payload,
        },
      };
    case "setPerViewer":
      return {
        ...state,
        listConfig: {
          ...state.listConfig,
          perViewer: payload,
        },
      };
    case "setPerStream":
      return {
        ...state,
        listConfig: {
          ...state.listConfig,
          perStream: payload,
        },
      };
    case "setSongList":
      return {
        ...state,
        songList: payload,
      };
    case SONG_ACTION_TYPE.ADD:
      if(state.songList.find(item => item.id === payload.change.song.id)) return state;
      return {
        ...state,
        songList: [...state.songList, payload.change],
      };
    case SONG_ACTION_TYPE.CHANGE:
      const newSongList = state.songList.map((song) =>
        payload.songId === song.song.id
          ? { ...song, song: { ...song.song, ...payload.change } }
          : song
      );
      return {
        ...state,
        songList: newSongList,
      };
    case SONG_ACTION_TYPE.DELETE:
      return {
        ...state,
        songList: state.songList.filter(
          (song) => song.song.id !== payload.songId
        ),
      };
    default:
      return state;
  }
}

export { initialState, reducer };
