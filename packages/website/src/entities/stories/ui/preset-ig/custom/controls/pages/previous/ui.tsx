import { usePagesContext, useStoriesContext } from "@react-instastories/base";

import classNames from "classnames";
import React from "react";

interface PreviousProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">,
    Pick<React.HTMLAttributes<HTMLButtonElement>, "onClick"> {}

const ChevronLeftIcon = (
  <svg height="24" viewBox="0 0 24 24" width="24">
    <title>Move to previous</title>
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="#000000" />
  </svg>
);

export const Previous = React.forwardRef<HTMLDivElement, PreviousProps>(
  function Previous(
    { className: classNamePrevious, children = ChevronLeftIcon, ...props },
    ref
  ) {
    const stories = useStoriesContext();
    const pages = usePagesContext();

    const handleClick = React.useCallback(() => {
      if (pages.canPrevious) return pages.previous();
      else if (stories.canPrevious) return stories.previous();
      else undefined;
    }, [pages.canPrevious, pages.previous, stories.previous]);

    const { onClick = handleClick } = props;

    if (!stories.canPrevious) return null;

    const className = classNames(
      "instastories-button-stories-control",
      "instastories-button-stories-control--previous",
      classNamePrevious
    );

    return (
      <div {...props} ref={ref} className={className} onClick={undefined}>
        <button
          aria-label="Move to previous story"
          data-testid="is-button-stories-previous"
          onClick={onClick}
        >
          {children}
        </button>
      </div>
    );
  }
);

export default Previous;
