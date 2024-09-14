import React from "react";

import {
  type PaginationEvents,
  useOrder,
  usePagesContext,
  useStoriesContext,
  useTimerContext,
  useViewerContext
} from "../../hooks";

import { useConfig, useStory } from "../../contexts";

import styles from "./Pages.module.scss";

export interface PagesProps
  extends PaginationEvents,
    React.PropsWithChildren,
    React.HTMLAttributes<HTMLElement> {
  /**
   * Specifies the component type to render.
   *
   * @default "div"
   */
  readonly as?: React.ElementType;
}

/**
 * Pages component that manages and renders a series of pages in a story.
 *
 * @remarks
 * The component uses multiple hooks to access context values related
 * to the viewer, pages, timer, and stories. It also utilizes a hook
 * to order and render its children elements. The component listens to the timer
 * expiration and triggers pagination accordingly.
 *
 * @param props - The props for the Pages component.
 *
 * @returns A React component that renders the pages of a story.
 */
export function Pages({ as = "div" }: PagesProps) {
  const config = useConfig();
  const viewer = useViewerContext();
  const pages = usePagesContext();
  const timer = useTimerContext();
  const stories = useStoriesContext();
  const story = useStory();

  const current = React.useMemo(
    () => stories.current === story.index,
    [stories.current, story.index]
  );

  /**
   * Render callback to wrap children with a React fragment and key.
   *
   * @param child - The child element to be wrapped.
   * @returns A React fragment containing the child.
   */
  const render = React.useCallback(
    (child: React.ReactNode) => (
      <React.Fragment key={stories.current}>{child}</React.Fragment>
    ),
    [stories.current]
  );

  const items = useOrder(pages.children, render);

  const Tag = React.useMemo(() => pages.props.as ?? as, [pages.props.as, as]);

  React.useEffect(() => {
    if (!config.timer.shouldUseDefault || !timer.expired) return;
    if (pages.canNext || stories.canNext) timer.stop();
    pages.next();
  }, [timer.expired]);

  const Children = viewer.configurable.story.Children;
  const shouldMountConfigurable =
    viewer.configurable.story.mountOnPreload || current;

  return (
    <React.Fragment>
      <Tag
        aria-label="Pages of story"
        role="group"
        {...pages.props}
        className={[styles["pages"], pages.props.className]
          .filter(Boolean)
          .join(" ")}
        data-testid="is-pages"
      >
        {items}
      </Tag>

      {shouldMountConfigurable && Children && <Children />}
    </React.Fragment>
  );
}

export default Pages;
