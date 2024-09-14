import React from "react";

import { Utility } from "../utilities";

import { Animation, TransitionStep } from "../models";

import useAnimation from "./useAnimation";
import useConfigurable from "./useConfigurable";
import { type Configuration } from "./useInstaStories";
import useTransition from "./useTransition";

export interface ViewerEvents {
  /**
   * Callback function triggered when the viewer opens.
   */
  onOpen?(): void;
  /**
   * Callback function triggered when the viewer is shown.
   */
  onShow?(): void;
  /**
   * Callback function triggered when the viewer is hidden.
   */
  onHide?(): void;
  /**
   * Callback function triggered when the viewer closes.
   */
  onClose?(): void;
}

export interface ViewerContextValue {
  /**
   * Contains the animation-related methods and values.
   */
  readonly animation: ReturnType<typeof useAnimation>;
  /**
   * Contains the transition-related methods and values.
   */
  readonly transition: ReturnType<typeof useTransition>;
  /**
   * Contains the configurable-related methods and values.
   */
  readonly configurable: ReturnType<typeof useConfigurable>;
  /**
   * Indicates whether the viewer is currently mounted in the DOM.
   */
  readonly mounted: boolean;
  /**
   * Indicates whether the viewer is currently shown.
   */
  readonly shown: boolean;
  /**
   * Method to open the viewer.
   */
  open(): void;
  /**
   * Method to close the viewer.
   */
  close(): void;
}

/**
 * Hook to manage the state and behavior of the Viewer component.
 *
 * @param {ViewerEvents} events - The events that can be triggered by the Viewer.
 * @param {Configuration} config - The configuration for the Viewer.
 *
 * @example
 * ```tsx
 * const viewer = useViewer(events, config);
 * ```
 */
export function useViewer(
  events: ViewerEvents,
  config: Configuration
): ViewerContextValue {
  const [shown, setShown] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const configurable = useConfigurable();
  const transition = useTransition(shown, config);
  const animation = useAnimation(transition.step, config);

  /**
   * Opens/mounts the viewer.
   */
  function open() {
    if (events.onOpen?.()) return;

    Utility.debug("Viewer was opened");

    setMounted(true);
    show();
  }

  /**
   * Visually shows the viewer.
   */
  function show() {
    if (events.onShow?.()) return;

    Utility.debug("Viewer was showed");

    setMounted(true);
    setShown(true);
  }

  /**
   * Visually hides the viewer.
   */
  function hide() {
    if (events.onHide?.()) return;

    Utility.debug("Viewer was hide");

    setShown(false);
  }

  /**
   * Closes/unmounts the viewer.
   */
  const close = React.useCallback(() => {
    if (events.onClose?.()) return;

    Utility.debug("Viewer was closed");

    setShown(false);
    setMounted(false);
    transition.cancel();
  }, [events.onClose]);

  React.useEffect(() => {
    if (transition.step === TransitionStep.Exited) close();
  }, [transition.step]);

  return React.useMemo<ViewerContextValue>(
    () => ({
      animation,
      configurable,
      transition,
      shown,
      mounted,
      open: config.animation === Animation.Immediately ? show : open,
      close: config.animation === Animation.Immediately ? close : hide
    }),
    [
      config.animation,
      animation,
      configurable,
      transition,
      mounted,
      shown,
      show,
      open,
      close,
      hide
    ]
  );
}

/* Creating a context object that is used to pass data down to the child components. */
export const ViewerContext = React.createContext<ViewerContextValue>({
  animation: {
    execute: () => {},
    setTarget: () => {},
    target: undefined,
    style: undefined
  },
  configurable: {
    viewer: { Children: () => null, set: () => {} },
    story: { Children: () => null, set: () => {} },
    page: { Children: () => null, set: () => {} }
  },
  transition: {
    storyRef: React.createRef(),
    viewerRef: React.createRef(),
    step: null,
    cancel: () => {}
  },
  shown: false,
  mounted: false,
  open: () => {},
  close: () => {}
});

ViewerContext.displayName = "ViewerContext";

/**
 * Hook to access the Viewer context.
 *
 * @example
 * ```tsx
 * const viewer = useViewerContext();
 * ```
 */
export function useViewerContext() {
  return React.useContext(ViewerContext);
}

export default useViewer;
