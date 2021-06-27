import React, { useEffect, useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { BASE_URL, LOCAL_STORAGE_TWITCH_USER } from "./constants";
import {
  getGameList,
  getAllRewards,
  updateRewardsCost,
  validateAndRefresh,
  initBroadcaster,
} from "./api";
import { setTwitchConfig } from "./TwitchApi";

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

const twitchLogin = () => {
  window.open(BASE_URL + "/auth/twitch");
};

export const useConfigPage = ({ auth, config, state, dispatch }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    dispatch({ type: "setAlert", payload: "" });
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
    // TODO: change name and scope to initConfig
    initBroadcaster();
    if (config) {
      dispatch({ type: "setConfig", payload: config });
    } else {
      resetConfig();
    }
  }, [config, auth]);

  useEffect(() => {
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
  }, [config, auth]);

  const SaveChangedData = () => {
    const newConfig = {
      ...state.config,
      bannedIds: Object.keys(state.bannedSongs),
    };

    updateRewardsCost({
      bannedCost: newConfig.bannedCost,
      extremeCost: newConfig.extremeCost,
    })
      .then((raw) => raw.json())
      .then((result) => {
        setTwitchConfig(newConfig, () =>
          dispatch({ type: "setAlert", payload: "success" })
        );
        window.Twitch.ext.send("broadcast", "application/json", {
          type: "configChange",
          data: newConfig,
        });
      })
      .catch((err) => console.error(err));
  };

  const updateConfig = (data) => {
    dispatch({ type: "setConfig", payload: { ...state.config, ...data } });
  };

  useEffect(() => {
    window.Twitch.ext.listen("broadcast", (target, contentType, message) => {
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
        });
      }
    });
  }, []);

  const checkRewards = () => {
    setIsLoading(true);
    validateAndRefresh()
      .then((result) => {
        if (result?.status !== "OK") {
          saveToken(result.access_token, result.refresh_token);
        }
        getAllRewards()
          .then((blob) => blob.json())
          .then((result) => {
            dispatch({ type: "setRewardsStatus", payload: result });
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setIsLoading(false);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("error validate and refresh: ", err);
      });
  };

  return {
    isLoading,
    handleClose,
    resetConfig,
    SaveChangedData,
    updateConfig,
    twitchLogin,
    checkRewards,
  };
};
