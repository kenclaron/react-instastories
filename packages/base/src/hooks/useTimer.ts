import React from "react";

import { Utility } from "../utilities";

import { useConfig } from "../contexts";
import { TransitionStep } from "../models";

import { useViewerContext } from "./useViewer";

export interface Timer {
  /**
   * The state of the timer active mode.
   */
  readonly active: boolean;
  /**
   * The state for the timer's manual mode.
   */
  readonly manually: boolean;
  /**
   * The value based on the current time and expiration time.
   */
  readonly expired: boolean;
  /**
   * The duration time for the timer.
   */
  readonly duration: number;
  /**
   * The state for the current time value.
   */
  readonly time: number;
  /**
   * Stops the timer and resets the time to 0.
   */
  stop(): void;
  /**
   * Pauses the timer by setting `active` to `false`.
   */
  pause(): void;
  /**
   * Starts the timer by setting `active` to `true`.
   */
  start(): void;
  /**
   * Resets the timer by stopping and then starting it again.
   */
  reset(): void;
  /**
   * Changes the expiration time of the timer.
   *
   * @param {number} duration - The new expiration time in milliseconds.
   * @param {number} [time=undefined] - The new current time.
   */
  change(duration: number, time?: number): void;
  /**
   * Changes the manual state of the timer.
   *
   * @param {boolean} manually - The new manual state.
   */
  setManually(manually: boolean): void;
  /**
   * Changes the waiting state of the timer.
   *
   * @param {boolean} waiting - The new waiting state.
   */
  setWaiting(waiting: boolean): void;
}

/**
 * React Hook for managing a internal timer.
 *
 * @param {number} defaultDuration - The default expiration time per-page in milliseconds.
 * @returns {Timer} The timer object.
 */
export function useTimer(defaultDuration: number): Timer {
  if (defaultDuration < 0) {
    throw new Error('Prop "defaultDuration" must be a positive number or zero');
  }

  const config = useConfig();
  const viewer = useViewerContext();

  const [waiting, setWaiting] = React.useState(false);
  const [manually, setManually] = React.useState(
    !config.timer.shouldUseDefault
  );
  const [active, setActive] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [duration, setDuration] = React.useState(defaultDuration);

  const expired = React.useMemo(
    () => duration !== 0 && time !== 0 && time >= duration,
    [active, time, duration]
  );

  const stop = React.useCallback(() => {
    pause();
    setTime(0);

    Utility.debug(`Timer was stopped on ${time} out of ${duration}`);
  }, [time, duration]);

  const pause = React.useCallback(() => setActive(false), []);
  const start = React.useCallback(() => setActive(true), []);

  const reset = React.useCallback(() => {
    stop();
    start();

    Utility.debug("Timer was reseted");
  }, [stop, start]);

  function change(duration: number, time?: number) {
    setDuration(duration);

    if (typeof time === "number") {
      Utility.debug(`Timer current time was changed to ${time}ms`);
      setTime(time);
    }

    Utility.debug(`Timer duration time was changed to ${duration}ms`);
  }

  React.useEffect(() => {
    let id: number = 0;

    if (active && !waiting && !manually) {
      if (!("interval" in config.timer)) return;

      if (config.timer.interval <= 0) {
        throw new Error('Prop "interval" in config must be positive number');
      }

      const interval = config.timer.interval;

      id = window.setInterval(
        () => setTime((time) => time + interval),
        interval
      );
    }

    if (time >= duration) clearInterval(id);

    return () => clearInterval(id);
  }, [manually, waiting, active, duration, time]);

  React.useEffect(() => {
    if (!viewer.shown && active) pause();
  }, [viewer.shown, active]);

  React.useEffect(() => {
    if (!viewer.mounted && active) stop();
  }, [viewer.mounted, active]);

  React.useEffect(() => {
    if (!config.timer.shouldUseDefault) return;

    if (active && viewer.mounted) {
      Utility.debug(
        `Timer was started in ${time}ms with duration ${duration}ms`
      );
    } else if (viewer.mounted) {
      Utility.debug(`Timer was paused on ${time}ms out of ${duration}ms`);
    }
  }, [viewer.mounted, active]);

  React.useEffect(() => {
    if (viewer.mounted) {
      setWaiting(viewer.transition.step !== TransitionStep.Entered);
    }
  }, [viewer.mounted, viewer.transition.step]);

  React.useEffect(
    () => setManually(!config.timer.shouldUseDefault),
    [config.timer.shouldUseDefault]
  );

  return React.useMemo(
    () => ({
      active,
      manually,
      expired,
      duration,
      time,
      stop,
      pause,
      start,
      reset,
      change,
      setManually,
      setWaiting
    }),
    [
      active,
      manually,
      expired,
      duration,
      time,
      stop,
      pause,
      start,
      reset,
      setManually,
      setWaiting
    ]
  );
}

/* Creating a context object that is used to pass data down to the child components. */
export const TimerContext = React.createContext<Timer>({
  active: false,
  manually: false,
  expired: false,
  duration: 0,
  time: 0,
  stop: () => {},
  pause: () => {},
  start: () => {},
  reset: () => {},
  change: () => {},
  setManually: () => {},
  setWaiting: () => {}
});

TimerContext.displayName = "TimerContext";

/**
 * Hook to access the timer context.
 *
 * @example
 * ```tsx
 * const timer = useTimerContext();
 * ```
 */
export function useTimerContext() {
  return React.useContext(TimerContext);
}

export default useTimer;
