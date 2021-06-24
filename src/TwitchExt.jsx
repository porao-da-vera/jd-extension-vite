import React, { useContext, useState, useEffect } from "react";

import { createContext, useContextSelector } from 'use-context-selector';

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
    type === "config" &&
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
      setAuth(auth);
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
export const useAuth = () => useContextSelector(TwitchExtContext, v => v.auth);
export const useConfig = () => useContextSelector(TwitchExtContext, v => v.config);

