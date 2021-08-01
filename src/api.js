import {
  API_BASE_URL,
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_TWITCH_USER,
} from "./constants";

const routes = {
  song: API_BASE_URL + "/song",
  list: API_BASE_URL + "/list",
  broadcaster: API_BASE_URL + "/broadcaster",
  reward: API_BASE_URL + "/reward",
  tracklist: API_BASE_URL + "/tracklist",
  initViewer: API_BASE_URL + "/viewer",
  initConfig: API_BASE_URL + "/initConfig",
};

const options = () => {
  return {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY),
    },
  };
};

export const getGameList = () => {
  return new Promise((resolve, reject) => {
    fetch(routes.tracklist, options())
      .then((response) => {
        if(response.ok) {
          return response.json();
        } else {
          data.json().then(err => reject(JSON.stringify(data)));
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getList = () => {
  return new Promise((resolve, reject) => {
    fetch(routes.list, options()).then((response) =>
      response
        .json()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        })
    );
  });
};
export const getInitialViewer = () => {
  return new Promise((resolve, reject) => {
    fetch(routes.initViewer, options()).then((response) =>
      response
        .json()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        })
    );
  });
};
export const initConfig = () => {
  return new Promise((resolve, reject) => {
    fetch(routes.initConfig, options()).then((response) =>
      response
        .json()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        })
    );
  });
};

export const addSongToList = (song, display_name) => {
  return fetch(routes.song, {
    method: "POST",
    headers: options().headers,
    body: JSON.stringify({ song, display_name }),
  });
};

// broadcaster

export const createList = ({ perStream, perViewer }) => {
  fetch(routes.list, {
    method: "POST",
    headers: options().headers,
    body: JSON.stringify({ perStream, perViewer }),
  });
};

export const changeListStatus = (config) => {
  return fetch(routes.list, {
    method: "PATCH",
    headers: options().headers,
    body: JSON.stringify(config),
  });
};

export const deleteList = () => {
  return fetch(routes.list, {
    method: "DELETE",
    headers: options().headers,
  });
};

export const removeSongFromList = (songId) => {
  return fetch(`${routes.song}`, {
    method: "DELETE",
    headers: options().headers,
    body: JSON.stringify({ songId }),
  });
};

export const changeSongStatus = (songId, danced) => {
  return fetch(`${routes.song}/${songId}`, {
    method: "PATCH",
    headers: options().headers,
    body: JSON.stringify({ danced }),
  });
};

export const getAllRewards = () => {
  const appToken = window.localStorage.getItem(
    LOCAL_STORAGE_TWITCH_USER.AUTHORIZATION
  );
  return fetch(routes.reward + "?token=" + appToken, {
    method: "GET",
    headers: options().headers,
  });
};

export const updateRewardsCost = ({ bannedCost, extremeCost }) => {
  return fetch(routes.reward, {
    method: "PUT",
    headers: options().headers,
    body: JSON.stringify({ bannedCost, extremeCost }),
  });
};

export const validateAndRefresh = () => {
  return new Promise((resolve, reject) => {
    const token = window.localStorage.getItem(
      LOCAL_STORAGE_TWITCH_USER.AUTHORIZATION
    );
    const refreshToken = window.localStorage.getItem(
      LOCAL_STORAGE_TWITCH_USER.REFRESH_TOKEN
    );
    if (token && refreshToken) {
      fetch(`${API_BASE_URL}/validate`, {
        method: "POST",
        headers: options().headers,
        body: JSON.stringify({ token, refreshToken }),
      })
        .then((blob) => {
          return blob.json();
        })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject(null);
    }
  });
};

export const fixRewards = (rewards) => {
  const token = window.localStorage.getItem(
    LOCAL_STORAGE_TWITCH_USER.AUTHORIZATION
  );
  return fetch(`${API_BASE_URL}/fixrewards`, {
    method: "POST",
    headers: options().headers,
    body: JSON.stringify({ rewards, token }),
  });
};

export const updateReward = ({data, reward}) => {
  const token = window.localStorage.getItem(
    LOCAL_STORAGE_TWITCH_USER.AUTHORIZATION
  );
  return fetch(routes.reward, {
    method: "PATCH",
    headers: options().headers,
    body: JSON.stringify({data, reward, token}),
  });
}

export const updateRewardRange = ({ regularRange, extremeRange, bannedRange, subRange, raidRange }) => {
  return fetch(routes.reward, {
    method: "PUT",
    headers: options().headers,
    body: JSON.stringify({regularRange, extremeRange, bannedRange, subRange, raidRange }),
  });
}


