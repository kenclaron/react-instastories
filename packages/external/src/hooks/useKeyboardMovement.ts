import {
  usePagesContext,
  useStoriesContext,
  useViewerContext
} from "@react-instastories/base";

import React from "react";

import { EventListeners, useThrottle } from "../utilities";

interface KeyboardMovementContext
  extends Pick<
    ReturnType<typeof useStoriesContext | typeof usePagesContext>,
    "next" | "previous"
  > {}

interface KeyboardMovementKeys {
  readonly next: KeyboardEvent["key"];
  readonly previous: KeyboardEvent["key"];
}

/**
 * React Hook for handling keyboard events for story or page navigation.
 *
 * @external This event uses external context from `@react-instastories/base`.
 *
 * @param context - Context with next and previous functionality.
 *
 * @returns The side-effect sets keydown events on window.
 */
export function useKeyboardMovement(
  context: KeyboardMovementContext,
  keys: KeyboardMovementKeys = { next: "ArrowRight", previous: "ArrowLeft" }
) {
  const viewer = useViewerContext();

  /**
   * Handles the keydown event and triggers appropriate navigation actions.
   *
   * @param event - The keyboard event object.
   */
  const keydown = React.useCallback(
    (event: KeyboardEvent) => {
      EventListeners.execute(event, [keys.next], context.next);
      EventListeners.execute(event, [keys.previous], context.previous);
    },
    [keys.next, keys.previous, context.next, context.previous]
  );

  const onKeydown = useThrottle(keydown, 250);

  React.useEffect(() => {
    if (viewer.shown) window.addEventListener("keydown", onKeydown);
    else window.removeEventListener("keydown", onKeydown);

    return () => window.removeEventListener("keydown", onKeydown);
  }, [viewer.shown, onKeydown]);
}

export default useKeyboardMovement;
