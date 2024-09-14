import { TransitionStep, useViewerContext } from "@react-instastories/base";
import { useMediaTimer } from "@react-instastories/external";

import React from "react";

interface MediaContentProps {
  src: string;
}

export function MediaContent({ src }: MediaContentProps) {
  const viewer = useViewerContext();

  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    ref.current.volume = 0.25;
  }, [ref.current]);

  React.useEffect(() => {
    switch (viewer.transition.step) {
      case TransitionStep.Entered:
        ref.current?.play();
        return;
      case TransitionStep.Exiting:
        ref.current?.pause();
        return;
    }
  }, [ref.current, viewer.transition.step]);

  useMediaTimer(ref.current);

  if (!src) return null;

  return (
    <video ref={ref}>
      <source src={src} type="video/webm" />
    </video>
  );
}

export default MediaContent;
