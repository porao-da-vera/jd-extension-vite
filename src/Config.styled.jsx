import styled from "styled-components";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

export const ConfigWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  padding: 16px;
`;

export const CostsWrapper = styled.div`
  display: flex;
  width: 50%;
`;

export const BannedControl = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Panel = styled.div`
  height: calc(100% - 48px);
`;

export const Content = styled(Box)`
  height: 100%;
`;

export const SongsToBanWrapper = styled.div``;

export const CostConfigWrapper = styled.div`
  display: flex;
  & > * {
    flex-basis: 50%;
    width: 50%;
  }
`;
export const ConfigForm = styled.div`
  flex-grow: 1;
  overflow: auto;
  display: flex;
  padding: 16px;
`;

export const ConfigActions = styled.div`
  flex-shrink: 0;
  padding: 20px;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
`;

export const ButtonStyled = styled(Button)`
  font-weight: bold;
`;

export const GameConfig = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  & > * {
    &:first-child {
      margin-right: 16px;
    }
    flex-basis: 50%;
  }
`;

export const GeneralConfig = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: calc(100% / 3);
  padding-right: 8px;
`;
