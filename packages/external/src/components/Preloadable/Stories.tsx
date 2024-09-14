import { Story, useStoriesContext } from "@react-instastories/base";

import React from "react";

import {
  NOT_PRELOAD_PROPS,
  PRELOAD_PROPS,
  type PreloadableProps
} from "./Preloadable.model";
import { canPreloaded } from "./canPreloaded";

/**
 * The `Pages` component is responsible for managing the preloading of story elements
 * within a context of stories, based on the current story index and the specified
 * `next` and `previous` prop values.
 *
 * @external This component uses external context from `@react-instastories/base`.
 *
 * @param props - The properties to configure the `Stories` component.
 *
 * @throws Will throw an error if the `next` prop is a negative number.
 * @throws Will throw an error if the `previous` prop is a negative number.
 *
 * @returns The component renders `null` as it only performs side effects.
 */
export function Stories({
  unloadable = false,
  next = 1,
  previous = 1
}: PreloadableProps) {
  if (next < 0) {
    throw new Error(
      'Prop "next" in Preloadable must be a positive number or zero'
    );
  }

  if (previous < 0) {
    throw new Error(
      'Prop "previous" in Preloadable must be a positive number or zero'
    );
  }

  const stories = useStoriesContext();

  React.useEffect(() => {
    if (stories.current < 0) return;
    if (!Array.isArray(stories.children)) return;

    const children = stories.children.map((story, index) => {
      if (!canPreloaded(stories.current, index, previous, next)) {
        return unloadable
          ? story
          : React.cloneElement(story, {
              ...story.props,
              ...NOT_PRELOAD_PROPS
            });
      }

      if (React.isValidElement<typeof Story>(story)) {
        return React.cloneElement(story, {
          ...story.props,
          ...PRELOAD_PROPS
        });
      }

      return story;
    });

    stories.setChildren(children.flat().filter(Boolean));
  }, [stories.length, stories.current, previous, next]);

  return null;
}

Stories.displayName = "Preloadable.Stories";

export default Stories;
