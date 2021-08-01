import React, { useEffect, useState } from "react";
import { Wrapper, RewardForm } from "./RewardsConfig.styled";
import { getAllRewards } from "./api";
import Spinner from "./Spinner";
import RewardBox from "./RewardBox";
import Button from "@material-ui/core/Button";
import { REWARDS } from "./constants";

const RewardsConfig = ({ useBanned, useExtreme, dispatch }) => {
  const [rewards, setRewards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('useEffect rewards config', rewards)
    if(!rewards.length) {
      setIsLoading(true);
      getAllRewards()
        .then((rawResponse) => {
          if (rawResponse.ok) {
            rawResponse.json().then((response) => {
              setRewards(response);
              dispatch({type: 'setCosts', payload: response.reduce((obj, reward) => {
                obj[reward.type] = reward.range;
                return obj;
              }, {})})
              setIsLoading(false);
            });
          } else {
            rawResponse.json().then((err) => {
              console.error(err);
              setIsLoading(false);
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, []);

  return isLoading && !rewards.length ? (
    <Spinner />
  ) : (
    <Wrapper>
      {rewards.map((reward) => {
        const { data, range, type, id } = reward;
        const disabled =
          (type === REWARDS.BANNED && useBanned) ||
          (type === REWARDS.EXTREME && useExtreme);
        return (
          <RewardBox
            reward={data}
            range={range}
            type={type}
            key={id}
            disabled={disabled}
            dispatch={dispatch}
          />
        );
      })}
    </Wrapper>
  );
};

export default RewardsConfig;
