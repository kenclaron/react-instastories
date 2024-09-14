import React from "react";

import { Utility } from "../utilities";

import { type ViewerProps } from "../components";

import { type Animation } from "../models";

/**
 * Interface representing the preview configuration.
 */
interface Preview {
  /**
   * Mounts the preview on mounting main component.
   */
  readonly shouldMount: boolean;
}

/**
 * Interface representing the timer configuration if `useDefault = true`.
 */
interface DefaultTimer {
  /**
   * Uses default built-in default timer context
   */
  readonly shouldUseDefault?: true;
  /**
   * Sets interval for built-in timer context
   */
  readonly interval: number;
}

/**
 * Interface representing the timer configuration if `useDefault = false`.
 */
interface ExternalTimer {
  /**
   * Uses default built-in default timer context
   */
  readonly shouldUseDefault: boolean;
}

/**
 * Interface representing an active viewer configuration if `mounted = true`.
 */
interface ActiveViewer {
  /**
   * Mounts immediately active viewer on mounting the main component.
   */
  readonly shouldMount: boolean;
  /**
   * The index of the story was been opened only on `mounted = true`.
   */
  readonly story: number;
  /**
   * Props for the active viewer component.
   */
  readonly props?: ViewerProps;
}

/**
 * Interface representing a passive viewer configuration if `mounted = false`.
 */
interface PassiveViewer {
  /**
   * Mounts immediately active viewer on mounting the main component.
   */
  readonly shouldMount?: false;
  /**
   * The index of the story was been opened only on `mounted = true`.
   */
  readonly story?: 0;
  /**
   * Props for the active viewer component.
   */
  readonly props?: ViewerProps;
}

/**
 * Interface representing the complete configuration for InstaStories.
 */
export interface Configuration {
  /**
   * The animation type for opening state of viewer.
   * */
  readonly animation: Animation[keyof Animation];
  /**
   * The duration of each story in milliseconds by default.
   */
  readonly duration: number;
  /**
   * An optional preset-classname string for configuring viewer/preview components.
   */
  readonly preset?: string;
  /**
   * The configuration for the preview component.
   */
  readonly preview: Preview;
  /**
   * The configuration for the timer context.
   */
  readonly timer: DefaultTimer | ExternalTimer;
  /**
   * The configuration for the viewer component.
   */
  readonly viewer: ActiveViewer | PassiveViewer;
}

/**
 * Manage the configuration for library.
 *
 * @param {Partial<Configuration>} [config={}] - The partial configuration for library.
 * @returns The context value containing the configured settings.
 * @throws {Error} Throws an error if the provided configuration is not an object.
 */
export function useInstaStories(config: Partial<Configuration> = {}) {
  if (config && typeof config !== "object") {
    throw new Error("Config must be object");
  }

  return React.useMemo(() => ({ config: Utility.configure(config) }), [config]);
}

/* Creating a context object that is used to pass data down to the child components. */
export const InstaStoriesContext = React.createContext({
  config: Utility.configure()
});

InstaStoriesContext.displayName = "InstaStoriesContext";

export default useInstaStories;
