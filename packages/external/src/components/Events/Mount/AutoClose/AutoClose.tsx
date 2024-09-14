import {
  type EventProps,
  usePagesContext,
  useStoriesContext,
  useTimerContext,
  useViewerContext
} from "@react-instastories/base";

import React from "react";

interface AutoCloseEventProps extends EventProps {}

/**
 * AutoClose event that manages the state of interactive elements within the document.
 *
 * @external This event uses external context from `@react-instastories/base`.
 *
 * @param {InteractiveEventProps} props
 * @returns {React.ReactNode} The children elements wrapped by the Interactive event.
 */
export function AutoClose({ children }: AutoCloseEventProps) {
  const viewer = useViewerContext();
  const stories = useStoriesContext();
  const pages = usePagesContext();
  const timer = useTimerContext();

  React.useEffect(() => {
    if (pages.canNext) return;
    if (stories.canNext) return;
    if (!timer.expired) return;

    viewer.close();
  }, [stories.canNext, pages.canNext, timer.expired, viewer.close]);

  return children;
}

AutoClose.displayName = "Events.Mount.AutoClose";

export default AutoClose;
