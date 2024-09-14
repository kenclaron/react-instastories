import { PageProps, StoryProps } from "@react-instastories/base/components";

export interface PreloadableProps {
  /**
   * The number of items to preload ahead of the current item.
   */
  readonly next: number;
  /**
   * The number of items to preload behind the current item.
   */
  readonly previous: number;
  /**
   * A flag indicating whether the item can be unloaded.
   */
  readonly unloadable?: boolean;
}

export const PRELOAD_PROPS: Partial<PageProps | StoryProps> = { preload: true };
export const NOT_PRELOAD_PROPS: Partial<PageProps | StoryProps> = {
  preload: false
};
