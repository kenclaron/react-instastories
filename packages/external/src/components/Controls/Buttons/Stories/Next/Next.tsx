import { useStoriesContext } from "@react-instastories/base";

import React from "react";

import styles from "../../Button.module.scss";

interface NextProps extends React.HTMLAttributes<HTMLButtonElement> {}

const ChevronRightIcon = (
  <svg height="32" viewBox="0 0 24 24" width="32">
    <title>Move to next</title>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="#ffffff" />
  </svg>
);

/**
 * React component that renders a button to navigate to the next story.
 * It uses the `forwardRef` API to pass a ref down to the button element.
 *
 * @external This component uses external context from `@react-instastories/base`.
 *
 * @param {NextProps} props - Component props
 * @returns {React.Element} A button element if there is a next story, otherwise null
 */
export const Next = React.forwardRef<HTMLButtonElement, NextProps>(
  function Next({ className, children = ChevronRightIcon, ...props }, ref) {
    const stories = useStoriesContext();
    const { onClick = stories.next } = props;

    if (!stories.canNext) return null;

    return (
      <button
        aria-label="Move to next story"
        {...props}
        ref={ref}
        className={[
          styles["button-stories-control"],
          styles["button-stories-control--next"],
          className
        ]
          .filter(Boolean)
          .join(" ")}
        data-testid="is-button-stories-next"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

Next.displayName = "Controls.Stories.Next";

export default Next;
