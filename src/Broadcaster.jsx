import React, { useEffect, useContext, useReducer } from "react";
import { LIST_STATUS } from "./constants";
import ListStatus from "./ListStatus";
import RequestedSongList from "./RequestedSongList";
import BroadcasterForm from "./BroadcasterForm";
import { Wrapper, FormWrapper } from "./Broadcaster.styled";
import { useAuth, useConfig } from "./TwitchExt";
import { listenBroadcaster } from "./broadcaster.helpers";
import Spinner from "./Spinner";
import { reducer, initialState } from "./broadcaster.reducer";

import {
  createList,
  removeSongFromList,
  changeSongStatus,
  changeListStatus,
  deleteList,
} from "./api";

const Broadcaster = () => {
  const auth = useAuth();
  const config = useConfig();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCreateList = (e) => {
    e.preventDefault();
    const perViewer = e.target["requests-per-viewer"].value;
    const perStream = e.target["requests-per-stream"].value;

    createList({ perStream, perViewer });
  };

  useEffect(() => {
    if (auth) {
      listenBroadcaster({
        auth,
        setSongList: (value) =>
          dispatch({ type: "setSongList", payload: value }),
        setListConfig: (value) =>
          dispatch({ type: "setListConfig", payload: value }),
        dispatch,
      });
    }
  }, [auth]);

  if (state.listConfig === null) {
    return <Spinner />;
  }
  return auth &&
    (state.listConfig.status === LIST_STATUS.ACTIVE ||
      state.listConfig.status === LIST_STATUS.PAUSED) ? (
    <Wrapper>
      <ListStatus
        listConfig={state.listConfig}
        currentAmount={state.songList.length}
        dancedAmount={state.songList.filter(song => song.song.danced).length}
        onChange={(value) =>
          dispatch({ type: "setListConfig", payload: { listConfig: value } })
        }
        changeListStatus={changeListStatus}
        deleteList={deleteList}
        dispatch={dispatch}
        state={state}
      />
      <RequestedSongList
        songList={state.songList}
        onRemove={removeSongFromList}
        onStatusChange={changeSongStatus}
        showControls={true}
        clickable={false}
        useRewards={config.useRewards}
      />
    </Wrapper>
  ) : (
    <FormWrapper>
      <BroadcasterForm
        state={state}
        dispatch={dispatch}
        onSubmit={handleCreateList}
        submitText="Create list"
      />
    </FormWrapper>
  );
};

export default Broadcaster;
