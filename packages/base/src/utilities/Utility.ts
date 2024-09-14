import { Configuration } from "../hooks/useInstaStories";

import { Animation } from "../models";

import config from "./config";

const initialConfiguration: Configuration = {
  animation: Animation.Smart,
  duration: 5000,
  preset: undefined,
  preview: {
    shouldMount: true
  },
  timer: {
    shouldUseDefault: true,
    interval: 100
  },
  viewer: {
    shouldMount: false,
    story: 0
  }
};

/**
 * The Utility class provides helper functions for configuration and debugging.
 */
export class Utility {
  /**
   * Logs data to the console in development mode, analog `console.debug`
   * @param data - The data to be logged.
   */
  static debug(...data: unknown[]) {
    config.debug && console.debug("[INSTASTORIES]", ...data);
  }

  /**
   * Configures and returns a configuration object, merging it with default settings.
   * @param configuration - A partial configuration object to override default settings.
   * @returns The complete configuration object.
   */
  static configure(configuration: Partial<Configuration> = {}): Configuration {
    return {
      ...initialConfiguration,
      ...configuration,
      preview: {
        ...initialConfiguration.preview,
        ...configuration.preview
      },
      timer: {
        ...initialConfiguration.timer,
        ...configuration.timer
      },
      viewer: { ...initialConfiguration.viewer, ...configuration.viewer }
    };
  }
}

export default Utility;
