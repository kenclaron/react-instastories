import React from "react";

import { Utility } from "../utilities";

import { useViewerContext } from "./useViewer";

/**
 * Interface for the events that can be associated with the `Preview` component.
 */
export interface PreviewEvents {
  /**
   * Function to be called when the `Preview` is clicked.
   *
   * @returns {void} If the function returns a `truthy` value, then the function
   * will prevent the Viewer component from opening
   */
  onClick?(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
  /**
   * Function to be called when the `Preview` is shown.
   */
  onShow?(): void;
  /**
   * Function to be called when the `Preview` is hidden.
   */
  onHide?(): void;
}

/**
 * Interface for the context value of the `Preview` component.
 */
interface PreviewContextValue {
  /**
   * The HTML element associated with the preview.
   */
  readonly element: HTMLElement | null;
  /**
   * The state for the visibility of the `Preview` component.
   */
  readonly shown: boolean;
  /**
   * Function to hide the `Preview` component.
   *
   * @param {EventTarget & HTMLElement} target - The target element triggering the hide action.
   */
  hide(target?: EventTarget & HTMLElement): void;
  /**
   * Function to show the `Preview` component.
   */
  show(): void;
}

/**
 * React Hook for managing a `Preview` component.
 *
 * @param {PreviewEvents} events - The events associated with the `Preview` component.
 * @returns {PreviewContextValue} The `Preview` context object.
 */
export function usePreview(
  events: PreviewEvents,
  element: HTMLElement | null
): PreviewContextValue {
  const viewer = useViewerContext();

  const [shown, setShown] = React.useState(true);

  const hide = React.useCallback(() => {
    if (!shown) return;
    if (events.onHide?.()) return;

    Utility.debug("Preview was hide");

    setShown(false);
  }, [shown, events.onHide]);

  const show = React.useCallback(() => {
    if (shown) return;
    if (events.onShow?.()) return;

    Utility.debug("Preview was showed");

    setShown(true);
  }, [shown, events.onShow]);

  React.useEffect(() => {
    if (!viewer.mounted) show();
  }, [viewer.mounted]);

  return React.useMemo<PreviewContextValue>(
    () => ({ element, shown, hide, show }),
    [element, shown, hide, show]
  );
}

/* Creating a context object that is used to pass data down to the child components. */
export const PreviewContext = React.createContext<PreviewContextValue>({
  element: null,
  shown: true,
  hide: () => {},
  show: () => {}
});

PreviewContext.displayName = "PreviewContext";

/**
 * Hook to access the preview context.
 *
 * @example
 * ```tsx
 * const preview = usePreviewContext();
 * ```
 */
export function usePreviewContext() {
  return React.useContext(PreviewContext);
}

export default usePreview;
