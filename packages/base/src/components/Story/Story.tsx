import React from "react";

import { shareRef } from "../../utilities";

import {
  PreviewContext,
  usePagesContext,
  usePreview,
  useProps,
  useStoriesContext,
  useViewerContext
} from "../../hooks";

import { useConfig } from "../../contexts";
import Pages from "../Pages";
import Preview from "../Preview";

export interface StoryConfiguration {
  /**
   * Duration of the story in milliseconds.
   */
  readonly duration?: number;
  /**
   * Determines whether the story should be preloaded.
   */
  readonly preload?: boolean;
  /**
   * Starting page of the story when open.
   */
  readonly start?: number;
  /**
   * Specifies the component type to render.
   *
   * @default "div"
   */
  readonly as?: React.ElementType;
}

interface StoryEvents {
  /**
   * Event handler for when the story is opened.
   */
  onOpen?(): void;
  /**
   * Event handler for when the story is closed.
   */
  onClose?(): void;
}

export interface StoryProps
  extends StoryConfiguration,
    StoryEvents,
    React.HTMLAttributes<HTMLElement> {}

/**
 * Story component that manages and renders a single story with preview and pages.
 *
 * @remarks
 * The component uses multiple hooks to access context values and manage
 * story transitions, previews, and page rendering. It conditionally handles
 * various events such as opening, closing, and clicking on the story preview.
 *
 * @param props - The props for the Story component.
 *
 * @returns A React component that renders a story with a preview and pages.
 */
export function Story(props: StoryProps) {
  const {
    children,
    index = 0,
    duration,
    preload = false,
    start,
    ...events
  } = props as StoryProps & { index?: number };

  const ref = React.useRef<HTMLElement>(null);

  const propsPages = useProps(children, Pages);
  const { onShow, onHide, onClick, ...propsPreview } = useProps(
    children,
    Preview
  );

  const eventsPreview = { onShow, onHide, onClick };
  const preview = usePreview(eventsPreview, ref.current);

  const config = useConfig();
  const viewer = useViewerContext();
  const stories = useStoriesContext();
  const pages = usePagesContext();

  const [mounted, setMounted] = React.useState(false);

  const current = React.useMemo(
    () => stories.current === index,
    [stories.current, index]
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (eventsPreview.onClick?.(event)) return;

      event.currentTarget.blur();

      stories.configure((config) => ({ ...config, start }));
      stories.show(index);
      viewer.animation.execute(event.currentTarget);

      window.requestAnimationFrame(() => viewer.open());
      window.requestAnimationFrame(() => preview.hide(event.currentTarget));
    },
    [viewer.open, viewer.animation.execute, preview.hide, stories.show]
  );

  React.useEffect(() => {
    if (!current) return;

    stories.configure((config) => ({ ...config, duration, preload, start }));

    const { children, ...props } = propsPages;

    pages.setChildren(
      Array.isArray(children) ? children.flat().filter(Boolean) : children
    );
    pages.setProps(props);
    pages.setStory(stories.current);

    if (ref && "current" in ref && ref.current) {
      viewer.animation.setTarget(ref.current);
    }
  }, [current, propsPages]);

  React.useEffect(() => {
    if (stories.current < 0) return;

    if (current) {
      if (events.onOpen?.()) return;

      preview.hide();
    } else {
      if (events.onClose?.()) return;

      preview.show();
    }
  }, [current]);

  React.useEffect(() => {
    if (current && !viewer.mounted) events.onClose?.();
  }, [viewer.mounted]);

  React.useEffect(() => setMounted(true), [config.preview.shouldMount]);

  React.useEffect(() => {
    if (!config.viewer.shouldMount || config.viewer.story !== index) return;
    if (stories.mounted) return;

    ref.current?.click();
  }, [ref.current]);

  React.useEffect(() => {
    if (!config.viewer.shouldMount || config.viewer.story !== index) return;
    if (!stories.mounted || !mounted) return;

    ref.current?.click();
  }, [config.viewer.shouldMount]);

  if (!propsPreview.children) return null;

  return (
    <PreviewContext.Provider value={preview}>
      <Preview
        {...propsPreview}
        ref={shareRef(ref, propsPreview.ref as React.ForwardedRef<HTMLElement>)}
        onClick={handleClick}
      />
    </PreviewContext.Provider>
  );
}

export default Story;
