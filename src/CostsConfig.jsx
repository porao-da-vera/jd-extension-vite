import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Button from "./Button";
import { CostWrapper } from "./CostsConfig.styled";

const CostsConfig = ({ cost, setCost, children }) => {
  const useStyles = makeStyles((theme) => ({
    input: {
      width: "100%",
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  return (
    <CostWrapper
      className={classes.input}
      id="reward-title"
      label={children}
      type="number"
      value={cost}
      onChange={setCost}
      size="small"
      fullWidth
      variant="outlined"
    />
  );
};

export default CostsConfig;
