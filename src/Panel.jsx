import React from "react";

import { useAuth, rigLog } from "./TwitchExt";

const Panel = () => {
  const auth = useAuth();
  return <div>Hello viewer with ID {auth?.userId}</div>;
};

export default Panel;
