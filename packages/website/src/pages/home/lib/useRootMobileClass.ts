import React from "react";
import { isMobile } from "react-device-detect";

const CLASS = "is-mobile";

export function useRootMobileClass(
  element: HTMLElement | null = typeof document !== "undefined"
    ? document.body
    : null
) {
  return React.useEffect(() => {
    if (!element) return;

    if (isMobile) element.classList.add(CLASS);
    else element.classList.remove(CLASS);

    return () => {
      element.classList.remove(CLASS);
    };
  }, [isMobile, element]);
}

export default useRootMobileClass;
