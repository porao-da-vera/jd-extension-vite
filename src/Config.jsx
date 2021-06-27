import React, { useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";

import { useAuth, useConfig } from "./TwitchExt";
import { initialState, reducer } from "./configReducer";
import {
  CostConfigWrapper,
  ButtonStyled,
  ConfigForm,
  ConfigActions,
  GameConfig,
  GeneralConfig,
} from "./Config.styled";
import { Alert, useConfigPage, getAlertMsg } from "./Config.helpers";
import CostsConfig from "./CostsConfig";
import BannedControl from "./BannedControl";
import Spinner from "./Spinner";
import Rewards from "./Rewards";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
  },
}));

const Config = () => {
  const auth = useAuth();
  const config = useConfig();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    isLoading,
    handleClose,
    resetConfig,
    SaveChangedData,
    updateConfig,
    twitchLogin,
    checkRewards,
  } = useConfigPage({
    auth,
    config,
    state,
    dispatch,
  });
  const classes = useStyles();

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
