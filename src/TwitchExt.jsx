import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { createContext, useContextSelector } from "use-context-selector";
import { LOCAL_STORAGE_TOKEN_KEY } from "./constants";

export const TwitchExtContext = createContext();

export const twitch = window.Twitch.ext;

export const rigLog = window.Twitch.ext.rig.log;

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

    rigLog(config);
    if (configJson) {
      try {
        setConfig(JSON.parse(configJson));
      } catch (error) {
        throw new Error(error);
      }
    } else {
      try {
        twitch.configuration.onChanged(() => {
          const broadcaster = twitch.configuration.broadcaster;
          if (broadcaster?.content) {
            try {
              const config = JSON.parse(broadcaster.content);

              rigLog(config);
              setConfig(config);
            } catch (e) {
              console.log(e);
            }
          }
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

  return (
    <TwitchExtContext.Provider value={{ auth, config }}>
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
export const useAuth = () =>
  useContextSelector(TwitchExtContext, (v) => v.auth);
export const useConfig = () =>
  useContextSelector(TwitchExtContext, (v) => v.config);
