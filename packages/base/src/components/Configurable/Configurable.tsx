import React from "react";

import { PropTypes } from "../../utilities";

import {
  type Configurable,
  type PageConfigurable,
  type Section,
  type StoryConfigurable,
  type ViewerConfigurable,
  useViewerContext
} from "../../hooks";

interface ComponentProps<T extends Configurable = Configurable>
  extends ViewerConfigurable,
    StoryConfigurable,
    PageConfigurable {
  /**
   * The section to be configured.
   */
  readonly configurable: Section<T>;
}

/**
 * Container component that renders its configurable children.
 *
 * @param children - The configurable children elements to be rendered.
 * @returns The rendered configurable children elements.
 */
export function Container({ children }: Pick<ComponentProps, "children">) {
  return children;
}

/**
 * Component that configures its section and performs side effects when its
 * children or events props change.
 *
 * @returns only performs side effects.
 */
function Component({
  mountOnPreload,
  children,
  configurable,
  events
}: ComponentProps<ViewerConfigurable | StoryConfigurable | PageConfigurable>) {
  React.useEffect(() => {
    configurable.set({ mountOnPreload, children, events });

    return () => {
      configurable.set({
        mountOnPreload: undefined,
        children: undefined,
        events: undefined
      });
    };
  }, [mountOnPreload, children, events]);

  return null;
}

/**
 * Viewer component that uses the Viewer context for configuration.
 *
 * @param props - The configurable props.
 * @returns The Component configured with viewer section.
 */
export function Viewer(props: ViewerConfigurable) {
  const viewer = useViewerContext();

  return <Component {...props} configurable={viewer.configurable.viewer} />;
}

/**
 * Story component that uses the Story context for configuration.
 *
 * @param props - The configurable props.
 * @returns The Component configured with story section.
 */
export function Story(props: StoryConfigurable) {
  const viewer = useViewerContext();

  return <Component {...props} configurable={viewer.configurable.story} />;
}

/**
 * Page component that uses the Page context for configuration.
 *
 * @param props - The configurable props.
 * @returns The Component configured with page section.
 */
export function Page(props: PageConfigurable) {
  const viewer = useViewerContext();

  return <Component {...props} configurable={viewer.configurable.page} />;
}

export default { Container, Viewer, Story, Page };

Container.propTypes = {
  children: PropTypes.limitation(Viewer, Story, Page)
};
