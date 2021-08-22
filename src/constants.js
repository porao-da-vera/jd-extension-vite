export const LOCAL_STORAGE_TOKEN_KEY = "Authorization";

export const BASE_URL = import.meta.env.VITE_EBS_URL;
export const API_BASE_URL = BASE_URL + "/api";
export const API = {
  USER: BASE_URL + "/user",
  CUSTOM_REWARDS: BASE_URL + "/rewards",
};

export const TRACKLIST_URL = BASE_URL + "/tracklist";

export const SONG_TYPES = ["Regular", "Alternate Routines", "Kids Mode"];

export const COLORS = {
  CIANO: "#39f8ff",
  BLUE: "#2572fe",
  GOLD: "#ff9c00",
  RED: "#ff133b",
  LIME: "#47ee3e",
  DARK_PINK: "rgb(255, 0, 179)",
  YELLOW: "#feca29",
  BLACK: "#312610",
  LIGHT_GRAY: "#efefef",
  GRAY: "#666",
  DARK_GRAY: "#333333",
  PURPLE: "#4b0f98",
  LIGHT_PURPLE: "#c115f8",
  GREEN: "#19bc10",
};

export const LIST_STATUS = {
  CLOSED: "Closed",
  ACTIVE: "Active",
  PAUSED: "Paused",
};

export const LOCAL_STORAGE_TWITCH_USER = {
  USER: "jdl-user",
  AUTHORIZATION: "jdl-Authorization",
  REFRESH_TOKEN: "jdl-refresh-token",
};

export const DIFFICULTIES = [null, "Easy", "Medium", "Hard", "Extreme", "Banned"];

export const MODES = [null, "Solo", "Duet", "Trio", "Dance Crew"];

export const REWARDS = {
  REGULAR: "regular",
  EXTREME: "extreme",
  BANNED: "banned",
  SUB: "sub",
  RAID: "raid",
};