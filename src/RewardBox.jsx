import React, { useState } from "react";
import { Reward, RewardInfo, Title, Cost, Range, RewardName, StyledPaper, RightItems } from "./RewardBox.styled";
import TextField from "@material-ui/core/TextField";
//import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import { DIFFICULTIES } from "./constants";
import Tag, { states, types } from './Tag';

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
      <Tag
        key={idx}
        state={checked ? states.regular : states.disabled}
        >{dif}</Tag>
    );
  });
};

const RewardBox = ({
  reward,
  range,
  type,
  disabled,
  dispatch,
}) => {
  const [title, setTitle] = useState(reward.title);
  const [cost, setCost] = useState(reward.cost);

  const handleChange = (e) => {
    setCheckbox(!checkbox);
  };

  

  return (
    <StyledPaper elevation={3}>
      <RewardInfo>
        {type !== "regular" && (
          <FormControlLabel
            control={
              <Checkbox
                checked={disabled}
                onChange={handleChange}
                name="checkedA"
              />
            }
            label={type}
          />
        )}

        <RightItems>

        <Title>
        <RewardName> {title}</RewardName>
        </Title>

        {/* <Cost>
          <TextField
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          label="cost"
          variant="outlined"
          size="small"
          />
        </Cost> */}
        <Range>
          <DifficultySelector selected={range} />
        </Range>
        </RightItems>
      </RewardInfo>
    </StyledPaper>
  );
};

export default RewardBox;
