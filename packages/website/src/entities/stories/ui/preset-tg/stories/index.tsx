import { createIds, createStories } from "../../../lib";

import Community from "./community";
import News from "./news";
import PoyavlusZavtra from "./poyavluszavtra";

const LIST = [Community, News, PoyavlusZavtra];

export const ids = createIds(LIST);
export const stories = createStories(LIST);

export default stories;
