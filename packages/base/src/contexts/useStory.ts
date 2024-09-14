import React from "react";

interface StoryContextValue {
  /**
   * The ref associated with the story component.
   */
  readonly ref: React.RefObject<HTMLElement | null>;
  /**
   * The index of the story.
   */
  readonly index: number;
}

/* Creating a context object that is used to pass data down to the child components. */
export const StoryContext = React.createContext<StoryContextValue>({
  ref: React.createRef(),
  index: -1
});

StoryContext.displayName = "StoryContext";

/**
 * Hook to access the current story context.
 *
 * @example
 * ```tsx
 * const story = useStory();
 * ```
 */
export function useStory() {
  return React.useContext(StoryContext);
}
