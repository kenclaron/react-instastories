import React from "react";

export interface Configurable
  extends Pick<React.PropsWithChildren, "children"> {
  /**
   * An optional array of React functional components representing events.
   */
  readonly events?: React.FunctionComponent[];
}

export interface Section<T extends Configurable> {
  /**
   * An optional array of React functional components representing events.
   */
  readonly events?: T["events"];
  /**
   * A React functional component representing the children of the section.
   */
  readonly Children: React.FunctionComponent | null;
  /**
   * A state dispatcher for setting the `Configurable` state or null.
   */
  readonly set: React.Dispatch<React.SetStateAction<T | null>>;
  /**
   * An optional boolean flag to mount components mountOnPreload.
   */
  readonly mountOnPreload?: boolean;
}

export interface ViewerConfigurable extends Configurable {}

export interface StoryConfigurable
  extends Configurable,
    Pick<Section<StoryConfigurable>, "mountOnPreload"> {}

export interface PageConfigurable
  extends Configurable,
    Pick<Section<PageConfigurable>, "mountOnPreload"> {}

/**
 * React Hook for managing configurable sections.
 *
 * @returns {Object} The configurable context object containing `page`, `story`, and `viewer` sections.
 * @returns {Section<PageConfigurable>} page - The page section context object.
 * @returns {Section<StoryConfigurable>} story - The story section context object.
 * @returns {Section<ViewerConfigurable>} viewer - The viewer section context object.
 */
export function useConfigurable() {
  const viewer = useSection<ViewerConfigurable>();
  const story = useSection<StoryConfigurable>();
  const page = useSection<PageConfigurable>();

  return { page, story, viewer };
}

/**
 * React Hook for managing a single section.
 *
 * @template T
 * @param {T} section - The section type extending Configurable.
 * @returns {Section<T>} The section context object.
 */
function useSection<T extends Configurable>(): Section<T> {
  const [state, set] = React.useState<T | null>(null);

  const Children = React.useMemo(
    () =>
      state?.children
        ? function Configurable() {
            return state?.children;
          }
        : null,
    [state?.children]
  );

  const events = React.useMemo(() => state?.events, [state?.events]);
  const mountOnPreload = (state as StoryConfigurable | PageConfigurable)
    ?.mountOnPreload;

  return React.useMemo(
    () => ({ mountOnPreload, events, Children, set }),
    [events, Children]
  );
}

export default useConfigurable;
