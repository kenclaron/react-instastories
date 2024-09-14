import { type EventProps } from "@react-instastories/base";

import React from "react";

import { useInteractive } from "../../../../hooks";

interface InteractiveEventProps extends EventProps {}

/**
 * Interactive event that manages the state of interactive elements within the document.
 *
 * @external This event uses external context from `@react-instastories/base`.
 *
 * @param {InteractiveEventProps} props
 * @returns {React.ReactNode} The children elements wrapped by the Interactive event.
 */
export function Interactive({ element, children }: InteractiveEventProps) {
  const interactive = useInteractive();

  React.useEffect(() => {
    if (!element) return;

    const items = interactive.disable(element);

    return () => interactive.enable(items);
  }, [element]);

  return children;
}

Interactive.displayName = "Events.Mount.Interactive";

export default Interactive;
