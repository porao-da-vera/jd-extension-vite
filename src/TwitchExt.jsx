import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { createContext, useContextSelector } from "use-context-selector";
import { LOCAL_STORAGE_TOKEN_KEY } from "./constants";
import { defaultConfig } from "./Config.helpers";
import { setTwitchConfig } from "./TwitchApi";
import { initConfig } from "./api";
import { asyncLocalStorage } from './utils';

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
      asyncLocalStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, auth.token).then(() => {
        setAuth(newAuth);
      });
    });
    twitch.configuration.onChanged(function(){
      const broadcaster = twitch.configuration.broadcaster;
      console.info('config from twitch: ', broadcaster)
        if (broadcaster?.content) {
          try {
            const config = JSON.parse(broadcaster.content);
            setConfig(config);
          } catch (e) {
            console.log(e);
          }
        } else {
          // looks like twitch ext doesn't like to check and set right after it
          setTimeout(() => {
            console.info("setConfig");
            setTwitchConfig(defaultConfig, () => {
              initConfig();
              setConfig(defaultConfig);
            });
          }, 50);
        }
    })
  }, []);
  useEffect(() => {
    // if (auth && !config) {
    //   // init config
    //   try {
    //     const broadcaster = twitch.configuration.broadcaster;
    //     if (broadcaster?.content) {
    //       console.info(broadcaster.content);
    //       try {
    //         const config = JSON.parse(broadcaster.content);
    //         setConfig(config);
    //       } catch (e) {
    //         console.log(e);
    //       }
    //     } else {
    //       // looks like twitch ext doesn't like to check and set right after it
    //       setTimeout(() => {
    //         console.info("setConfig");
    //         setTwitchConfig(defaultConfig, () => {
    //           initConfig();
    //           setConfig(defaultConfig);
    //         });
    //       }, 50);
    //     }
    //   } catch (error) {
    //     throw new Error(error);
    //   }

    // }
    window.Twitch.ext.listen("broadcast", (target, contentType, msg) =>
      updateConfigFromListener(target, contentType, msg, config, setConfig)
    );
    return () => {
      window.Twitch.ext.unlisten("broadcast", updateConfigFromListener);
    };
  }, [auth]);

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
