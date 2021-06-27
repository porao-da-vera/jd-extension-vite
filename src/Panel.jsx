
import React, { useEffect, useReducer, useContext } from "react";
import { LIST_STATUS } from "./constants";
import { Scope, Main } from "./Panel.styled";
import { handleFilter, viewerListener, mapSongList } from "./Panel.helpers";
import { getGameList } from "./api";
import useDebounce from "./useDebounce";
import ListHeader from "./ListHeader";
import { initialState, reducer } from "./PanelReducer";
import ViewerView from "./PanelView";
import Spinner from "./Spinner";
import SharePermission from "./SharePermission";
import RequestedSongList from "./RequestedSongList";
import ListWarning from "./ListWarning";

import { useAuth, useConfig, twitch } from "./TwitchExt";

const Panel = () => {
  const auth = useAuth();
  const config = useConfig();
  const [state, dispatch] = useReducer(reducer, initialState);
  const debouncedFilter = useDebounce(state.filter, 500);

  useEffect(() => {
    if (auth) {
      getGameList()
        .then((data) => {
          dispatch({
            type: "setGameList",
            payload: data,
          });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: "setLoading", payload: false });
        });
      viewerListener({
        opaque_user_id: auth.opaque_user_id,
        dispatch
      });      
    }
  }, [auth]);

  useEffect(() => {
    if (config && state.gameList) {
      dispatch({
        type: "setSongList",
        payload: mapSongList({ config, gameList: state.gameList }),
      });
    }
  }, [config, state.gameList]);

  // if pause reset request view
  useEffect(() => {
    if (state.listConfig) {
      if (state.listConfig.status === LIST_STATUS.PAUSED) {
        dispatch({ type: "setIsRequestView", payload: false });
      }
    }
  }, [state.listConfig]);

  // filter
  useEffect(() => {
    if (state.songList.length === 0) return;
    const list = state.songList;
    dispatch({
      type: "setFilteredSongs",
      payload: handleFilter(debouncedFilter, list, state.requestedIds),
    });
  }, [debouncedFilter, state.songList]);

  const handleRequestClick = () => {
    dispatch({ type: "setIsRequestView", payload: !state.isRequestView });
  };

  switch (true) {
    case !twitch.viewer.isLinked:
      return <SharePermission requestPermission={twitch.actions.requestIdShare} />;
    case state.tickets === -1 ||
      state.songList.length === 0 ||
      !config ||
      state.loading:
      return <Spinner />;
    case config.useRewards &&
      state.isRequestView &&
      (Number(state.tickets) === 0 || state.tickets === null):
      return (
        <>
          <ListHeader
            handleRequestClick={handleRequestClick}
            isRequestView={state.isRequestView}
            tickets={state.tickets}
            showTickets={config.useRewards}
            listStatus={state.listConfig.status}
          />
          <ListWarning>
            You don't have any tickets 😐.
            <br /> Please buy more with channel points.
          </ListWarning>
        </>
      );
    case state.listConfig.status === LIST_STATUS.CLOSED:
      return (
        <ListWarning>
          The list is not open yet 😐.
          <br /> Wait for the streamer to start it.
        </ListWarning>
      );
    case state.requestedSongs.length === 0 && !state.isRequestView:
      return (
        <>
          <ListHeader
            handleRequestClick={handleRequestClick}
            listStatus={state.listConfig.status}
          />
          <Main>
            <ListWarning>
              {state.listConfig.status === LIST_STATUS.ACTIVE
                ? 'There aren\'t musics here yet 😶.\n You can be the first to ask one, by clicking on the "+" button at the top right corner'
                : 'There aren\'t musics here yet 😶.\n As soon as the streamer allow, you can be the first by clicking on the "+" button at the top right corner.'}
            </ListWarning>
            ;
          </Main>
        </>
      );
    case state.isRequestView && state.listConfig.status === LIST_STATUS.ACTIVE:
      return (
        <>
          <ListHeader
            handleRequestClick={handleRequestClick}
            tickets={state.tickets}
            showTickets={config.useRewards}
            isRequestView={state.isRequestView}
            listStatus={state.listConfig.status}
          />
          <Main>
            <ViewerView auth={auth} dispatch={dispatch} state={state} />
          </Main>
        </>
      );
    default:
      return (
        <>
          <ListHeader
            handleRequestClick={handleRequestClick}
            isRequestView={state.isRequestView}
            showTickets={config.useRewards}
            tickets={state.tickets}
            listStatus={state.listConfig.status}
          />
          <Main>
            <RequestedSongList
              songList={state.requestedSongs}
              showControls={false}
            />
          </Main>
        </>
      );
  };
};

export default Panel;
