import { type EventProps, usePagesContext } from "@react-instastories/base";

import { useKeyboardMovement } from "../../../../hooks";

interface KeyboardEventProps extends EventProps {}

export function Pages({ children }: KeyboardEventProps) {
  const context = usePagesContext();
  useKeyboardMovement(context, { previous: "ArrowLeft", next: "ArrowRight" });

  return children as JSX.Element;
}

Pages.displayName = "Events.Keyboard.Pages";

export default Pages;
