import { createIds, createStories } from "../../../lib";

import Health from "./health";
import Hotel from "./hotel";
import Library from "./library";

const LIST = [Health, Hotel, Library];

export const ids = createIds(LIST);
export const stories = createStories(LIST);

export default stories;
