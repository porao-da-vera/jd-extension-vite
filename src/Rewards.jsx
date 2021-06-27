import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import BuildIcon from "@material-ui/icons/Build";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { green, red } from "@material-ui/core/colors";

import { Wrapper } from "./Reward.styled";
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

const Rewards = ({
  rewardsStatus,
  dispatch,
  isLoading,
  setIsLoading,
  checkRewards,
}) => {
  const handleFixRewards = () => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const classes = useStyles();

  if (isLoading) {
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
          Check Rewards
        </ButtonStyled>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
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
