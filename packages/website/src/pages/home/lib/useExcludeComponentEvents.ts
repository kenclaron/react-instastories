import React from "react";

import { preventEvent } from "../../../shared";

export function useExcludeComponentEvents(
  shouldExclude: boolean,
  element: HTMLElement | null,
  tags: string[] = ["BUTTON", "A", "INPUT", "TEXTAREA"]
) {
  const [component, setComponent] = React.useState(element);

  const event = React.useCallback(
    (event: Event) => {
      if (!(event.target instanceof HTMLElement)) return;
      if (!tags.includes(event.target.tagName)) return;

      return preventEvent(event);
    },
    [tags]
  );

  const execute = React.useCallback(() => {
    if (!component) return;

    component.addEventListener("pointerdown", event, { capture: true });
    component.addEventListener("pointerup", event, { capture: true });
  }, [component, event]);

  const revert = React.useCallback(() => {
    if (!component) return;

    component.removeEventListener("pointerdown", event);
    component.removeEventListener("pointerup", event);
  }, [component, event]);

  React.useEffect(() => {
    if (shouldExclude) execute();
    else revert();

    return () => revert();
  }, [shouldExclude, execute, revert]);

  React.useEffect(() => {
    if (!shouldExclude) return;

    setComponent(element);
  }, [shouldExclude, element]);
}

export default useExcludeComponentEvents;
