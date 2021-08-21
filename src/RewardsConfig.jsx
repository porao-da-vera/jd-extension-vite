import React, { useEffect, useState } from "react";
import { Wrapper, RewardForm } from "./RewardsConfig.styled";
import { getAllRewards, validateAndRefresh, fixRewards } from "./api";
import Spinner from "./Spinner";
import RewardBox from "./RewardBox";
import Button from "@material-ui/core/Button";
import { REWARDS } from "./constants";
import { saveToken } from "./Config.helpers";

const RewardsConfig = ({ useBanned, useExtreme, dispatch, costs }) => {
  const [rewards, setRewards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("useEffect rewards config", rewards);
    if (!rewards.length) {
      setIsLoading(true);
      validateAndRefresh()
        .then((result) => {
          if (result?.status !== "OK") {
            saveToken(result.access_token, result.refresh_token);
          }
          getAllRewards()
            .then((rawResponse) => {
              if (rawResponse.ok) {
                rawResponse.json().then((response) => {
                  setRewards(response);
                  console.log("rewards", response);
                  dispatch({
                    type: "setCosts",
                    payload: response.reduce((obj, reward) => {
                      obj[reward.type] = reward.range;
                      return obj;
                    }, {}),
                  });
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
        })
        .catch((err) => {
          setIsLoading(false);
          console.error("error validate and refresh: ", err);
        });
    }
  }, []);

  const handleFixRewards = () => {
    setIsLoading(true);
    const rewardsToFix = rewards
      .filter((reward) => !reward.isValidSub || !reward.data)
      .map(({ id, data, isValidSub, type }) => {
        return { id, isAvailable: !!data, isValidSub, type };
      });

    fixRewards(rewardsToFix)
      .then((blob) => blob.json())
      .then((results) => {
        const newRewards = rewards.map(
          (reward) =>
            results.find((result) => result.type === reward.type) ?? reward
        );
        console.info(newRewards)
        setRewards(newRewards);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  return isLoading ? (
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
            range={costs[type]}
            type={type}
            key={id}
            disabled={disabled}
            dispatch={dispatch}
            handleFixRewards={handleFixRewards}
          />
        );
      })}
    </Wrapper>
  );
};

export default RewardsConfig;
