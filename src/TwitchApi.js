import { BASE_URL, LOCAL_STORAGE_TWITCH_USER } from "./constants";
export const twitch = window.Twitch.ext;

export const getTwitchConfig = (callback, init = true) => {
  if (init) {
    try {
      twitch.configuration.onChanged(() => {
        let config = twitch.configuration.broadcaster?.content;
        if (config) {
          config = JSON.parse(config);
        }
        typeof callback === "function" && callback(config);
      });
    } catch (error) {
      throw new Error(error);
    }
  } else {
    const json = twitch.configuration.broadcaster?.content;
    if (json) {
      return JSON.parse(json);
    }
    return null;
  }
};

export const setTwitchConfig = (data, callBack) => {
  twitch.configuration.set("broadcaster", "0.0.1", JSON.stringify(data));
  typeof callBack === "function" && callBack();
};
