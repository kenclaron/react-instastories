import {
  type EventProps,
  usePagesContext,
  useStoriesContext,
  useViewerContext
} from "@react-instastories/base";

import React from "react";

interface ChangeStoryPointerEventProps extends EventProps {}

const enum Side {
  LEFT = 0,
  RIGHT = 1
}

const TIMEOUT = 250;

const EXCLUDED_TAGS = ["A", "BUTTON", "INPUT", "TEXTAREA"];

export function Pages({ element, children }: ChangeStoryPointerEventProps) {
  const viewer = useViewerContext();
  const stories = useStoriesContext();
  const pages = usePagesContext();

  const [captured, setCaptured] = React.useState(false);
  const [moved, setMoved] = React.useState(false);
  const [timeover, setTimeover] = React.useState(false);

  const timeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const uncapture = React.useCallback(() => {
    if (timeout.current) clearTimeout(timeout.current);

    setCaptured(false);
    setMoved(false);
    setTimeover(false);
  }, [timeout.current]);

  const onPointerDown = React.useCallback(() => {
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => setTimeover(true), TIMEOUT);
  }, [timeout.current]);

  const onPointerMove = React.useCallback(() => {
    if (!captured) return;

    setMoved(true);
  }, [captured]);

  const onClick = React.useCallback(
    (event: MouseEvent) => {
      uncapture();

      if (moved) return;
      if (timeover) return;
      if (!element) return;
      if (!(event.target instanceof HTMLElement)) return;
      if (EXCLUDED_TAGS.includes(event.target.tagName)) return;

      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const side = x < rect.width / 2 ? Side.LEFT : Side.RIGHT;

      switch (side) {
        case Side.LEFT:
          return stories.canPrevious || pages.canPrevious
            ? pages.previous()
            : viewer.close();
        case Side.RIGHT:
          return stories.canNext || pages.canNext
            ? pages.next()
            : viewer.close();
      }
    },
    [
      captured,
      element,
      moved,
      timeover,
      pages.canNext,
      pages.canPrevious,
      stories.canNext,
      stories.canPrevious
    ]
  );

  React.useEffect(() => {
    if (!element) return;

    if (timeover) element.style.cursor = "";
    else element.style.cursor = "pointer";

    element.addEventListener("click", onClick);
    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointerleave", uncapture);
    element.addEventListener("pointermove", onPointerMove);

    return () => {
      element.style.cursor = "";

      element.removeEventListener("click", onClick);
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointerleave", uncapture);
      element.removeEventListener("pointermove", onPointerMove);
    };
  }, [element, timeover, onClick, onPointerDown, onPointerMove, uncapture]);

  return children;
}

export default Pages;
