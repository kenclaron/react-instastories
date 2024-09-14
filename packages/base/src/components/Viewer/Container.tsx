import React from "react";

import { shareRef } from "../../utilities";

import {
  useComposedProvider,
  usePagesContext,
  useStoriesContext,
  useViewerContext
} from "../../hooks";

import { StoryContext } from "../../contexts";
import { type PageProps } from "../Page";
import Pages, { type PagesProps } from "../Pages";
import stylesPages from "../Pages/Pages.module.scss";
import Story, { type StoryProps } from "../Story";
import stylesStory from "../Story/Story.module.scss";

import List from "./List";

import styles from "./Viewer.module.scss";

/**
 * Finds the first React element with PageProps within the children.
 *
 * @param children - The children prop to search through.
 * @returns The first React element with PageProps found, or null if none are found.
 */
function findPagesChildren(
  children: React.ReactNode
): React.ReactElement<PagesProps> | null {
  for (const child of React.Children.toArray(children)) {
    if (React.isValidElement<PagesProps>(child) && child.type === Pages)
      return child as React.ReactElement<PagesProps>;

    if (React.isValidElement<StoryProps>(child) && child.props.children) {
      const component = findPagesChildren(child.props.children);

      if (component) return component as React.ReactElement<PagesProps>;
    }
  }

  return null;
}

/**
 * Extracts and returns the properties of a story, excluding specific props.
 *
 * @param props - The properties of a story.
 * @returns An object containing the story properties excluding non-HTML props.
 */
function getHTMLProps(props: StoryProps | PagesProps = {}) {
  if ("preload" in props) {
    const { as, preload, duration, start, children, ...storyProps } = props;

    return storyProps;
  }

  const { as, children, ...storyProps } = props;

  return storyProps;
}

/**
 * Hook to generate the children for the Container component.
 *
 * @param ref - A ref object for the container div.
 * @param Provider - A provider component for context.
 * @returns A memoized list of React elements to render.
 */
export function useContentChildren(
  ref: React.RefObject<HTMLDivElement>,
  Events: React.FunctionComponent<React.PropsWithChildren>
) {
  const viewer = useViewerContext();
  const stories = useStoriesContext();
  const pages = usePagesContext();

  const previous = React.useRef<{ page: number; story: number }>();

  React.useEffect(() => {
    previous.current = { page: pages.current, story: stories.current };
  }, [pages.current]);

  return React.useMemo(() => {
    const props: React.JSX.IntrinsicElements["div"] = {
      "aria-label": "Current story",
      className: stylesStory["story"],
      ref: shareRef(ref, viewer.transition.storyRef),
      role: "main",
      style: viewer.animation.style
    };

    if (!Array.isArray(stories.children)) {
      const story = stories.children as React.ReactElement<StoryProps>;
      const storyProps = getHTMLProps(story.props);
      const Tag = story.props.as ?? "div";

      return (
        <StoryContext.Provider key={0} value={{ index: 0, ref }}>
          <Tag
            {...props}
            {...storyProps}
            className={[props.className, storyProps.className]
              .filter(Boolean)
              .join(" ")}
            data-testid="is-story"
            style={{ ...storyProps.style, ...viewer.animation.style }}
          >
            <Events>
              <Pages />
            </Events>
          </Tag>
        </StoryContext.Provider>
      );
    }

    return React.Children.map(
      stories.children,
      (story: React.ReactElement<StoryProps>, index) => {
        if (
          index === stories.current &&
          ((pages.story === index && story.props.preload) ||
            !story.props.preload)
        ) {
          const storyProps = getHTMLProps(story.props);
          const Tag = story.props.as ?? "div";

          return (
            <StoryContext.Provider key={index} value={{ index, ref }}>
              <Tag
                {...props}
                {...storyProps}
                className={[props.className, storyProps.className]
                  .filter(Boolean)
                  .join(" ")}
                data-testid="is-story"
                style={{ ...storyProps.style, ...viewer.animation.style }}
              >
                <Events>
                  <Pages />
                </Events>
              </Tag>
            </StoryContext.Provider>
          );
        }

        if (
          !(React.isValidElement<StoryProps>(story) && story.type === Story) ||
          !story.props?.preload
        )
          return null;

        const preloadedRef = React.createRef<HTMLDivElement>();
        const storyProps = getHTMLProps(story.props);

        const pagesChildren = findPagesChildren(story);
        const pagesProps = getHTMLProps(pagesChildren?.props);

        const StyleTag = story.props.as ?? "div";
        const PagesTag = pagesChildren?.props?.as ?? "div";

        const shouldMountConfigurable =
          viewer.configurable.story.mountOnPreload;
        const Children = viewer.configurable.story.Children;

        const PreloadedEvents = shouldMountConfigurable
          ? Events
          : React.Fragment;

        return (
          <StoryContext.Provider
            key={index}
            value={{ index, ref: preloadedRef }}
          >
            <StyleTag
              ref={preloadedRef}
              aria-disabled={true}
              aria-label="Preloaded story"
              role="main"
              {...storyProps}
              className={[
                stylesStory["story"],
                stylesStory["story--disabled"],
                storyProps.className
              ]
                .filter(Boolean)
                .join(" ")}
              data-testid="is-story-disabled"
              style={{ ...storyProps.style, ...viewer.animation.style }}
            >
              <PreloadedEvents>
                <PagesTag
                  aria-label="Pages of preloaded story"
                  role="group"
                  {...pagesProps}
                  className={[stylesPages["pages"], pagesProps.className]
                    .filter(Boolean)
                    .join(" ")}
                  data-testid="is-pages-preloaded"
                >
                  <List
                    pages={
                      pagesChildren?.props
                        .children as React.ReactElement<PageProps>
                    }
                    previous={previous.current}
                    start={story.props.start}
                    story={index}
                  />
                </PagesTag>

                {shouldMountConfigurable && Children && <Children />}
              </PreloadedEvents>
            </StyleTag>
          </StoryContext.Provider>
        );
      }
    );
  }, [ref.current, stories.children, stories.current, viewer.animation.style]);
}

/**
 * Container component that wraps the Stories component into Viewer.
 *
 * @remarks
 * The component uses multiple hooks to access and provide context values
 * and to generate its children. It also manages preloading logic for stories.
 *
 * @returns A React component that renders a container with Stories for the Viewer.
 */
export function Container() {
  const ref = React.useRef<HTMLDivElement>(null);
  const viewer = useViewerContext();

  const Provider = useComposedProvider(ref, viewer.configurable.story.events);

  const children = useContentChildren(ref, Provider);

  if (!children) return null;

  return (
    <div className={styles["viewer-content"]} data-testid="is-dialog-content">
      {children}
    </div>
  );
}

export default Container;
