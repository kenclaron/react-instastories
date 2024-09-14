import { useStoriesContext, useViewerContext } from "@react-instastories/base";

import classNames from "classnames";
import React from "react";

interface PreviousProps extends React.HTMLAttributes<HTMLButtonElement> {}

const ChevronLeftIcon = (
  <svg height="32" viewBox="0 0 24 24" width="32">
    <title>Move to previous</title>
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="#000000" />
  </svg>
);

export const Previous = React.forwardRef<HTMLButtonElement, PreviousProps>(
  function Previous(
    { className: classNamePrevious, children = ChevronLeftIcon, ...props },
    ref
  ) {
    const viewer = useViewerContext();
    const stories = useStoriesContext();
    const { onClick = stories.canPrevious ? stories.previous : viewer.close } =
      props;

    const className = classNames(
      "instastories-button-stories-control",
      "instastories-button-stories-control--previous",
      classNamePrevious
    );

    return (
      <button
        aria-label="Move to previous story"
        {...props}
        ref={ref}
        className={className}
        data-testid="is-button-stories-previous"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

export default Previous;
