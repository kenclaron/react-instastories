import {
  type EventProps,
  useStoriesContext,
  useViewerContext
} from "@react-instastories/base";

import React from "react";

interface MovementPointerEventProps extends EventProps {}

interface IPosition {
  x: number;
  y: number;
}

const TRANSITION_PROPERTY_NAME = "transform";
const LIMIT_CAN_CHANGE = 128;
const LIMIT_CAN_NOT_CHANGE = 32;
const MAX_OPACITY = 0.25;

function curve(x: number, canChange: boolean) {
  const limitation = canChange ? LIMIT_CAN_CHANGE : LIMIT_CAN_NOT_CHANGE;

  if (x < limitation * 0.75) return x;
  else if (x > limitation) return limitation * 0.875;

  const limit = limitation * 0.75;
  const part = limitation * 0.25;
  const t = (x - limit) / part;
  return limit + (part / 2) * (1 - Math.pow(1 - t, 2));
}

/**
 * Movement event for handling pointer events within the viewer.
 * This event manages the user interactions for swiping stories, handling
 * transitions, and updating the UI based on user movements.
 *
 * @external This event uses external context from `@react-instastories/base`.
 *
 * @param props - The properties to configure the `Movement` event.
 * @returns The event provide children.
 */
export function Stories({ element, children }: MovementPointerEventProps) {
  const viewer = useViewerContext();
  const stories = useStoriesContext();

  const [enabled, setEnabled] = React.useState(true);
  const [captured, setCaptured] = React.useState(false);
  const [moved, setMoved] = React.useState(false);
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

      const nextSibling = element.nextElementSibling;
      const previousSibling = element.previousElementSibling;

      if (nextSibling instanceof HTMLElement) nextSibling.style.opacity = "";
      if (previousSibling instanceof HTMLElement)
        previousSibling.style.opacity = "";
    }

    setStyledTransform(undefined);
    setStyledTransition(undefined);
    setComputedTransform(undefined);
    setComputedTransition(undefined);
    setPosition(undefined);
    setCaptured(false);
    setMoved(false);
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
    [uncapture, pointerId, element, enabled]
  );

  const onPointerUp = React.useCallback(
    (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;

      uncapture();
      setPointerId(undefined);

      if (!position || !captured) return;

      const difference: IPosition = {
        x: event.x - position.x,
        y: event.y - position.y
      };

      if (stories.canPrevious && difference.x > LIMIT_CAN_CHANGE * 0.75)
        stories.previous();
      else if (stories.canNext && difference.x < LIMIT_CAN_CHANGE * -0.75)
        stories.next();
    },
    [
      uncapture,
      captured,
      pointerId,
      stories.canPrevious,
      stories.canNext,
      stories.previous,
      stories.next
    ]
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

      if (difference.y > LIMIT_CAN_CHANGE || difference.y < -LIMIT_CAN_CHANGE) {
        uncapture();
        return;
      }

      if (!moved) {
        setMoved(true);

        if (Math.abs(difference.x) < Math.abs(difference.y)) {
          setCaptured(false);
          return;
        }
      }

      if (difference.x < 0) {
        if (stories.canNext) {
          const sibling = element.nextElementSibling;

          if (sibling instanceof HTMLElement) {
            sibling.style.opacity = String(
              Math.min(difference.x / -LIMIT_CAN_CHANGE, MAX_OPACITY)
            );
          }
        }

        difference.x = curve(Math.abs(difference.x), stories.canNext) * -1;
      } else {
        difference.x = curve(difference.x, stories.canPrevious);

        if (stories.canPrevious) {
          const sibling = element.previousElementSibling;

          if (sibling instanceof HTMLElement) {
            sibling.style.opacity = String(
              Math.min(difference.x / LIMIT_CAN_CHANGE, MAX_OPACITY)
            );
          }
        }
      }

      const elementTransform = `translateX(${difference.x}px)`;
      const elementTransition = `transform 0ms linear`;

      element.style.transition = [
        styledTransition,
        computedTransition,
        elementTransition
      ]
        .filter(Boolean)
        .join(", ");
      element.style.transform = [
        styledTransform,
        computedTransform,
        elementTransform
      ]
        .filter(Boolean)
        .join(" ");
    },
    [
      element,
      stories.canNext,
      stories.canPrevious,
      pointerId,
      position,
      moved,
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
  }, [viewer.transition.step, onBlur, onPointerMove, onPointerUp]);

  return children;
}

Stories.displayName = "Events.Pointer.Stories";

export default Stories;
