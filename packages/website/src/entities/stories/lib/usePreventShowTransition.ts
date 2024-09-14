import { TransitionStep, useViewerContext } from "@react-instastories/base";

import React from "react";

const CLASSNAME = "transitions-enter-done";

export function usePreventShowTransition(
  refs?: React.RefObject<HTMLElement>[]
) {
  const viewer = useViewerContext();

  React.useEffect(() => {
    if (viewer.transition.step !== TransitionStep.Entered) return;

    refs?.forEach((ref) => ref.current?.classList.add(CLASSNAME));
  }, []);
}

export default usePreventShowTransition;
