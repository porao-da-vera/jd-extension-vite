import React, { createContext, useContext, useState, useEffect } from "react";
import { LOCAL_STORAGE_TOKEN_KEY } from "./constants";
import jwtDecode from "jwt-decode";

export const TwitchExtContext = createContext();

const twitch = window.Twitch.ext;

const updateConfigFromListener = (
  target,
  contentType,
  msg,
  config,
  setConfig
) => {
  const { type, data } = JSON.parse(msg);
  if (
    type === "configChange" &&
    JSON.stringify(data) !== JSON.stringify(config)
  ) {
    setConfig(data);
  }
};

export const TwitchExtProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [config, setConfig] = useState(null);
  // isLinked

  useEffect(() => {
    console.log('auth/config: ', auth, config )
  }, [auth, config]);
  useEffect(() => {
    twitch.onAuthorized((auth) => {
      const decodedToken = jwtDecode(auth.token);
      const { user_id, channel_id } = decodedToken;
      const newAuth = {
        ...decodedToken,
        channelId: channel_id,
        userId: user_id,
      };
      setAuth(newAuth);
      window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, auth.token);
    });
    // init config
    const configJson = twitch.configuration.broadcaster?.content;
    if (configJson) {
      try {
        setConfig(JSON.parse(configJson));
      } catch (error) {
        throw new Error(error);
      }
    } else {
      try {
        twitch.configuration.onChanged(() => {
          let newConfig = twitch.configuration.broadcaster?.content;
          if (newConfig) {
            newConfig = JSON.parse(newConfig);
          }
          setConfig(newConfig);
        });
      } catch (error) {
        throw new Error(error);
      }
    }
    window.Twitch.ext.listen("broadcast", (target, contentType, msg) =>
      updateConfigFromListener(target, contentType, msg, config, setConfig)
    );
    return () => {
      window.Twitch.ext.unlisten("broadcast", updateConfigFromListener);
    };
  }, []);

  const requestPermission = () => {
    window.Twitch.ext.actions.requestIdShare();
  };

  return (
    <TwitchExtContext.Provider value={{ auth, config, requestPermission }}>
      {children}
    </TwitchExtContext.Provider>
  );
};

export const TwitchExtConsumer = TwitchExtContext.Consumer;

/**
 * Can only be used by functional components.
 * If you need the state in a class, use `SelfServiceConsumer` instead.
 * @see https://reactjs.org/docs/hooks-reference.html#usecontext
 */
export const useTwitchContextState = () => useContext(SelfServiceContext);

export default TwitchExtContext;
