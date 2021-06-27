import styled from "styled-components";

export const Wrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Viga&display=swap");
  font-family: "Viga", sans-serif;
  width: 50%;
  display: flex;
  flex-direction: column;
  &:first-child {
    margin-right: 16px;
  }
`;

export const SongList = styled.div`
  overflow: hidden auto;
  flex-grow: 1;
`;

export const Header = styled.div`
  flex-shrink: 0;
  height: auto;
`;

export const Title = styled.div``;
