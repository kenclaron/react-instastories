import { usePagesContext, useStoriesContext } from "@react-instastories/base";

import React from "react";

import styles from "../Button.module.scss";

interface NextProps extends React.HTMLAttributes<HTMLButtonElement> {}

/**
 * React component that renders a button to navigate to the next page.
 * It uses the `forwardRef` API to pass a ref down to the button element.
 *
 * @external This component uses external context from `@react-instastories/base`.
 *
 * @param {NextProps} props - Component props
 * @returns {React.Element} A button element if there is a next page, otherwise null
 */
export const Next = React.forwardRef<HTMLButtonElement, NextProps>(
  function Next({ children, className, ...props }, ref) {
    const pages = usePagesContext();
    const stories = useStoriesContext();

    const [enabled, setEnabled] = React.useState(true);
    const [captured, setCaptured] = React.useState(false);

    const handleClick = React.useCallback(() => {
      if (!enabled) return setEnabled(true);

      if (pages.canNext) return pages.next();
      else return stories.next();
    }, [enabled, pages.canNext, pages.next, stories.next]);

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

    if (!pages.canNext && !stories.canNext) return null;

    return (
      <button
        aria-label="Move to next page"
        {...props}
        ref={ref}
        className={[
          styles["button-pages-control"],
          styles["button-pages-control--next"],
          className
        ]
          .filter(Boolean)
          .join(" ")}
        data-testid="is-button-pages-next"
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

Next.displayName = "Controls.Pages.Next";

export default Next;
