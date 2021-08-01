import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

export const Reward = styled.div``;

export const StyledPaper = styled(Paper)`
  width: 100%;
  margin: 0.3rem 0;
  padding: 1rem;
  display: flex;
  flex-direction: row;
`;

export const LeftSection = styled.div`
  display: flex;
  min-width: 47px;
`;

export const TwitchRewardEditBtn = styled(IconButton)`
  margin: 0 .3rem;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
`;

export const TwitchReward = styled.div`
  display: flex;
  width: 100%;
  margin: 0.5rem 0;
`;

export const TwitchRewardInfo = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
`;


export const StyledInput = styled.input`
  width: 100%;
`;
export const Title = styled.div`
  margin-right: 8px;
`;

export const Cost = styled.div`
  max-width: 72px;
`;

export const Range = styled.div``;

export const RewardName = styled.div``;
