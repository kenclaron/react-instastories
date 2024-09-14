import React from "react";

import { shareRef } from "../../utilities";

import {
  useComposedProvider,
  useStoriesContext,
  useViewerContext
} from "../../hooks";

import { useConfig } from "../../contexts";
import { Animation, TransitionStep } from "../../models";

import Container from "./Container";

import styles from "./Viewer.module.scss";

export interface ViewerProps
  extends React.PropsWithRef<React.DialogHTMLAttributes<HTMLDialogElement>> {
  /**
   * Optional ref for the dialog element.
   */
  ref?: React.RefObject<HTMLDialogElement>;
}

/**
 * Viewer component that renders a dialog to display stories.
 *
 * @remarks
 * The component uses multiple hooks to access configuration, viewer,
 * and stories context values. It conditionally applies CSS classes based on
 * animation and transition steps. The component uses a composed provider to
 * manage context values and events.
 *
 * @returns A React component that renders a dialog for viewing stories.
 */
export function Viewer() {
  const config = useConfig();
  const viewer = useViewerContext();
  const stories = useStoriesContext();

  const ref = React.useRef<HTMLDialogElement>(null);

  const Provider = useComposedProvider(ref, viewer.configurable.viewer.events);

  React.useEffect(() => {
    if (viewer.mounted && stories.current === -1) viewer.close();
  }, [viewer.mounted, stories.current]);

  const Children = viewer.configurable.viewer.Children;

  return (
    <Provider>
      <dialog
        aria-label="Viewer of stories"
        role="presentation"
        tabIndex={-1}
        {...config.viewer.props}
        ref={shareRef(
          config.viewer.props?.ref ?? null,
          viewer.transition.viewerRef,
          ref
        )}
        className={[
          styles["viewer"],
          config.viewer.props?.className,
          config.animation === Animation.Smart && styles["viewer--smart"],
          config.animation === Animation.Linear && styles["viewer--linear"],
          config.animation === Animation.Immediately
            ? `${styles["viewer"]}--${TransitionStep.Entered}`
            : viewer.transition.step &&
              `${styles["viewer"]}--${viewer.transition.step}`
        ]
          .filter(Boolean)
          .join(" ")}
        data-preset={config.preset}
        data-testid="is-dialog"
      >
        <Container />
        {Children && <Children />}
      </dialog>
    </Provider>
  );
}

export default React.memo(Viewer);
