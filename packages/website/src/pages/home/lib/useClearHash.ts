import { useRouter } from "next/router";
import React from "react";

import { Utility } from "../../../shared";

import { useScrollPosition } from "./useScrollPosition";

export function useClearHash() {
  const { y } = useScrollPosition();
  const scrolled = React.useMemo(() => y !== 0, [y]);
  const router = useRouter();

  return React.useEffect(() => {
    if (typeof location === "undefined") return;
    if (!router.isReady) return;
    if (!location.href.endsWith("#")) return;
    if (location.hash !== "") return;
    if (scrolled) return;

    router
      .replace("", undefined, { scroll: false })
      .then(() => Utility.debug("URL Hash has been cleared.", window.location))
      .catch((error) => console.error("URL Hash could not be cleared.", error));
  }, [scrolled, router.isReady]);
}

export default useClearHash;
