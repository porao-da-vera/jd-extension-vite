import React, {
  useEffect,
  useState,
  useReducer,
  useContext,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  BASE_URL,
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_TWITCH_USER,
} from "./constants";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";

import { useAuth, useConfig } from "./TwitchExt";
import { initialState, reducer } from "./configReducer";
import {
  getGameList,
  getAllRewards,
  updateRewardsCost,
  validateAndRefresh,
  initBroadcaster
} from "./api";
import { setTwitchConfig } from "./TwitchApi";
import {
  Panel,
  Content,
  CostConfigWrapper,
  ButtonStyled,
  ConfigForm,
  ConfigActions,
  GameConfig,
  GeneralConfig,
} from "./Config.styled";
import CostsConfig from "./CostsConfig";
import BannedControl from "./BannedControl";
import Spinner from "./Spinner";
import Rewards from "./Rewards";

const defaultConfig = {
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

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
  },
}));

const saveToken = (token, refreshToken) => {
  window.localStorage.setItem(LOCAL_STORAGE_TWITCH_USER.AUTHORIZATION, token);
  window.localStorage.setItem(
    LOCAL_STORAGE_TWITCH_USER.REFRESH_TOKEN,
    refreshToken
  );
};

const Config = () => {
  const auth = useAuth();
  const config = useConfig();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  const getAlertMsg = (type) => {
    return type === "success"
      ? "Dados Salvos com sucesso"
      : "Erro ao salvar dados";
  };

  const handleClose = () => {
    dispatch({ type: "setAlert", payload: "" });
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const resetConfig = () => {
    setTwitchConfig(defaultConfig, () => {
      dispatch({
        type: "resetConfig",
        payload: { config: defaultConfig, rewardsStatus: null },
      });
    });
  };

  // 3rd get config
  useEffect(() => {
    initBroadcaster()
    if (config) {
      dispatch({ type: "setConfig", payload: config });
    } else {
      resetConfig();
    }
  }, [config, auth]);

  // 4th get songlist
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

  const twitchLogin = () => {
    window.open(
      BASE_URL +
        "/auth/twitch"
    );
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

  if (state.config && state.songList.length > 0) {
    return (
      <div className={classes.root}>
        <ConfigForm>
          <GeneralConfig>
            <FormControl component="fieldset" style={{ paddingTop: 8 }}>
              <FormLabel component="legend">Songs</FormLabel>
              <GameConfig>
                <TextField
                  select
                  label="Game"
                  id="demo-simple-select"
                  size="small"
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                  value={state.config.game}
                  onChange={(e) => updateConfig({ game: e.target.value })}
                >
                  <option value={"2019"}>2019</option>
                  <option value={"2020"}>2020</option>
                  <option value={"2021"}>2021</option>
                </TextField>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.config.unlimited}
                      onChange={(e) =>
                        updateConfig({ unlimited: e.target.checked })
                      }
                      size="small"
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Unlimited"
                />
              </GameConfig>
            </FormControl>

            {state.config.broadcasterType && (
              <FormControlLabel
                control={
                  <Switch
                    checked={state.config.useRewards}
                    color="primary"
                    onChange={() => dispatch({ type: "toggleTwitchReward" })}
                    name="twitchReward"
                  />
                }
                label="Use channel Reward"
              />
            )}

            {state.config.broadcasterType === null && (
              <ButtonStyled
                variant="contained"
                color="primary"
                onClick={twitchLogin}
              >
                Login
              </ButtonStyled>
            )}
            {state.config.broadcasterType && state.config.useRewards && (
              <FormControl
                component="fieldset"
                style={{ paddingTop: 8, marginTop: 8 }}
              >
                <FormLabel component="legend">Cost</FormLabel>

                <CostConfigWrapper>
                  <CostsConfig
                    cost={state.config.extremeCost}
                    setCost={(e) =>
                      dispatch({
                        type: "setExtremeCost",
                        payload: e.target.value,
                      })
                    }
                  >
                    Extreme
                  </CostsConfig>
                  <CostsConfig
                    cost={state.config.bannedCost}
                    setCost={(e) =>
                      dispatch({
                        type: "setBannedCost",
                        payload: e.target.value,
                      })
                    }
                  >
                    Banned
                  </CostsConfig>
                </CostConfigWrapper>
                <Rewards
                  rewardsStatus={state.rewardsStatus}
                  isLoading={isLoading}
                  dispatch={dispatch}
                  checkRewards={checkRewards}
                  setIsLoading={setIsLoading}
                />
              </FormControl>
            )}
          </GeneralConfig>
          <BannedControl
            songList={state.songList}
            bannedSongs={state.bannedSongs}
            dispatch={dispatch}
            bannedIds={state.config.bannedIds}
          />
        </ConfigForm>
        <ConfigActions>
          <ButtonStyled color="secondary" onClick={resetConfig}>
            Reset Config
          </ButtonStyled>
          <ButtonStyled
            onClick={SaveChangedData}
            variant="contained"
            color="primary"
          >
            Save Changes
          </ButtonStyled>
          <Snackbar
            open={!!state.alert}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              {getAlertMsg("success")}
            </Alert>
          </Snackbar>
        </ConfigActions>
      </div>
    );
  }
  return <Spinner />;
};

export default Config;
