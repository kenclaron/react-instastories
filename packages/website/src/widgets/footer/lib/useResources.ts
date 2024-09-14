import React from "react";

export function useResources() {
  return React.useMemo(
    () => ({
      links: {
        documentation: "/docs",
        demonstration: "/#",
        showcase: "/#showcase"
      }
    }),
    []
  );
}
