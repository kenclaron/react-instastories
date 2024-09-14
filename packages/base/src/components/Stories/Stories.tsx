import React from "react";

import {
  PagesContext,
  type PaginationEvents,
  StoriesContext,
  TimerContext,
  useOrder,
  usePages,
  useProps,
  useStories,
  useTimer,
  useViewerContext
} from "../../hooks";

import { ViewerPortal } from "../../portals";

import { useConfig } from "../../contexts";
import Pages from "../Pages";
import { StoryProps } from "../Story";

import styles from "./Stories.module.scss";

interface StoriesProps
  extends PaginationEvents,
    Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /**
   * Specifies the component type to render.
   *
   * @default "div"
   */
  readonly as?: React.ElementType;
}

/**
 * Stories component that manages and renders a list of stories.
 *
 * @remarks
 * The component uses multiple hooks to access context values related
 * to the viewer, timer, stories, and pages. It conditionally renders
 * components based on these context values and manages story transitions.
 * The component is forward-ref compatible, allowing it to be used with refs.
 *
 * @param props - The props for the Stories component.
 * @param ref - The ref for the list element.
 *
 * @returns A React component that renders a list of stories.
 */
export const Stories = React.forwardRef<HTMLElement, StoriesProps>(
  function Stories(
    {
      as: Tag = "div",
      children,
      className,
      onPaginate: onChange,
      onNext,
      onPrevious,
      ...props
    },
    ref
  ) {
    const events = { onChange, onNext, onPrevious };

    const config = useConfig();
    const viewer = useViewerContext();
    const timer = useTimer(config.duration);
    const stories = useStories(children, events);
    const pages = usePages(stories, timer);

    const items = useOrder(children);
    const propsPages = useProps(
      (items?.[config.viewer.story ?? 0] as React.ReactElement<StoriesProps>)
        .props.children,
      Pages
    );

    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      if (!config.viewer.shouldMount) return;
      if (config.preview.shouldMount) return;
      if (typeof config.viewer.story !== "number") return;

      viewer.open();
      stories.show(config.viewer.story);

      const story = items?.[
        config.viewer.story
      ] as React.ReactElement<StoryProps>;

      const { children, ...props } = propsPages;

      stories.configure((config) => ({
        ...config,
        duration: story.props.duration,
        preload: story.props.preload,
        start: story.props.start
      }));
      pages.setChildren(
        Array.isArray(children) ? children.flat().filter(Boolean) : children
      );
      pages.setProps(props);
      pages.setStory(config.viewer.story);

      pages.show(0);

      if (typeof document === "undefined") return;

      viewer.animation.execute(document.body);
    }, [config.viewer.shouldMount]);

    React.useEffect(() => {
      if (!config.viewer.shouldMount) return;
      if (config.preview.shouldMount) return;
      if (typeof config.viewer.story !== "number") return;

      stories.show(config.viewer.story);
    }, [config.viewer.story]);

    React.useEffect(() => {
      if (viewer.mounted) return;
      if (pages.current === -1) return;

      pages.setStory(-1);

      if (!config.timer.shouldUseDefault) return;

      timer.reset();
    }, [viewer.mounted]);

    React.useEffect(() => setMounted(true), []);

    return (
      <StoriesContext.Provider value={{ ...stories, mounted }}>
        <PagesContext.Provider value={{ ...pages, mounted }}>
          {config.preview.shouldMount && (
            <Tag
              aria-label="List of stories"
              role="toolbar"
              {...props}
              ref={ref}
              className={[styles["stories"], className]
                .filter(Boolean)
                .join(" ")}
              data-preset={config.preset}
              data-testid="is-stories"
            >
              {items}
            </Tag>
          )}

          {viewer.mounted && (
            <TimerContext.Provider value={timer}>
              <ViewerPortal />
            </TimerContext.Provider>
          )}
        </PagesContext.Provider>
      </StoriesContext.Provider>
    );
  }
);

Stories.displayName = "Stories";

export default Stories;
