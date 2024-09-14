import { useStoriesContext, useViewerContext } from "@react-instastories/base";

import classNames from "classnames";
import React from "react";

interface NextProps extends React.HTMLAttributes<HTMLButtonElement> {}

const ChevronRightIcon = (
  <svg height="32" viewBox="0 0 24 24" width="32">
    <title>Move to next</title>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="#000000" />
  </svg>
);

export const Next = React.forwardRef<HTMLButtonElement, NextProps>(
  function Next(
    { className: classNameNext, children = ChevronRightIcon, ...props },
    ref
  ) {
    const viewer = useViewerContext();
    const stories = useStoriesContext();
    const { onClick = stories.canNext ? stories.next : viewer.close } = props;

    const className = classNames(
      "instastories-button-stories-control",
      "instastories-button-stories-control--next",
      classNameNext
    );

    return (
      <button
        aria-label="Move to next story"
        {...props}
        ref={ref}
        className={className}
        data-testid="is-button-stories-next"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

export default Next;
