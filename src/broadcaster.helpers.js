import { getList } from "./api";

export const listenBroadcaster = ({
  setSongList,
  setListConfig,
  dispatch,
}) => {
  getList()
    .then((result) => {
      const { listStatus, list } = result;
      setSongList(list);
      setListConfig(listStatus);
    })
    .catch((error) => {
      console.log(error);
    });
  window.Twitch.ext.listen("broadcast", (target, contentType, message) => {
    const { type, data } = JSON.parse(message);
    dispatch({
      type,
      payload: data,
    });
  });
};
