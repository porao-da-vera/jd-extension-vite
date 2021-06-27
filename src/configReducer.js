const initialState = {
  error: false,
  config: null,
  bannedSongs: {},
  alert: "",
  songList: [],
  hasAllRewards: null,
  rewardsStatus: null,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "setRewardsStatus":
      return {
        ...state,
        rewardsStatus: payload,
      };
    case "setAuth":
      return {
        ...state,
        auth: payload,
      };

    case "toggleTwitchReward":
      return {
        ...state,
        config: { ...state.config, useRewards: !state.config.useRewards },
      };
    case "setUserInfo":
      return {
        ...state,
        userInfo: payload,
      };
    case "setBroadcasterType":
      return {
        ...state,
        config: { ...state.config, broadcasterType: payload },
      };
    case "setSongList":
      return {
        ...state,
        songList: payload,
      };

    case "setAlert":
      return {
        ...state,
        alert: payload,
      };

    case "setHasConfig":
      return {
        ...state,
        hasConfig: payload,
      };

    case "setHasAllRewards":
      return {
        ...state,
        hasAllRewards: payload,
      };

    case "setConfig":
      return {
        ...state,
        config: payload,
      };

    case "resetConfig":
      return {
        ...state,
        ...payload,
      };

    case "setError":
      return {
        ...state,
        error: payload,
      };

    case "setExtremeCost":
      return {
        ...state,
        config: { ...state.config, extremeCost: payload },
      };

    case "setBannedCost":
      return {
        ...state,
        config: { ...state.config, bannedCost: payload },
      };

    case "setBannedSongs":
      return {
        ...state,
        bannedSongs: payload,
      };

    default:
      return {
        ...state,
      };
  }
}

export { initialState, reducer };
