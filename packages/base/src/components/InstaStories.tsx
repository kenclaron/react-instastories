import React from "react";

import { Utility } from "../utilities";

import {
  type Configuration,
  InstaStoriesContext,
  ViewerContext,
  type ViewerEvents,
  useInstaStories,
  useViewer
} from "../hooks";

/**
 * Props for the library component.
 */
export interface InstaStoriesProps extends ViewerEvents {
  /**
   * Optional configuration.
   */
  readonly config?: Partial<Configuration>;
  /**
   * Children elements to be rendered inside the library component.
   */
  readonly children?: React.ReactNode;
}

/**
 * The main component for rendering library.
 *
 * @param {InstaStoriesProps} props - The properties for the library component.
 * @returns {JSX.Element} The rendered library component.
 *
 * @example
 * ```tsx
 * <InstaStories config={config} onOpen={handleOpen}>
 *   {children}
 * </InstaStories>
 * ```
 */
export function InstaStories(props: InstaStoriesProps) {
  const { config, children, ...events } = props;

  const instastories = useInstaStories(config);
  const viewer = useViewer(events, instastories.config);

  React.useEffect(() => Utility.debug("Init", props), []);

  return (
    <InstaStoriesContext.Provider value={instastories}>
      <ViewerContext.Provider value={viewer}>{children}</ViewerContext.Provider>
    </InstaStoriesContext.Provider>
  );
}

export default InstaStories;
