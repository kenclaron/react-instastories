import { type EventProps, useStoriesContext } from "@react-instastories/base";

import { useKeyboardMovement } from "../../../../hooks";

interface KeyboardEventProps extends EventProps {}

export function Stories({ children }: KeyboardEventProps) {
  const context = useStoriesContext();
  useKeyboardMovement(context, { previous: "ArrowDown", next: "ArrowUp" });

  return children;
}

Stories.displayName = "Events.Keyboard.Stories";

export default Stories;
