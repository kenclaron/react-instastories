import React from "react";

interface ThrottleOptions {
  /**
   * Whether to call the function on the leading edge of the wait interval
   */
  leading?: boolean;
  /**
   * Whether to call the function on the trailing edge of the wait interval
   */
  trailing?: boolean;
}

/**
 * A custom React hook that creates a throttled version of a function that only
 * invokes the function at most once per every wait milliseconds.
 *
 * @template T - The type of the function to be throttled.
 * @param {T} callback - The function to be throttled.
 * @param {number} delay - The wait interval in milliseconds.
 * @param {ThrottleOptions} [options={}] - Optional throttle options.
 * @param {boolean} [options.leading=true] - Whether to call the function on the leading edge of the wait interval
 * @param {boolean} [options.trailing=true] - Whether to call the function on the trailing edge of the wait interval
 *
 * @returns {T} A throttled version of the provided function.
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  options: ThrottleOptions = {}
): T {
  const { leading = true, trailing = true } = options;
  const timeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCallTime = React.useRef<number | null>(null);
  const lastArgs = React.useRef<Parameters<T> | null>(null);

  const fn = React.useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (lastCallTime.current === null && !leading) lastCallTime.current = now;

      const remainingTime = lastCallTime.current
        ? delay - (now - lastCallTime.current)
        : 0;

      if (remainingTime <= 0) {
        if (timeout.current) {
          clearTimeout(timeout.current);
          timeout.current = null;
        }

        lastCallTime.current = now;
        callback(...args);
      } else if (trailing) {
        if (timeout.current) clearTimeout(timeout.current);

        lastArgs.current = args;
        timeout.current = setTimeout(() => {
          lastCallTime.current = leading ? Date.now() : null;
          timeout.current = null;

          if (lastArgs.current) callback(...lastArgs.current);
        }, remainingTime);
      }
    },
    [callback, delay, leading, trailing]
  );

  return fn as T;
}

export default useThrottle;
