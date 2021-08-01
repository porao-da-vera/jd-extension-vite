import { REWARDS } from "./constants";
const initialState = {
  error: false,
  config: null,
  bannedSongs: {},
  alert: "",
  songList: [],
  hasAllRewards: null,
  rewardsStatus: null,
  costs: {
    [REWARDS.REGULAR]: [0, 2],
    [REWARDS.EXTREME]: [3],
    [REWARDS.BANNED]: [4],
    [REWARDS.SUB]: [0, 4],
    [REWARDS.RAID]: [0, 3],
  },
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "setRewardsStatus":
      return {
        ...state,
        rewardsStatus: payload,
      };
    case "setUseExtreme":
      return {
        ...state,
        config: {
          ...state.config,
          useExtreme: payload,
        },
        costs: {
          ...state.costs,
          [REWARDS.REGULAR]: payload ? [0, 2] : [0, 3]
        },
      };
    case "setUseBanned":
      return {
        ...state,
        config: {
          ...state.config,
          useBanned: payload,
        },
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
      console.log(payload);
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

    case "setCosts":
      return {
        ...state,
        costs: payload,
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
