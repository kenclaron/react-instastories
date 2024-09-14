import React from "react";

interface ReadyViewerContextValue {
  readonly ready: boolean;
  readonly timer: boolean;
  setReady(state: boolean): void;
  setTimer(state: boolean): void;
}

export function useReadyViewer(): ReadyViewerContextValue {
  const [ready, setReady] = React.useState(false);
  const [timer, setTimer] = React.useState(true);

  return React.useMemo<ReadyViewerContextValue>(
    () => ({ ready, setReady, timer, setTimer }),
    [ready, setReady, timer, setTimer]
  );
}

export const ReadyViewerContext = React.createContext<ReadyViewerContextValue>({
  ready: false,
  timer: true,
  setReady: () => {},
  setTimer: () => {}
});

export function useReadyViewerContext() {
  return React.useContext(ReadyViewerContext);
}
