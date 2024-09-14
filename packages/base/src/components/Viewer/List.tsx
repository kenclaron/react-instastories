import React from "react";

import Page, { type PageProps } from "../Page";

interface ListProps {
  /**
   * An array of React elements with PageProps or a single React element with PageProps, or null.
   */
  readonly pages: React.ReactElement<PageProps> | null;
  /**
   * The current story index.
   */
  readonly story: number;
  /**
   * The starting page index for the story.
   */
  readonly start?: number;
  /**
   * An optional object containing the previous page and story indices.
   */
  readonly previous?: { page: number; story: number };
}

/**
 * List component that renders a list of Page components with preloading logic.
 *
 * @remarks
 * The component checks if the pages prop is an array or a single element. It applies
 * preloading based on whether the page is the previous page, the starting page, or
 * the first page in the list.
 *
 * @param props - The props for the List component.
 *
 * @returns A React component that renders a list of Page components.
 */
export function List({ pages, story, start, previous }: ListProps) {
  const isPrevious = React.useCallback(
    (page: number) => previous?.story === story && previous.page === page,
    [previous, story]
  );

  const isPriority = React.useCallback(
    (page: number) => start === page,
    [start]
  );

  if (!Array.isArray(pages)) {
    if (!(React.isValidElement<PageProps>(pages) && pages.type === Page))
      return null;

    return React.cloneElement(pages, {
      ...pages.props,
      key: 0,
      preload: true,
      priority: isPriority(0)
    });
  }

  return pages.map((page, key) => {
    if (!page) return null;

    const previous = isPrevious(key);
    const priority = isPriority(key);
    const first = key === 0;

    if (previous || priority || first)
      return React.cloneElement(page, {
        ...page.props,
        key,
        preload: true,
        priority
      });
    else if (page.props?.preload)
      return React.cloneElement(page, { ...page.props, key });
    else return null;
  });
}

export default List;
