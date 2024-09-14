import { Page, usePagesContext } from "@react-instastories/base";

import React from "react";

import { PRELOAD_PROPS, PreloadableProps } from "./Preloadable.model";
import canPreloaded from "./canPreloaded";

/**
 * The `Pages` component is responsible for managing the preloading of page elements
 * within a context of pages, based on the current page index and the specified
 * `next` and `previous` prop values.
 *
 * @external This component uses external context from `@react-instastories/base`.
 *
 * @param props - The properties to configure the `Pages` component.
 *
 * @throws Will throw an error if the `next` prop is a negative number.
 * @throws Will throw an error if the `previous` prop is a negative number.
 *
 * @returns The component renders `null` as it only performs side effects.
 */
export function Pages({
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

  const pages = usePagesContext();

  React.useEffect(() => {
    if (pages.story < 0) return;
    if (pages.current < 0) return;
    if (!Array.isArray(pages.children)) return;

    const children = pages.children.map((page, index) => {
      if (!canPreloaded(pages.current, index, previous, next)) {
        return unloadable
          ? page
          : React.cloneElement(page, {
              ...page.props,
              ...PRELOAD_PROPS
            });
      }

      if (React.isValidElement<typeof Page>(page)) {
        return React.cloneElement(page, {
          ...page.props,
          ...PRELOAD_PROPS
        });
      }

      return page;
    });

    pages.setChildren(children.flat().filter(Boolean));
  }, [pages.length, pages.story, pages.current, previous, next]);

  return null;
}

Pages.displayName = "Preloadable.Pages";

export default Pages;
