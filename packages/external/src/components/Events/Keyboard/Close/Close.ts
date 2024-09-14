import { type EventProps, useViewerContext } from "@react-instastories/base";

import React from "react";

import { EventListeners } from "../../../../utilities";

interface KeyboardEventProps extends EventProps {}

/**
 * Represents a event that handles keyboard events for closing a viewer.
 *
 * @external This event uses external context from `@react-instastories/base`.
 *
 * @param props - The properties to configure the `Close` event.
 *
 * @returns The event provide children.
 */
export function Close({ children }: KeyboardEventProps) {
  const viewer = useViewerContext();

  /**
   * Handles the keydown event and triggers the viewer close action if the escape key is pressed.
   *
   * @param event - The keyboard event object.
   */
  const onKeydown = React.useCallback(
    (event: KeyboardEvent) =>
      EventListeners.execute(event, ["Escape"], viewer.close),
    [viewer.close]
  );

  React.useEffect(() => {
    if (viewer.shown) window.addEventListener("keydown", onKeydown);
    else window.removeEventListener("keydown", onKeydown);

    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [viewer.shown, onKeydown]);

  return children;
}

Close.displayName = "Events.Keyboard.Close";

export default Close;
