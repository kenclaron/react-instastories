import { useStoriesContext } from "@react-instastories/base";

import React from "react";

import styles from "../../Button.module.scss";

interface PreviousProps extends React.HTMLAttributes<HTMLButtonElement> {}

const ChevronLeftIcon = (
  <svg height="32" viewBox="0 0 24 24" width="32">
    <title>Move to previous</title>
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="#ffffff" />
  </svg>
);

/**
 * React component that renders a button to navigate to the previous story.
 * It uses the `forwardRef` API to pass a ref down to the button element.
 *
 * @external This component uses external context from `@react-instastories/base`.
 *
 * @param {PreviousProps} props - Component props
 * @returns {React.Element} A button element if there is a previous story, otherwise null
 */
export const Previous = React.forwardRef<HTMLButtonElement, PreviousProps>(
  function Previous({ className, children = ChevronLeftIcon, ...props }, ref) {
    const stories = useStoriesContext();
    const { onClick = stories.previous } = props;

    if (!stories.canPrevious) return null;

    return (
      <button
        aria-label="Move to previous story"
        {...props}
        ref={ref}
        className={[
          styles["button-stories-control"],
          styles["button-stories-control--previous"],
          className
        ]
          .filter(Boolean)
          .join(" ")}
        data-testid="is-button-stories-previous"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

Previous.displayName = "Controls.Stories.Previous";

export default Previous;
