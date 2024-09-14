import React from "react";

import { useScrollPosition } from "./useScrollPosition";

const CLASS = "nextra-nav-container--filled";
const SELECTOR = ".nextra-nav-container";

export function useTransparentHeader() {
  const { y } = useScrollPosition();
  const scrolled = React.useMemo(() => y !== 0, [y]);

  return React.useEffect(() => {
    const element = document.querySelector(SELECTOR);

    if (!element) return;

    if (scrolled) element.classList.add(CLASS);
    else element.classList.remove(CLASS);

    return () => element.classList.remove(CLASS);
  }, [scrolled]);
}

export default useTransparentHeader;
