import { createIds, createStories } from "../../../lib";

import Friend from "./friend";
import Girlfriend from "./girlfriend";
import Store from "./store";

const LIST = [Friend, Girlfriend, Store];

export const ids = createIds(LIST);
export const stories = createStories(LIST);

export default stories;
