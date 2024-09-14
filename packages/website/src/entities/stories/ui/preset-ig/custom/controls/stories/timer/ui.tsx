import { useTimerContext } from "@react-instastories/base";
import { useIndexes } from "@react-instastories/external";

import classNames from "classnames";
import React from "react";

import { preventEvent } from "../../../../../../../../shared";

interface PreviousProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "children"> {}

const PauseIcon = (
  <svg height="24" viewBox="0 0 24 24" width="24">
    <title>Pause</title>
    <path d="M6 19h4V5H6zm8-14v14h4V5z" fill="#ffffff" />
  </svg>
);

const ResumeIcon = (
  <svg height="24" viewBox="0 0 24 24" width="24">
    <title>Resume</title>
    <path d="M8 5v14l11-7z" fill="#ffffff" />
  </svg>
);

export const Timer = React.forwardRef<HTMLButtonElement, PreviousProps>(
  function Timer({ className: classNameTimer, ...props }, ref) {
    const timer = useTimerContext();
    const { story } = useIndexes();

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!story.current) return;

        preventEvent(event);

        props.onClick?.(event);

        if (timer.manually) return timer.setManually(false);
        else return timer.setManually(true);
      },
      [timer.manually]
    );

    const className = classNames(
      [
        "instastories-button-stories-control",
        "instastories-button-stories-control--pause",
        classNameTimer
      ]
        .filter(Boolean)
        .join(" ")
    );

    return (
      <button
        ref={ref}
        aria-label="Pause story"
        {...props}
        className={className}
        data-testid="is-button-stories-pause"
        onClick={handleClick}
      >
        {timer.manually ? ResumeIcon : PauseIcon}
      </button>
    );
  }
);

export default Timer;
