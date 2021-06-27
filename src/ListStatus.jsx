import React, { useState, useRef } from "react";
import { LIST_STATUS } from "./constants";
import Toggle from "./Toggle";
import useOnClickOutside from "./UseClickOutside";
import {
  StatusWrapper,
  StatusToggle,
  ConfigBroadcaster,
  ConfigContainer,
  LeftSide,
  ListConfigWrapper,
  ListConfigIcon,
  ListConfigAmount
} from "./ListStatus.styled";
import BroadcasterForm from "./BroadcasterForm";

import { Cog, CloseIcon, PerStreamIcon, PerViewerIcon, SongListIcon, DancedIcon } from "./icons";

const ListConfig = ({icon, amount}) => (
  <ListConfigWrapper>
    <ListConfigIcon>{icon}</ListConfigIcon>
    <ListConfigAmount>{amount}</ListConfigAmount>
  </ListConfigWrapper>
)

const ListStatus = ({
  listConfig,
  currentAmount,
  dancedAmount,
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
        <LeftSide>
          <StatusToggle>
            {listConfig.status}&nbsp;
            <Toggle
              value={listConfig.status === LIST_STATUS.ACTIVE}
              onChange={handleChangeStatus}
            />
          </StatusToggle>
          <ListConfig icon={<SongListIcon size={20} />} amount={currentAmount} />
          <ListConfig icon={<DancedIcon size={20} />} amount={dancedAmount} />
          <ListConfig icon={<PerStreamIcon size={20} />} amount={listConfig.perStream} />
          <ListConfig icon={<PerViewerIcon size={20} />} amount={listConfig.perViewer} />
          
        </LeftSide>

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
