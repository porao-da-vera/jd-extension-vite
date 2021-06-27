import React from "react";
import Button from "./Button";
import { COLORS } from "./constants";
import { Trash } from "./icons";

import {
  StyledBroadcasterForm,
  InputWrapper,
  CloseList,
  BroadcasterFormActions
} from "./BroadcasterForm.styled";
const BroadcasterForm = ({
  onSubmit,
  deleteList,
  submitText,
  showCloseList = false,
  dispatch,
  state,
}) => {
  return (
    <StyledBroadcasterForm onSubmit={onSubmit}>
      <InputWrapper>
        <label htmlFor="requests-per-live">Max per stream</label>
        <input
          id="requests-per-live"
          name="requests-per-stream"
          type="number"
          min="0"
          value={state.listConfig?.perStream ?? 0}
          onChange={(e) =>
            dispatch({ type: "setPerStream", payload: e.target.value })
          }
        />
      </InputWrapper>

      <InputWrapper>
        <label htmlFor="requests-per-viewer">Max per viewer</label>
        <input
          id="requests-per-viewer"
          name="requests-per-viewer"
          type="number"
          min="0"
          value={state.listConfig?.perViewer ?? 0}
          onChange={(e) =>
            dispatch({ type: "setPerViewer", payload: e.target.value })
          }
        />
      </InputWrapper>
      <small>Set 0 to unlimited</small>

      <BroadcasterFormActions>

      {showCloseList && (
        <CloseList onClick={deleteList}>
          Delete list <Trash />
        </CloseList>
      )}
      <Button type="submit" bgColor={COLORS.LIGHT_PURPLE}>
        {submitText}
      </Button>
      </BroadcasterFormActions>

    </StyledBroadcasterForm>
  );
};

export default BroadcasterForm;
