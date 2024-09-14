import React from "react";

import { type IStory } from "../../../../..";
import Preview from "../../preview/ui";

import Library from "./ui";

const story: IStory = {
  name: "library",
  preview: {
    children: <Preview id="library" title="More about this library" />
  },
  pages: { children: [{ children: <Library /> }] }
};

export default story;
