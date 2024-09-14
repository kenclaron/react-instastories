import React from "react";

import { Utility } from "../utilities";

import { type PagesProps } from "../components";

import { useConfig } from "../contexts";

import { type Pagination, usePagination } from "./usePagination";
import { type StoriesContextValue } from "./useStories";
import { type Timer } from "./useTimer";

interface PagesContextValue extends Omit<Pagination, "change"> {
  /**
   * The current story index.
   */
  story: number;
  /**
   * Indicates that pages context was mounted
   */
  mounted: boolean;
  /**
   * The children elements of the pages.
   */
  children: React.ReactNode;
  /**
   * The props of the pages.
   */
  props: PagesProps;
  /**
   * Function to set the current story index.
   */
  setStory: React.Dispatch<React.SetStateAction<number>>;
  /**
   * Function to set the children elements.
   */
  setChildren: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  /**
   * Function to set the props for the pages.
   */
  setProps: React.Dispatch<React.SetStateAction<PagesProps>>;
  /**
   * Function to show the next page or story.
   */
  next(): void;
  /**
   * Function to show the previous page or story.
   */
  previous(): void;
  /**
   * Function to show a specific page by index.
   * @param index - The index of the page to show.
   */
  show(index: number): void;
}

/**
 * Hook to manage the pages state and behavior.
 *
 * @param stories - The context value for stories.
 * @param timer - The context value for timer.
 * @returns The pages context value.
 */
export const usePages = (stories: StoriesContextValue, timer: Timer) => {
  const config = useConfig();
  const [story, setStory] = React.useState(-1);
  const [blocked, setBlocked] = React.useState(config.viewer.shouldMount);
  const [children, setChildren] = React.useState<React.ReactNode>(null);
  const [props, setProps] = React.useState<PagesProps>({});

  const { canNext, canPrevious, current, length, change } =
    usePagination(children);

  /**
   * Function to show a specific page by index.
   * @param index - The index of the page to show.
   */
  const show = React.useCallback(
    (index: number) => {
      Utility.debug("Cause show page", index);

      if (index < length && index >= 0) {
        if (props.onPaginate?.(index)) return;

        change(index);

        if (!config.timer.shouldUseDefault) return;

        window.requestAnimationFrame(() => timer.reset());
      } else throw new Error(`Page with number ${index} is not exists.`);
    },
    [
      change,
      config.timer.shouldUseDefault,
      timer.reset,
      length,
      props.onPaginate
    ]
  );

  /**
   * Function to show the next page.
   */
  const next = React.useCallback(() => {
    Utility.debug("Cause next page", canNext);

    if (canNext) {
      if (props.onNext?.(current + 1)) return;
      show(current + 1);
    } else stories.next();
  }, [canNext, current, stories.next, show, props.onNext]);

  /**
   * Function to show the previous page.
   */
  const previous = React.useCallback(() => {
    Utility.debug("Cause previous page", canPrevious);

    if (canPrevious) {
      if (props.onPrevious?.(current - 1)) return;
      show(current - 1);
    } else stories.previous();
  }, [canPrevious, current, stories.previous, show, props.onPrevious]);

  React.useEffect(() => {
    if (blocked || stories.current !== story) return;

    if (stories.current >= 0) show(stories.config.start ?? 0);
    else {
      setChildren(null);
      change(-1);
    }
  }, [story]);

  React.useEffect(() => {
    if (!blocked || !children || !config.viewer.shouldMount) return;

    Utility.debug("Cause initialize start page", stories.config.start ?? 0);

    setBlocked(false);
    change(stories.config.start ?? 0);

    if (!config.timer.shouldUseDefault) return;

    timer.reset();
  }, [
    config.viewer.shouldMount,
    props,
    stories.config.start,
    timer.reset,
    change
  ]);

  return React.useMemo<PagesContextValue>(
    () => ({
      canNext,
      canPrevious,
      children,
      current,
      length,
      mounted: false,
      props,
      story,
      setStory,
      setChildren,
      setProps,
      next,
      previous,
      show
    }),
    [
      current,
      length,
      canNext,
      canPrevious,
      children,
      props,
      next,
      previous,
      show
    ]
  );
};

/* Creating a context object that is used to pass data down to the child components. */
export const PagesContext = React.createContext<PagesContextValue>({
  story: -1,
  current: -1,
  length: 1,
  mounted: false,
  canNext: false,
  canPrevious: false,
  children: null,
  props: {},
  setStory: () => {},
  setChildren: () => {},
  setProps: () => {},
  next: () => {},
  previous: () => {},
  show: () => {}
});

PagesContext.displayName = "PagesContext";

/**
 * Hook to access the pages context.
 *
 * @example
 * ```tsx
 * const pages = usePagesContext();
 * ```
 */
export function usePagesContext() {
  return React.useContext(PagesContext);
}

export default usePages;
