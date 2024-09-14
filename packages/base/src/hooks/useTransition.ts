import React from "react";

import { Animation, TransitionStep } from "../models";

import { Configuration } from "./useInstaStories";

/**
 * React Hook for managing transitions.
 *
 * @param {boolean} shown - Whether the transition should start or not.
 * @returns The transition object.
 */
export function useTransition(shown: boolean, config: Configuration) {
  const storyRef = React.useRef<HTMLDivElement | null>(null);
  const viewerRef = React.useRef<HTMLDialogElement | null>(null);
  const [step, setStep] = React.useState<TransitionStep | null>(null);

  function cancel() {
    setStep(null);
  }

  function handleTransitionEnd(event?: TransitionEvent | AnimationEvent) {
    if (
      !event ||
      (event.target !== storyRef.current && event.target !== viewerRef.current)
    )
      return false;
    if (event instanceof TransitionEvent && event.propertyName !== "opacity")
      return false;

    return true;
  }

  React.useEffect(() => {
    if (!storyRef.current) return;
    if (!viewerRef.current) return;

    if (config.animation === Animation.Immediately) {
      if (shown) return setStep(TransitionStep.Entered);
      else return setStep(TransitionStep.Exited);
    }

    if (shown) {
      if (step !== TransitionStep.Entered) {
        window.requestAnimationFrame(() => setStep(TransitionStep.Entering));
      }

      const show = (event?: TransitionEvent | AnimationEvent) => {
        if (handleTransitionEnd(event)) setStep(TransitionStep.Entered);
      };

      storyRef.current.addEventListener("transitionend", show);
      storyRef.current.addEventListener("animationend", show);
      viewerRef.current.addEventListener("transitionend", show);
      viewerRef.current.addEventListener("animationend", show);

      return () => {
        show();
        storyRef.current?.removeEventListener("transitionend", show);
        storyRef.current?.removeEventListener("animationend", show);
        viewerRef.current?.removeEventListener("transitionend", show);
        viewerRef.current?.removeEventListener("animationend", show);
      };
    } else {
      if (step !== TransitionStep.Exited) {
        window.requestAnimationFrame(() => setStep(TransitionStep.Exiting));
      }

      const hide = (event?: TransitionEvent | AnimationEvent) => {
        if (handleTransitionEnd(event)) setStep(TransitionStep.Exited);
      };

      storyRef.current.addEventListener("transitionend", hide);
      storyRef.current.addEventListener("animationend", hide);
      viewerRef.current.addEventListener("transitionend", hide);
      viewerRef.current.addEventListener("animationend", hide);

      return () => {
        hide();
        storyRef.current?.removeEventListener("transitionend", hide);
        storyRef.current?.removeEventListener("animationend", hide);
        viewerRef.current?.removeEventListener("transitionend", hide);
        viewerRef.current?.removeEventListener("animationend", hide);
      };
    }
  }, [storyRef, viewerRef, config.animation, shown]);

  return {
    /** The reference to the transitioning component of story. */
    storyRef,
    /** The reference to the transitioning component of viewer. */
    viewerRef,
    /** The current transition step (by default: `null`). */
    step,
    /** Function to cancel the transition (clear step value and set as `null`). */
    cancel
  };
}

export default useTransition;
