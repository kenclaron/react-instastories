import {
  usePage,
  usePagesContext,
  useStoriesContext,
  useStory
} from "@react-instastories/base";

/**
 * React Hook to get the current story and page indexes along with a boolean
 * indicating if the current story and page are the ones currently viewed.
 *
 * @returns {object} An object containing:
 * - `current`: A boolean indicating if the current story and page are being viewed.
 * - `story`: The index of the current story.
 * - `page`: The index of the current page.
 *
 * @example
 * const { story, page } = useIndexes();
 * console.debug(story.index); // index of the current story
 * console.debug(story.current); // true or false
 * console.debug(page.index); // index of the current page
 * console.debug(page.current); // true or false
 */
export function useIndexes() {
  const stories = useStoriesContext();
  const pages = usePagesContext();

  const story = useStory();
  const page = usePage();

  return {
    story: {
      current: stories.current === story.index,
      index: story.index
    },
    page: {
      current: stories.current === story.index && pages.current === page.index,
      index: page.index
    }
  };
}

export default useIndexes;
