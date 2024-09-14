import { useViewerContext } from "@react-instastories/base";

import React from "react";

import styles from "./Background.module.scss";

interface BackgroundProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Background component for the viewer. This component provides a background for the viewer that listens for click events
 * to close the viewer. It forwards a ref to the underlying div element and applies
 * custom styles.
 *
 * @external This component uses external context from `@react-instastories/base`.
 *
 * @param props - The props for the component.
 * @param ref - A ref object forwarded to the underlying div element.
 * @returns {React.Element} A background element
 */
export const Background = React.forwardRef<HTMLDivElement, BackgroundProps>(
  function Background({ className, ...props }, ref) {
    const viewer = useViewerContext();
    const { onClick = viewer.close } = props;

    return (
      <div
        aria-label="Background of viewer"
        {...props}
        ref={ref}
        className={[styles["viewer-background"], className]
          .filter(Boolean)
          .join(" ")}
        data-testid="is-dialog-background"
        role="button"
        tabIndex={-1}
        onClick={onClick}
      />
    );
  }
);

Background.displayName = "Controls.Viewer.Background";

export default Background;
