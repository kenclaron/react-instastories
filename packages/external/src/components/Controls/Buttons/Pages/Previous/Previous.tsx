import { usePagesContext, useStoriesContext } from "@react-instastories/base";

import React from "react";

import styles from "../Button.module.scss";

interface PreviousProps extends React.HTMLAttributes<HTMLButtonElement> {}

/**
 * React component that renders a button to navigate to the previous page.
 * It uses the `forwardRef` API to pass a ref down to the button element.
 *
 * @external This component uses external context from `@react-instastories/base`.
 *
 * @param {PreviousProps} props - Component props
 * @returns {React.Element} A button element if there is a previous page, otherwise null
 */
export const Previous = React.forwardRef<HTMLButtonElement, PreviousProps>(
  function Previous({ className, children, ...props }, ref) {
    const pages = usePagesContext();
    const stories = useStoriesContext();

    const [enabled, setEnabled] = React.useState(true);
    const [captured, setCaptured] = React.useState(false);

    const handleClick = React.useCallback(() => {
      if (!enabled) return setEnabled(true);

      if (pages.canPrevious) return pages.previous();
      else return stories.previous();
    }, [enabled, pages.canPrevious, pages.previous, stories.previous]);

    function handlePointerDown() {
      setCaptured(true);
    }

    const handlePointerMove = React.useCallback(() => {
      if (captured) setEnabled(false);
    }, [captured]);

    function handlePointerUp() {
      setCaptured(false);
      setEnabled(true);
    }

    React.useEffect(() => {
      return () => handlePointerUp();
    }, []);

    const {
      onClick = handleClick,
      onPointerDown = handlePointerDown,
      onPointerMove = handlePointerMove,
      onPointerUp = handlePointerUp
    } = props;

    if (!pages.canPrevious && !stories.canPrevious) return null;

    return (
      <button
        aria-label="Move to previous page"
        {...props}
        ref={ref}
        className={[
          styles["button-pages-control"],
          styles["button-pages-control--previous"],
          className
        ]
          .filter(Boolean)
          .join(" ")}
        data-testid="is-button-pages-previous"
        onClick={onClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {children}
      </button>
    );
  }
);

Previous.displayName = "Controls.Pages.Previous";

export default Previous;
