import React from "react";

import { InstaStoriesContext } from "../hooks/useInstaStories";

/**
 * Hook to access the current config context.
 *
 * @example
 * ```tsx
 * const config = useConfig();
 * ```
 */
export function useConfig() {
  return React.useContext(InstaStoriesContext).config;
}

export default useConfig;
