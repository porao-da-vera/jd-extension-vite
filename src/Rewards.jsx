import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import CostsConfig from "./CostsConfig";

import BuildIcon from "@material-ui/icons/Build";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { green, red } from "@material-ui/core/colors";
import { getAllRewards, validateAndRefresh } from "./api";

import { Wrapper, CostConfigWrapper } from "./Reward.styled";
import { ButtonStyled } from "./Config.styled";
import { fixRewards } from "./api";
import Spinner from "./Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const Rewards = ({ rewardsStatus, dispatch, extremeCost, bannedCost }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (rewardsStatus) return;
    setLoading(true);
    validateAndRefresh()
      .then((result) => {
        if (result?.status !== "OK") {
          saveToken(result.access_token, result.refresh_token);
        }
        getAllRewards()
          .then((blob) => blob.json())
          .then((result) => {
            dispatch({ type: "setRewardsStatus", payload: result });
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.error("error validate and refresh: ", err);
      });
  }, [rewardsStatus]);
  const handleFixRewards = () => {
    setLoading(true);
    const rewardsToFix = rewardsStatus
      .filter((reward) => !reward.isValidSub || !reward.data)
      .map(({ id, data, isValidSub, type }) => {
        return { id, isAvailable: !!data, isValidSub, type };
      });

    fixRewards(rewardsToFix)
      .then((blob) => blob.json())
      .then((results) => {
        dispatch({
          type: "setRewardsStatus",
          payload: rewardsStatus.map(
            (reward) =>
              results.find((result) => result.type === reward.type) ?? reward
          ),
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const checkRewards = () => {};

  const classes = useStyles();

  if (loading) {
    return (
      <Wrapper expand={true}>
        <Spinner />
      </Wrapper>
    );
  }
  if (!rewardsStatus) {
    return (
      <Wrapper>
        <ButtonStyled
          onClick={checkRewards}
          variant="contained"
          color="primary"
        >
          Manage Rewards
        </ButtonStyled>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <FormControl component="fieldset" style={{ paddingTop: 8, marginTop: 8 }}>
        <FormLabel component="legend">Cost</FormLabel>
        <CostConfigWrapper>
          <CostsConfig
            cost={extremeCost}
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
            cost={bannedCost}
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
      </FormControl>
      <div className={classes.demo}>
        <List dense={true}>
          {rewardsStatus.map((reward) => (
            <ListItem key={reward.id}>
              <ListItemAvatar>
                {reward.isValidSub && reward.data ? (
                  <CheckCircleIcon style={{ color: green[500] }} />
                ) : (
                  <ErrorIcon style={{ color: red[500] }} />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={reward.type}
                secondary={reward.data ? reward.data.title : "not available"}
              />
              <ListItemSecondaryAction>
                {!(reward.isValidSub && reward.data) && (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={handleFixRewards}
                  >
                    <BuildIcon />
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </Wrapper>
  );
};

export default Rewards;
