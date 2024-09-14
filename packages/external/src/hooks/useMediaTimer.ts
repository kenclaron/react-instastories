import { useTimerContext } from "@react-instastories/base";

import React from "react";

import useIndexes from "./useIndexes";

interface MediaControl
  extends Pick<HTMLMediaElement, "play" | "pause" | "duration" | "currentTime">,
    Partial<
      Pick<HTMLMediaElement, "addEventListener" | "removeEventListener">
    > {}

/**
 * React Hook for managing an internal timer from `@react-instastories/base`
 * using HTML Media Controls.
 *
 * @external This hook uses external context from `@react-instastories/base`.
 *
 * @param {MediaControl | null} media - An object containing media control methods
 * such as `play`, `pause`, `duration`, and `currentTime` or etc. It may also include event listeners.
 *
 * @returns {ReturnType<typeof useTimerContext>} This hook returns the timer context from `@react-instastories/base`.
 *
 * @example
 * const mediaElement = document.querySelector('video');
 * useMediaTimer(mediaElement);
 */
export function useMediaTimer(media: MediaControl | null) {
  const timer = useTimerContext();
  const { page } = useIndexes();

  React.useEffect(() => {
    if (!media || !page.current) return;

    const execute = async () => {
      if (timer.active) {
        try {
          await media.play();
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          await media.pause();
        } catch (error) {
          console.error(error);
        }
      }
    };

    execute();
  }, [timer.active, page.current]);

  React.useEffect(() => {
    if (!page.current) {
      return;
    }

    timer.setManually(true);

    if (!media?.addEventListener) return () => timer.setManually(false);

    const onUpdate = () => {
      const { duration, currentTime } = media;

      if (isNaN(duration) || isNaN(currentTime)) return;

      timer.change(duration * 1000, currentTime * 1000);
    };

    media.addEventListener?.("timeupdate", onUpdate);
    media.addEventListener?.("durationchange", onUpdate);

    return () => {
      timer.setManually(false);

      media.removeEventListener?.("timeupdate", onUpdate);
      media.removeEventListener?.("durationchange", onUpdate);
    };
  }, [media, page.current]);

  return timer;
}

export default useMediaTimer;
