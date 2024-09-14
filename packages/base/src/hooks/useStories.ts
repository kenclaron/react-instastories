import React from "react";

import { Utility } from "../utilities";

import { type StoryConfiguration } from "../components/Story";

import {
  type Pagination,
  type PaginationEvents,
  usePagination
} from "./usePagination";
import { useViewerContext } from "./useViewer";

interface StoryPropertiesValue {
  /**
   * Configuration for the story.
   */
  readonly config: StoryConfiguration;
  /**
   * Function to update the story configuration.
   */
  configure: React.Dispatch<React.SetStateAction<StoryConfiguration>>;
}

export interface StoriesContextValue
  extends StoryPropertiesValue,
    Omit<Pagination, "change"> {
  /**
   * The children elements of the stories (ex. Pages).
   */
  children: React.ReactNode;
  /**
   * Indicates that stories context was mounted
   */
  mounted: boolean;
  /**
   * Function to set the children elements.
   */
  setChildren: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  /**
   * Function to show a specific story by index.
   * @param index - The index of the story to show.
   */
  show(index: number): void;
  /**
   * Function to show the next story.
   */
  next(): void;
  /**
   * Function to show the previous story.
   */
  previous(): void;
}

/**
 * Hook to manage the stories state and behavior.
 *
 * @param components - The story components to be managed.
 * @param events - The pagination events.
 * @returns The stories context value.
 */
export function useStories(
  components: React.ReactNode,
  events: PaginationEvents
): StoriesContextValue {
  const viewer = useViewerContext();

  const [children, setChildren] = React.useState(
    Array.isArray(components) ? components.flat().filter(Boolean) : components
  );

  const { canNext, canPrevious, current, length, change } =
    usePagination(children);

  const [config, configure] = React.useState<StoryConfiguration>({});

  /**
   * Function to show a specific story by index.
   * @param index - The index of the story to show.
   */
  const show = React.useCallback(
    (index: number) => {
      Utility.debug("Cause show story", index);

      if (index < length && index >= 0) {
        if (events.onPaginate?.(index)) return;
        change(index);
      } else throw new Error(`Story with number ${index} is not exists.`);
    },
    [change, length]
  );

  /**
   * Function to show the next story.
   */
  const next = React.useCallback(() => {
    Utility.debug("Cause next story", canNext);

    if (canNext) {
      if (events.onNext?.(current + 1)) return;
      show(current + 1);
    }
  }, [canNext, current, show]);

  /**
   * Function to show the previous story.
   */
  const previous = React.useCallback(() => {
    Utility.debug("Cause previous story", canPrevious);

    if (canPrevious) {
      if (events.onPrevious?.(current - 1)) return;
      show(current - 1);
    }
  }, [canPrevious, current, show]);

  React.useEffect(() => {
    if (!viewer.mounted) {
      change(-1);
      configure({});
    }
  }, [viewer.mounted]);

  React.useEffect(() => {
    setChildren(
      Array.isArray(components) ? components.flat().filter(Boolean) : components
    );
  }, [components]);

  return React.useMemo<StoriesContextValue>(
    () => ({
      canNext,
      canPrevious,
      children,
      config,
      current,
      length,
      mounted: false,
      setChildren,
      show,
      next,
      previous,
      configure
    }),
    [
      canNext,
      canPrevious,
      children,
      config,
      current,
      length,
      setChildren,
      show,
      next,
      previous,
      configure
    ]
  );
}

/* Creating a context object that is used to pass data down to the child components. */
export const StoriesContext = React.createContext<StoriesContextValue>({
  current: -1,
  length: 1,
  mounted: false,
  canNext: false,
  canPrevious: false,
  config: {},
  children: null,
  setChildren: () => {},
  show: () => {},
  next: () => {},
  previous: () => {},
  configure: () => {}
});

StoriesContext.displayName = "StoriesContext";

/**
 * Hook to access the stories context.
 *
 * @example
 * ```tsx
 * const stories = useStoriesContext();
 * ```
 */
export function useStoriesContext() {
  return React.useContext(StoriesContext);
}

export default useStories;
