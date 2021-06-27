import React, { useState, useRef } from "react";
import { LIST_STATUS } from "./constants";
import Toggle from "./Toggle";
import useOnClickOutside from "./UseClickOutside";
import {
  StatusWrapper,
  StatusToggle,
  ConfigBroadcaster,
  ConfigContainer,
} from "./ListStatus.styled";
import BroadcasterForm from "./BroadcasterForm";

import { Cog, CloseIcon } from "./icons";

const ListStatus = ({
  songListStatus,
  changeListStatus,
  deleteList,
  dispatch,
  state,
}) => {
  const [showConfig, setShowConfig] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, () => setShowConfig(false));

  const handleChangeStatus = (value) => {
    const status = value ? LIST_STATUS.ACTIVE : LIST_STATUS.PAUSED;
    changeListStatus({ ...state.listConfig, status });
  };

  const updateListLimits = (e) => {
    e.preventDefault();

    changeListStatus({
      ...state.listConfig,
      perViewer: state.listConfig.perViewer,
      perStream: state.listConfig.perStream,
    });

    setShowConfig(false);
  };
  return (
    <div>
      <StatusWrapper>
        <StatusToggle>
          {songListStatus}&nbsp;
          <Toggle
            value={songListStatus === LIST_STATUS.ACTIVE}
            onChange={handleChangeStatus}
          />
        </StatusToggle>

        <ConfigBroadcaster onClick={() => setShowConfig(!showConfig)}>
          {showConfig ? <CloseIcon /> : <Cog />}
        </ConfigBroadcaster>

        {showConfig && (
          <ConfigContainer ref={ref}>
            <BroadcasterForm
              onSubmit={updateListLimits}
              submitText="Save"
              showCloseList={true}
              deleteList={deleteList}
              dispatch={dispatch}
              state={state}
            />
          </ConfigContainer>
        )}
      </StatusWrapper>
    </div>
  );
};

export default ListStatus;
