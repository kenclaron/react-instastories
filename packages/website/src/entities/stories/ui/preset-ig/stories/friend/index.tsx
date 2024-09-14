import React from "react";

import { type IStory } from "../../../../..";
import Preview from "../../preview/ui";

import Friend from "./ui";

const story: IStory = {
  name: "friend",
  preview: {
    children: <Preview id="friend" title="Friend" />
  },
  pages: { children: [{ children: <Friend /> }] }
};

export default story;
