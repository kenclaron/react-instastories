import React from "react";

import { COMMON } from "../../../shared";

const INITIAL_YEAR = COMMON.createdAt;

export function useCopyright() {
  return React.useMemo(() => {
    const year = new Date().getFullYear();
    const years = Array.from(new Set([INITIAL_YEAR, year]))
      .filter(Boolean)
      .join(" - ");
    return [COMMON.name, years].join(" © ");
  }, []);
}
