import type IStory from "../model";

export function createIds(stories: IStory[]) {
  return stories.map((story) => story.name);
}

export default createIds;
