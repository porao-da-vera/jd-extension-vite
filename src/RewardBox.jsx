import React, { useState } from "react";
import { Reward, RewardInfo, Title, Cost, Range } from "./RewardBox.styled";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import { DIFFICULTIES } from "./constants";

const difficulties = DIFFICULTIES.slice(1);

const DifficultySelector = ({ selected, onSelect }) => {
  return difficulties.map((dif, idx) => {
    let checked; 
    if(selected.length === 1) {
      checked = idx === selected[0];
    } else {
      checked = idx >= selected[0] && idx <= selected[1];
    }    
    return <Chip color={checked ? 'primary' : ''} label={dif} key={idx} size="small" />;
  });
};

const RewardBox = ({ reward, range, type }) => {
  const [title, setTitle] = useState(reward.title);
  const [cost, setCost] = useState(reward.cost);
  const [checkbox, setCheckbox] = useState(true);

  const handleChange = (e) => {
    setCheckbox(!checkbox);
  };
  return (
    <Paper elevation={3}>
      <RewardInfo>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkbox}
              onChange={handleChange}
              name="checkedA"
            />
          }
          label={type}
        />
        <Title>
          <TextField
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            label="name"
            size="small"
          />
        </Title>

        <Cost>
          <TextField
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            label="cost"
            variant="outlined"
            size="small"
          />
        </Cost>
        <Range>
          <DifficultySelector selected={range} />
        </Range>
      </RewardInfo>
    </Paper>
  );
};

export default RewardBox;
