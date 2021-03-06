import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import ListWarning from "./ListWarning";
import { BASE_URL } from "./constants";

import { useAuth, useConfig } from "./TwitchExt";
import {
  ButtonStyled,
  ConfigForm,
  ConfigActions,
  GameConfig,
  GeneralConfig,
} from "./Config.styled";
import { Alert, useConfigPage, getAlertMsg } from "./Config.helpers";
import BannedControl from "./BannedControl";
import Spinner from "./Spinner";
import Rewards from "./Rewards";
import RewardsConfig from "./RewardsConfig";
import { updateRewardRange } from "./api";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
  },
}));

const RewardsView = ({ state, twitchLogin, dispatch }) => {  

  if (state.config.broadcasterType === null) {
    return (
      <ListWarning buttonLabel="Login" onClick={twitchLogin}>
        <p>
          If you want to use chanel Rewards, we need to check if you are a{" "}
          <em>"Affiliate"</em>.
        </p>
      </ListWarning>
    );
  }

  if (state.config.broadcasterType === "") {
    return (
      <div>
        <h3>You can't use rewards</h3>
        <ul>
          <li>
            You are not a Twitch <em>"Affiliate"</em> yet. If you wanna update
            your status, please{" "}
            <a href={BASE_URL + "/auth/twitch"}> click here</a>
          </li>
          <li>the extension will not show tickets or song cost.</li>
          <li>All songs will be cost free.</li>
          <li>Banned song will show as disabled.</li>
        </ul>
      </div>
    );
  }
  if (state.config.broadcasterType) {
    return (
      <>
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
        {!state.config.useRewards ? (
          <div>
            <h3>Your rewards are turned off...</h3>
            <ul>
              <li>the extension will not show tickets or song cost.</li>
              <li>All songs will be cost free.</li>
              <li>Banned song will show as disabled.</li>
            </ul>
          </div>
        ) : (
          <RewardsConfig
            useExtreme={state.config.useExtreme}
            useBanned={state.config.useBanned}
            dispatch={dispatch}
            costs={state.costs}
          />
        )}
      </>
    );
  }

  return null;
};

const Config = () => {
  const auth = useAuth();
  const config = useConfig();
  
  const {
    setIsLoading,
    isLoading,
    handleClose,
    resetConfig,
    SaveChangedData,
    updateConfig,
    twitchLogin,
    checkRewards,
    state,
    dispatch,
  } = useConfigPage({
    auth,
    config,
  });
  const classes = useStyles();
  
  if (!state.config && state.songList.length === 0) {
    return <Spinner />;
  }

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
          <RewardsView
            state={state}
            twitchLogin={twitchLogin}
            dispatch={dispatch}
          />
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
          onClick={() =>SaveChangedData(state.costs)}
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
};

export default Config;
