import { useTimerContext } from "@react-instastories/base";
import { type EventProps } from "@react-instastories/base";

import React from "react";

interface TimerEventProps extends EventProps {}

/**
 * Represents a timer component that interacts with the timer context.
 * This component listens for pointer events and interacts with the timer
 * context to pause or start the timer based on user interaction.
 *
 * @external This event uses external context from `@react-instastories/base`.
 *
 * @param props - The properties to configure the `Timer` event.
 *
 * @returns The event provide children.
 */
export function Timer({ element, children }: TimerEventProps) {
  const timer = useTimerContext();
  const [captured, setCaptured] = React.useState(false);

  /**
   * Pauses the timer when a pointer down event occurs.
   */
  const onPointerDown = React.useCallback(() => {
    setCaptured(true);
    timer.pause();
  }, [timer.pause]);

  /**
   * Resumes the timer when a pointer up event occurs.
   */
  const onPointerUp = React.useCallback(() => {
    setCaptured(false);
    timer.start();
  }, [timer.start]);

  /**
   * Resumes the timer when a pointer leave event occurs and the document
   * has focus.
   */
  const onPointerLeave = React.useCallback(() => {
    setCaptured(false);

    if (!document.hasFocus() || !captured) return;

    timer.start();
  }, [captured, timer.start]);

  /**
   * Restore the timer pause state if the timer trying to activate while
   * the user is still holding the cursor.
   */
  React.useEffect(() => {
    if (timer.active && captured) timer.pause();
  }, [timer.active]);

  React.useEffect(() => {
    if (!element) return;

    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointerup", onPointerUp);
    element.addEventListener("pointerleave", onPointerLeave);

    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointerup", onPointerUp);
      element.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [element, onPointerDown, onPointerUp, onPointerLeave]);

  return children;
}

Timer.displayName = "Events.Pointer.Timer";

export default Timer;
