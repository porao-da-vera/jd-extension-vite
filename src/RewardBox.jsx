import React, { useState } from "react";
import {
  Reward,
  LeftSection,
  RightSection,
  TwitchReward,
  TwitchRewardEditBtn,
  TwitchRewardInfo,
  StyledInput,
  Title,
  Cost,
  Range,
  RewardName,
  StyledPaper,
} from "./RewardBox.styled";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import { DIFFICULTIES } from "./constants";
import Tag, { states, types } from "./Tag";
import { EditIcon, CheckIcon } from "./icons";
import { updateReward } from "./api";
import { REWARDS } from "./constants"

const difficulties = DIFFICULTIES.slice(1);

const DifficultySelector = ({ selected, onSelect }) => {
  return difficulties.map((dif, idx) => {
    let checked;
    if (selected.length === 1) {
      checked = idx === selected[0];
    } else {
      checked = idx >= selected[0] && idx <= selected[1];
    }
    return (
      <Tag key={idx} state={checked ? states.regular : states.disabled}>
        {dif}
      </Tag>
    );
  });
};

const RewardBox = ({ reward, range, type, disabled, dispatch }) => {
  const [title, setTitle] = useState(reward.title);
  const [cost, setCost] = useState(reward.cost);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateReward = () => {
    updateReward({ data: { title, cost }, reward: reward.id })
      .then((response) => {
        setError(null);
        setLoading(false);
        setEditing(false)
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  const handleChange = (type, disabled) => {
    if(type === REWARDS.EXTREME){
      dispatch({type: "setUseExtreme", payload: !disabled})
    }
    if(type === REWARDS.BANNED){
      dispatch({type: "setUseBanned", payload: !disabled})
    }
  };

  return (
    <StyledPaper elevation={3}>
      <LeftSection>
        {type !== "regular" && (
          <FormControlLabel
            control={
              <Checkbox
                checked={disabled}
                onChange={() => handleChange(type, disabled)}
                name="checkedA"
              />
            }
          />
        )}
      </LeftSection>

      <RightSection>
        {type !== "regular" && `Use ${type} ?`}
        <TwitchReward>
          <TwitchRewardInfo>
            <Title>
              {editing ? (
                <StyledInput
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              ) : (
                <RewardName> {title}</RewardName>
              )}
            </Title>
            <Cost>
              {editing ? (
                <StyledInput
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                />
              ) : (
                <RewardName> {cost}</RewardName>
              )}
            </Cost>
          </TwitchRewardInfo>
          {editing ? (
            <TwitchRewardEditBtn
              color="primary"
              aria-label="edit rewards"
              component="div"
              size="small"
              onClick={handleUpdateReward}
            >
              <CheckIcon size={16} />
            </TwitchRewardEditBtn>
          ) : (
            <TwitchRewardEditBtn
              color="primary"
              aria-label="edit rewards"
              component="div"
              size="small"
              onClick={() => setEditing(true)}
            >
              <EditIcon size={16} />
            </TwitchRewardEditBtn>
          )}
        </TwitchReward>
        <Range>
          <DifficultySelector selected={range} />
        </Range>
      </RightSection>
    </StyledPaper>
  );
};

export default RewardBox;
