import React, { useEffect, useState } from "react";
import { Wrapper, RewardForm } from "./RewardsConfig.styled";
import { getAllRewards } from "./api";
import Spinner from "./Spinner";
import RewardBox from "./RewardBox";
import Button from "@material-ui/core/Button";
const RewardsConfig = () => {
  const [rewards, setRewards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllRewards()
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log(response);
        setRewards(response);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };
  return isLoading && !rewards.length ? (
    <Spinner />
  ) : (
    <RewardForm onSubmit={handleSubmit}>
      <Wrapper>
        {rewards.map((reward) => {
          return (
            <RewardBox
              reward={reward.data}
              range={reward.range}
              type={reward.type}
              key={reward.id}
            />
          );
        })}
      </Wrapper>
      <Button type="submit" variant="contained" color="primary">
        Save Rewards
      </Button>
    </RewardForm>
  );
};

export default RewardsConfig;
