import React from "react";

import { type IStory } from "../../../../..";
import Preview from "../../preview/ui";

import Page from "./ui";

const story: IStory = {
  name: "hotel",
  preview: {
    children: <Preview id="hotel" title="A hotel you don't want to leave" />
  },
  pages: { children: [{ children: <Page /> }] }
};

export default story;
