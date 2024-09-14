import { useViewerContext } from "@react-instastories/base";

import React from "react";

import styles from "../../Button.module.scss";

interface CloseProps extends React.HTMLAttributes<HTMLButtonElement> {}

const CloseIcon = (
  <svg height="32" viewBox="0 0 24 24" width="32">
    <title>Close</title>
    <path
      d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      fill="#ffffff"
    />
  </svg>
);

/**
 * React component that renders a button to close the viewer.
 * It uses the `forwardRef` API to pass a ref down to the button element.
 *
 * @external This component uses external context from `@react-instastories/base`.
 *
 * @param {CloseProps} props - Component props
 * @returns {React.Element} A button element
 */
export const Close = React.forwardRef<HTMLButtonElement, CloseProps>(
  function Close({ className, children = CloseIcon, ...props }, ref) {
    const viewer = useViewerContext();
    const { onClick = viewer.close } = props;

    return (
      <button
        aria-label="Close viewer"
        {...props}
        ref={ref}
        className={[
          styles["button-viewer-control"],
          styles["button-viewer-control--close"],
          className
        ]
          .filter(Boolean)
          .join(" ")}
        data-testid="is-button-viewer-close"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

Close.displayName = "Controls.Viewer.Close";

export default Close;
