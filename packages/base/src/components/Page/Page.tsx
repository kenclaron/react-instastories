import React from "react";

import { shareRef } from "../../utilities";

import {
  useComposedProvider,
  usePagesContext,
  useStoriesContext,
  useTimerContext,
  useViewerContext
} from "../../hooks";

import { PageContext, useConfig, useStory } from "../../contexts";

import styles from "./Page.module.scss";

interface PageProperties {
  /**
   * The duration of the page.
   */
  readonly duration?: number;
  /**
   * Whether to preload the page.
   */
  readonly preload?: boolean;
  /**
   * Whether the page has priority for visibility.
   */
  readonly priority?: boolean;
  /**
   * Specifies the component type to render.
   *
   * @default "article"
   */
  readonly as?: React.ElementType;
}

interface PageEvents {
  /**
   * Event triggered when the page opens.
   */
  onOpen?(): void;
  /**
   * Event triggered when the page closes.
   */
  onClose?(): void;
}

export interface PageProps
  extends PageProperties,
    PageEvents,
    React.HTMLAttributes<HTMLElement> {}

/**
 * Page component represents a single page in a story.
 * It manages its visibility, transitions, and interactions.
 *
 * @param props - The props for the Page component.
 * @param forwardedRef - The ref forwarded to the underlying HTML element.
 * @returns The Page component.
 */
export const Page = React.forwardRef<HTMLElement, PageProps>(
  function Page(props, forwardedRef) {
    const config = useConfig();
    const {
      as: Tag = "article",
      children,
      index = 0,
      duration,
      preload = false,
      priority = false,
      onOpen,
      onClose,
      ...attributes
    } = props as PageProps & { index?: number };

    const events = { onOpen, onClose };

    const viewer = useViewerContext();
    const timer = useTimerContext();
    const stories = useStoriesContext();
    const pages = usePagesContext();
    const story = useStory();

    const ref = React.useRef<HTMLElement>(null);

    const [shown, setShown] = React.useState(false);

    const timerTime = React.useMemo(
      () => duration ?? stories.config.duration ?? config.duration,
      [duration, stories.config.duration, config.duration]
    );

    const current = React.useMemo(
      () => pages.current === index && stories.current === story.index,
      [pages.current]
    );

    React.useEffect(() => {
      if (!viewer.shown) {
        if (events.onClose?.()) return;
      }
    }, [viewer.shown]);

    React.useEffect(() => {
      if (shown) {
        if (events.onOpen?.()) return;
      } else if (!current && pages.current !== -1) {
        if (events.onClose?.()) return;
      }
    }, [shown]);

    React.useEffect(() => {
      if (current) setShown(true);
      else setShown(false);
    }, [current]);

    React.useEffect(() => {
      if (!config.timer.shouldUseDefault || !current) return;

      timer.change(timerTime);
    }, [current, timerTime]);

    const shouldMountConfigurable =
      viewer.configurable.page.mountOnPreload || current;
    const Provider = useComposedProvider(
      ref,
      viewer.configurable.page.events,
      !shouldMountConfigurable
    );

    if (!preload && !current) {
      return null;
    }

    const Children = viewer.configurable.page.Children;

    const disabled = preload && !current;

    if (disabled) {
      return (
        <PageContext.Provider value={{ index, ref }}>
          <Provider>
            <Tag
              aria-disabled="true"
              aria-label="Page"
              {...attributes}
              ref={shareRef(ref, forwardedRef)}
              className={[
                styles["page"],
                styles["page--disabled"],
                priority && styles["page--priority"],
                attributes.className
              ]
                .filter(Boolean)
                .join(" ")}
              data-testid="is-page"
            >
              {children}

              {shouldMountConfigurable && Children && <Children />}
            </Tag>
          </Provider>
        </PageContext.Provider>
      );
    }

    return (
      <PageContext.Provider value={{ index, ref }}>
        <Provider>
          <Tag
            aria-label="Page"
            {...attributes}
            ref={shareRef(ref, forwardedRef)}
            className={[
              styles["page"],
              attributes.className,
              priority && styles["page--priority"]
            ]
              .filter(Boolean)
              .join(" ")}
            data-testid="is-page"
          >
            {children}

            {shouldMountConfigurable && Children && <Children />}
          </Tag>
        </Provider>
      </PageContext.Provider>
    );
  }
);

Page.displayName = "Page";

export default Page;
