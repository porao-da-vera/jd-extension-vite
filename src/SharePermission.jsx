import React from "react";
import { Wrapper, PermissionInfo } from "./SharePermission.styled";
import Button from "./Button";

const SharePermission = ({ requestPermission }) => {
  return (
    <Wrapper>
      <PermissionInfo>
        We need your Twitch user ID so we can store your tickets.
      </PermissionInfo>
      <Button onClick={requestPermission}>Grant Access</Button>
    </Wrapper>
  );
};

export default SharePermission;
