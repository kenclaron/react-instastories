import React from "react";

import { type EventProps } from "../models";

/**
 * Composes a series of event components around a target component.
 *
 * @param {React.RefObject} ref - A reference to the target element.
 * @param {React.FunctionComponent[]} events - An array of event components to be composed.
 * @returns {React.FunctionComponent} A composed function component that wraps the children with the event components.
 */
function compose(
  ref: React.RefObject<EventProps["element"]> | null,
  events: React.FunctionComponent[]
): React.FunctionComponent<React.PropsWithChildren> {
  /**
   * A neutral event component that simply renders its children.
   *
   * @param {React.PropsWithChildren} props - The children to be rendered.
   * @returns {React.ReactElement} The children elements.
   */
  function NeutralEvent({ children }: React.PropsWithChildren) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return events.reduce(
    (
      AccumulatorEvent: React.FunctionComponent<React.PropsWithChildren>,
      Event: React.FunctionComponent<EventProps>
    ) => {
      /**
       * A wrapped event component that renders the event component with the accumulated event components.
       *
       * @param {React.PropsWithChildren} props - The children to be rendered.
       * @returns {React.ReactElement} The wrapped event components.
       */
      function WrappedEvent({ children }: React.PropsWithChildren) {
        return (
          <Event element={ref?.current}>
            <AccumulatorEvent>{children}</AccumulatorEvent>
          </Event>
        );
      }

      return WrappedEvent;
    },
    NeutralEvent
  );
}

/**
 * A hook that memoizes a composed provider function for the provided events and reference.
 *
 * @param {React.RefObject} ref - A reference to the target element.
 * @param {React.FunctionComponent[]} [events=[]] - An optional array of event components to be composed.
 * @returns {React.FunctionComponent} The memoized composed provider function.
 */
export function useComposedProvider(
  ref: React.RefObject<EventProps["element"]> | null,
  events: React.FunctionComponent[] = [],
  empty: boolean = false
) {
  return React.useMemo(
    () => (empty ? React.Fragment : compose(ref, events)),
    [empty, ref]
  );
}

export default useComposedProvider;
