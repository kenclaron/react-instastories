import { TransitionStep, useViewerContext } from "@react-instastories/base";

import React from "react";

export function useShouldShowTransition() {
  const viewer = useViewerContext();

  return React.useMemo(
    () =>
      [TransitionStep.Entering, TransitionStep.Entered].includes(
        viewer.transition.step ?? TransitionStep.Exited
      ),
    [viewer.transition.step]
  );
}

export default useShouldShowTransition;
