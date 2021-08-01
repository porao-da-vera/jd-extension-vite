import React, { useEffect, useState, useReducer } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { BASE_URL, LOCAL_STORAGE_TWITCH_USER, REWARDS } from "./constants";
import { getGameList, updateRewardRange } from "./api";
import { setTwitchConfig } from "./TwitchApi";
import { initialState, reducer } from "./configReducer";
import { rigLog } from "./TwitchExt";

export const defaultConfig = {
  extremeCost: 5,
  bannedCost: 10,
  useRewards: false,
  bannedIds: [],
  unlimited: true,
  game: "2021",
  SongsPerViewer: 0,
  SongsPerStream: 0,
  broadcasterType: null,
  useExtreme: false,
  useBanned: false,
};

export const saveToken = (token, refreshToken) => {
  window.localStorage.setItem(LOCAL_STORAGE_TWITCH_USER.AUTHORIZATION, token);
  window.localStorage.setItem(
    LOCAL_STORAGE_TWITCH_USER.REFRESH_TOKEN,
    refreshToken
  );
};

export const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const getAlertMsg = (type) => {
  return type === "success"
    ? "Dados Salvos com sucesso"
    : "Erro ao salvar dados";
};

// Page custom hook
export const useConfigPage = ({ auth, config }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    dispatch({ type: "setAlert", payload: "" });
  };
  const handleListenToLogin = (target, contentType, message) => {
    const { type, data } = JSON.parse(message);
    if (type === "login") {
      saveToken(data.token, data.refreshToken);
      const newConfig = {
        ...state.config,
        broadcasterType: data.broadcaster_type,
      };
      setTwitchConfig(newConfig, () => {
        dispatch({
          type: "setBroadcasterType",
          payload: data.broadcaster_type,
        });
        window.Twitch.ext.unlisten("broadcast", handleListenToLogin);
      });
    }
  };

  const twitchLogin = () => {
    window.Twitch.ext.listen("broadcast", handleListenToLogin);
    window.open(BASE_URL + "/auth/twitch");
  };

  const resetConfig = () => {
    setTwitchConfig(defaultConfig, () => {
      dispatch({
        type: "resetConfig",
        payload: { config: defaultConfig, rewardsStatus: null },
      });
    });
  };

  useEffect(() => {
    if (config) {
      dispatch({ type: "setConfig", payload: config });
    }
  }, [config]);

  // useEffect(() => {
  //   if (state.config) {

  //   }
  // }, [state.config]);

  useEffect(() => {
    if ((auth, state.songList.length === 0)) {
      getGameList()
        .then((data) => {
          let songs = [];
          Object.keys(data).map((key) => {
            songs = songs.concat(data[key]);
            return false;
          });
          dispatch({ type: "setSongList", payload: songs });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [auth]);

  const saveAndBroadcastConfig = (newConfig) => {
    setTwitchConfig(newConfig, () =>
      dispatch({ type: "setAlert", payload: "success" })
    );
    window.Twitch.ext.send("broadcast", "application/json", {
      type: "configChange",
      data: newConfig,
    });
  };

  const SaveChangedData = (costs) => {
    const newConfig = {
      ...state.config,
      bannedIds: Object.keys(state.bannedSongs),
    };
    console.info(costs);
    if (newConfig.broadcasterType) {
      updateRewardRange({
        regularRange: costs[REWARDS.REGULAR],
        extremeRange: costs[REWARDS.EXTREME],
        bannedRange: costs[REWARDS.BANNED],
        subRange: costs[REWARDS.SUB],
        raidRange: costs[REWARDS.RAID],
      })
        .then((raw) => raw.json())
        .then((result) => {
          saveAndBroadcastConfig(newConfig);
        })
        .catch((err) => console.error(err));
    } else {
      saveAndBroadcastConfig(newConfig);
    }
  };

  const updateConfig = (data) => {
    dispatch({ type: "setConfig", payload: { ...state.config, ...data } });
  };

  return {
    isLoading,
    handleClose,
    resetConfig,
    SaveChangedData,
    updateConfig,
    twitchLogin,
    setIsLoading,
    state,
    dispatch,
  };
};
