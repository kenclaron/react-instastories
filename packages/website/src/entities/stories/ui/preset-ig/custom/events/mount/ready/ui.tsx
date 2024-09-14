import { EventProps, useTimerContext } from "@react-instastories/base";

import React from "react";

import { useReadyViewerContext } from "../../../../../../lib";

interface ReadyEventProps extends EventProps {}

export function Ready({ children }: ReadyEventProps) {
  const readyViewer = useReadyViewerContext();
  const timer = useTimerContext();

  React.useEffect(() => {
    return () => {
      readyViewer.setReady(false);
      timer.setManually(false);
    };
  }, []);

  return children;
}

export default Ready;
