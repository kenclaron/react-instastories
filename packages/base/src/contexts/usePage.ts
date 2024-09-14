import React from "react";

interface PageContextValue {
  /**
   * The ref associated with the page component.
   */
  readonly ref: React.RefObject<HTMLElement | null>;
  /**
   * The index of the page.
   */
  readonly index: number;
}

/* Creating a context object that is used to pass data down to the child components. */
export const PageContext = React.createContext<PageContextValue>({
  ref: React.createRef(),
  index: -1
});

PageContext.displayName = "PageContext";

/**
 * Hook to access the current page context.
 *
 * @example
 * ```tsx
 * const page = usePage();
 * ```
 */
export function usePage() {
  return React.useContext(PageContext);
}
