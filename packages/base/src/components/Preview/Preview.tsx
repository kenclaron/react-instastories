import React from "react";

import {
  type PreviewEvents,
  usePreviewContext,
  useViewerContext
} from "../../hooks";

import styles from "./Preview.module.scss";

export interface PreviewProps
  extends Omit<PreviewEvents, "onClick">,
    React.HTMLAttributes<HTMLElement> {
  /**
   * Specifies the component type to render.
   *
   * @default "button"
   */
  readonly as?: React.ElementType;
}

/**
 * Preview component that renders a button to open a story.
 *
 * @remarks
 * The component uses hooks to access the preview and viewer contexts.
 * It conditionally applies CSS classes and attributes based on context values.
 * The component is forward-ref compatible, allowing it to be used with refs.
 *
 * @param props - The props for the Preview component.
 * @param ref - The ref for the button element.
 *
 * @returns A React component that renders a preview of story.
 */
export const Preview = React.forwardRef<HTMLElement, PreviewProps>(
  function Preview({ as: Tag = "button", children, className, ...props }, ref) {
    const preview = usePreviewContext();
    const viewer = useViewerContext();

    return (
      <Tag
        aria-expanded={!preview.shown ? true : undefined}
        aria-label="Open story"
        data-testid="is-preview"
        {...props}
        ref={ref}
        className={[
          styles["preview"],
          !preview.shown && `${styles["preview"]}--expanded`,
          className
        ]
          .filter(Boolean)
          .join(" ")}
        tabIndex={viewer.mounted ? -1 : props.tabIndex}
      >
        {children}
      </Tag>
    );
  }
);

Preview.displayName = "Preview";

export default Preview;
