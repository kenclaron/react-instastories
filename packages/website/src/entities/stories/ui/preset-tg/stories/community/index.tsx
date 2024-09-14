import React from "react";

import { type IStory } from "../../../../..";
import Preview from "../../preview/ui";

import Page from "./ui";

const story: IStory = {
  name: "community",
  preview: {
    children: <Preview id="community" title="Community" />
  },
  pages: { children: [{ children: <Page /> }] }
};

export default story;
