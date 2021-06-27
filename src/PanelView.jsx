import React, { useEffect, useState } from "react";
import SelectedSong from "./SelectedSong";
import ViewerSongList from "./PanelSongList";
import { addSongToList } from "./api";
import ListWarning from "./ListWarning";
import FilterSection from "./FilterSection";
import { ViewerViewWrapper } from "./PanelView.styled";

const handleAddSong = (song, dispatch, display_name) => {
  // song.difficulty >= 4 && (song = { ...song, difficulty: 4 });

  const newSong = { ...song };

  dispatch({ type: "setLoading", payload: true });

  addSongToList({ ...newSong, danced: false }, display_name)
    .then((res) => {
      if (res.status === 409) {
        console.log("errorMsg", res);
        dispatch({ type: "setAddSongError", payload: "duplicated song" });
      } else {
        dispatch({
          type: "setSelectedSong",
          payload: { isRequestView: false, selectedSong: null },
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const ViewerView = ({ state, dispatch, auth }) => {
  const {
    loading,
    selectedSong,
    filteredSongs,
    bannedCost,
    bannedIds,
    requestedSongs,
    tickets
  } = state;

  const canAddSong = () => {
    const userId = auth.user_id;
    const perViewer = Number(state.listConfig.perViewer);
    const perStream = Number(state.listConfig.perStream);
    
    const viewerAmountOfRequests = requestedSongs.reduce((acc, cur) => {
      cur.viewer.user_id === userId && acc++;
      return acc;
    }, 0);
    
    return {
      perStream: perStream === 0 || requestedSongs.length < perStream,
      perViewer: perViewer === 0 || viewerAmountOfRequests < perViewer,
    };
  };

  if (tickets < Number(selectedSong?.cost)) {
    return (
      <ListWarning
        buttonLabel="Back"
        onClick={() => dispatch({ type: "setSelectedSong", payload: { isRequestView: true, selectedSong: null } })}
      >
        You don't have enough tickets 😐.
        <br /> Please buy more with channel points.
      </ListWarning>
    );
  }
  if (selectedSong) {
    return (
      <SelectedSong
        song={selectedSong}
        onCancel={() =>
          dispatch({
            type: "setSelectedSong",
            payload: { isRequestView: true, selectedSong: null },
          })
        }
        onConfirm={() => handleAddSong(selectedSong, dispatch, state.display_name)}
        extremeCost={state.extremeCost}
        canAddSong={canAddSong()}
        addSongError={state.handleAddSongError}
        dispatch={dispatch}
      />
    );
  }
  return (
    <>
      <FilterSection
        filter={state.filter}
        onChange={(value) => {
          dispatch({ type: "setFilter", payload: value });
        }}
        dispatch={dispatch}
      />
      <ViewerViewWrapper>
        <ViewerSongList
          listStatus={state.listConfig.status}
          dispatch={dispatch}
          isLoading={loading}
          songList={filteredSongs}
          extremeCost={state.extremeCost}
          bannedCost={bannedCost}
          bannedIds={bannedIds}
          requestedIds={state.requestedIds}
        />
      </ViewerViewWrapper>
    </>
  );
};

export default ViewerView;
