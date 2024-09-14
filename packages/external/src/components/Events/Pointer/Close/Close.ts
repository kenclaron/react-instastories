import { type EventProps, useViewerContext } from "@react-instastories/base";

import React from "react";

import { EventListeners } from "../../../../utilities";

interface ClosePointerEventProps extends EventProps {}

interface IPosition {
  x: number;
  y: number;
}

const TRANSITION_PROPERTY_NAME = "transform";
const LIMIT_HEIGHT = 128;
const LIMIT_WIDTH = 128;

function curveTop(y: number) {
  if (y > -96) return y;
  else if (y < -LIMIT_HEIGHT) return -LIMIT_HEIGHT * 0.875;

  const limit = -LIMIT_HEIGHT * 0.75;
  const part = -LIMIT_HEIGHT * 0.25;
  const t = (y - limit) / part;
  return limit + (part / 2) * (1 - Math.pow(1 - t, 2));
}

function curveBottom(y: number) {
  const limit = window.innerHeight / 2;

  if (y < limit) return y;
  else if (y > limit + LIMIT_HEIGHT) return limit + LIMIT_HEIGHT * 0.5;

  const part = LIMIT_HEIGHT;
  const t = (y - limit) / part;
  return limit + (part / 2) * (1 - Math.pow(1 - t, 2));
}

/**
 * Close event for handling pointer events within the viewer.
 * This event manages the user interactions for closing the viewer by detecting swipe
 * movements and handling transitions.
 *
 * @external This event uses external context from `@react-instastories/base`.
 *
 * @param props - The properties for the component.
 * @returns A React element that wraps the children with close handling functionality.
 */
export function Close({ element, children }: ClosePointerEventProps) {
  const viewer = useViewerContext();

  const [enabled, setEnabled] = React.useState(true);
  const [captured, setCaptured] = React.useState(false);
  const [pointerId, setPointerId] = React.useState<number>();

  const [position, setPosition] = React.useState<IPosition>();

  const [computedTransform, setComputedTransform] = React.useState<string>();
  const [computedTransition, setComputedTransition] = React.useState<string>();
  const [styledTransform, setStyledTransform] = React.useState<string>();
  const [styledTransition, setStyledTransition] = React.useState<string>();

  const uncapture = React.useCallback(() => {
    if (element) {
      element.style.transform = styledTransform ?? "";
      element.style.transition = styledTransition ?? "";
    }

    setStyledTransform(undefined);
    setStyledTransition(undefined);
    setComputedTransform(undefined);
    setComputedTransition(undefined);
    setPosition(undefined);
    setCaptured(false);
  }, [element, styledTransform, styledTransition]);

  const onBlur = React.useCallback(() => uncapture(), [uncapture]);

  const onPointerDown = React.useCallback(
    (event: PointerEvent) => {
      if (!enabled || event.type === "click" || pointerId) return;

      setPointerId(event.pointerId);
      setPosition({ x: event.x, y: event.y });
      setCaptured(true);

      if (!element) return;

      setStyledTransform(element.style.transform);
      setStyledTransition(element.style.transition);

      setComputedTransform(getComputedStyle(element).transform);
      setComputedTransition(getComputedStyle(element).transition);
    },
    [pointerId, element, enabled]
  );

  const onPointerUp = React.useCallback(
    (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;

      uncapture();
      setPointerId(undefined);

      if (!position) return;

      const difference: IPosition = {
        x: event.x - position.x,
        y: event.y - position.y
      };

      if (difference.y > window.innerHeight / 4) viewer.close();
    },
    [uncapture, pointerId, position, viewer.close]
  );

  const onPointerMove = React.useCallback(
    (event: PointerEvent) => {
      if (!element || !position || !captured || event.pointerId !== pointerId) {
        return;
      }

      const difference: IPosition = {
        x: event.x - position.x,
        y: event.y - position.y
      };

      if (difference.x > LIMIT_WIDTH || difference.x < -LIMIT_WIDTH) {
        uncapture();
        return;
      }

      if (difference.y < 0) difference.y = curveTop(difference.y);
      else difference.y = curveBottom(difference.y);

      const myTransform = `translateY(${difference.y}px)`;
      const myTransition = `transform 0ms linear`;

      element.style.transition = [
        styledTransition,
        computedTransition,
        myTransition
      ]
        .filter(Boolean)
        .join(", ");
      element.style.transform = [
        styledTransform,
        computedTransform,
        myTransform
      ]
        .filter(Boolean)
        .join(" ");
    },
    [
      uncapture,
      element,
      pointerId,
      position,
      captured,
      styledTransform,
      styledTransition,
      computedTransform,
      computedTransition
    ]
  );

  const onTransitionStart = React.useCallback((event: TransitionEvent) => {
    if (event.propertyName !== TRANSITION_PROPERTY_NAME) return;

    setEnabled(false);
  }, []);

  const onTransitionEnd = React.useCallback((event: TransitionEvent) => {
    if (event.propertyName !== TRANSITION_PROPERTY_NAME) return;

    setEnabled(true);
  }, []);

  const escape = React.useCallback(() => {
    if (captured) uncapture();
  }, [uncapture, captured]);

  const onKeydown = React.useCallback(
    (event: KeyboardEvent) => EventListeners.execute(event, ["Escape"], escape),
    [escape]
  );

  React.useEffect(() => {
    if (element) setEnabled(true);
    else setEnabled(false);
  }, [element]);

  React.useEffect(() => {
    if (!enabled) setCaptured(false);
  }, [enabled]);

  React.useEffect(() => {
    if (!viewer.shown && captured) uncapture();
  }, [viewer.shown, captured, uncapture]);

  React.useEffect(() => {
    if (!element || viewer.transition.step !== "entered") return;

    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("transitionstart", onTransitionStart);
    element.addEventListener("transitionend", onTransitionEnd);

    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("transitionstart", onTransitionStart);
      element.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [
    viewer.transition.step,
    element,
    onPointerDown,
    onTransitionStart,
    onTransitionEnd
  ]);

  React.useEffect(() => {
    if (viewer.transition.step !== "entered") return;

    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onBlur);
    };
  }, [viewer.transition.step, onBlur, onKeydown, onPointerUp, onPointerMove]);

  React.useEffect(() => {
    if (viewer.transition.step !== "entered") return;

    window.addEventListener("keydown", onKeydown, { capture: true });

    return () => {
      window.removeEventListener("keydown", onKeydown, { capture: true });
    };
  }, [viewer.transition.step, onKeydown]);

  return children;
}

Close.displayName = "Events.Pointer.Close";

export default Close;
