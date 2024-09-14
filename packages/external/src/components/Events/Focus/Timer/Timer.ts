import { useTimerContext, useViewerContext } from "@react-instastories/base";
import { type EventProps } from "@react-instastories/base";

import React from "react";

interface TimerEventProps extends EventProps {}

/**
 * Represents a component that manages the timer based on the viewer's visibility state.
 *
 * @external This event uses external context from `@react-instastories/base`.
 *
 * @param props - The properties to configure the `Timer` event.
 *
 * @returns The event provide children.
 */
export function Timer({ children }: TimerEventProps) {
  const viewer = useViewerContext();
  const timer = useTimerContext();

  React.useEffect(() => {
    if (viewer.shown) {
      window.addEventListener("blur", timer.pause);
      window.addEventListener("focus", timer.start);
    } else {
      window.removeEventListener("blur", timer.pause);
      window.removeEventListener("focus", timer.start);
    }

    return () => {
      window.removeEventListener("blur", timer.pause);
      window.removeEventListener("focus", timer.start);
    };
  }, [viewer.shown, timer.pause, timer.start]);

  return children;
}

Timer.displayName = "Events.Focus.Timer";

export default Timer;
