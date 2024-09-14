import { usePagesContext, useStoriesContext } from "@react-instastories/base";

import classNames from "classnames";
import React from "react";

interface NextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">,
    Pick<React.HTMLAttributes<HTMLButtonElement>, "onClick"> {}

const ChevronRightIcon = (
  <svg height="24" viewBox="0 0 24 24" width="24">
    <title>Move to next</title>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="#000000" />
  </svg>
);

export const Next = React.forwardRef<HTMLDivElement, NextProps>(function Next(
  { className: classNameNext, children = ChevronRightIcon, ...props },
  ref
) {
  const stories = useStoriesContext();
  const pages = usePagesContext();

  const handleClick = React.useCallback(() => {
    if (pages.canNext) return pages.next();
    else if (stories.canNext) return stories.next();
    else undefined;
  }, [pages.canNext, pages.next, stories.next]);

  const { onClick = handleClick } = props;

  if (!pages.canNext && !stories.canNext) return null;

  const className = classNames(
    "instastories-button-stories-control",
    "instastories-button-stories-control--next",
    classNameNext
  );

  return (
    <div {...props} ref={ref} className={className} onClick={undefined}>
      <button
        aria-label="Move to next story"
        data-testid="is-button-stories-next"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
});

export default Next;
