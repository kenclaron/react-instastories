import React from "react";

import { Utility } from "../utilities";

import { Animation, TransitionStep } from "../models";

import { type Configuration } from "./useInstaStories";

/**
 * A custom hook that manages the animation state and behavior for a given transition step and configuration.
 *
 * @param {TransitionStep | null} step - The current transition step of the animation.
 * @param {Configuration} config - The configuration settings for the animation.
 *
 * @example
 * const { execute, setTarget, style } = useAnimation(step, config);
 *
 * <button onClick={(event) => execute(event.currentTarget)}>
 *  Animate
 * </button>
 * <div ref={setTarget} style={style}>Animated Element</div>
 */
export function useAnimation(
  step: TransitionStep | null,
  config: Configuration
) {
  const [target, setTarget] = React.useState<EventTarget & HTMLElement>();
  const [style, setStyle] = React.useState<React.CSSProperties>();

  /**
   * Get rectangle position of target element and set style with that values.
   */
  const initializeRectangle = React.useCallback(
    (target: EventTarget & HTMLElement) => {
      if (
        !(target instanceof HTMLElement) ||
        config.animation !== Animation.Smart ||
        !document.body.contains(target)
      )
        return;

      const rect = target.getBoundingClientRect();

      setStyle({
        position: "fixed",
        transform: "translate(-50%, -50%)",
        left: rect.x + rect.width / 2,
        top: rect.y + rect.height / 2,
        width: rect.width,
        height: rect.height
      });
    },
    [config.animation]
  );

  const execute = React.useCallback(
    (target: EventTarget & HTMLElement) => {
      if (config.animation !== Animation.Smart) return;

      setTarget(target);
      initializeRectangle(target);

      Utility.debug("Animation executed");
    },
    [config.animation, setTarget, initializeRectangle]
  );

  React.useEffect(() => {
    if (config.animation !== Animation.Smart) return;

    window.requestAnimationFrame(() => {
      switch (step) {
        case TransitionStep.Entering:
          setStyle({ position: "fixed" });
          return;
        case TransitionStep.Entered:
          setStyle(undefined);
          return;
        case TransitionStep.Exiting:
          if (target) initializeRectangle(target);
          return;
        case TransitionStep.Exited:
          Utility.debug("Animation was ended");
          setStyle(undefined);
          setTarget(undefined);
          return;
      }
    });
  }, [step]);

  React.useEffect(() => {
    if (config.animation === Animation.Smart) return;

    setStyle(undefined);
  }, [config.animation]);

  React.useEffect(() => {
    if (config.preview.shouldMount) return;
    if (typeof document === "undefined") return;

    setStyle(undefined);
    setTarget(undefined);
  }, [config.preview.shouldMount]);

  return { target, style, execute, setTarget };
}

export default useAnimation;
