import React from "react";

export function preventEvent(
  event: Pick<React.SyntheticEvent, "preventDefault" | "stopPropagation">
) {
  event.preventDefault();
  event.stopPropagation();

  return event;
}

export default preventEvent;
