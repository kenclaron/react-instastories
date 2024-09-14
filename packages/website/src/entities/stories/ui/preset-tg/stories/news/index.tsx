import React from "react";

import { type IStory } from "../../../../..";
import Preview from "../../preview/ui";

import Page from "./ui";

const story: IStory = {
  name: "news",
  preview: {
    children: <Preview id="news" title="News" />
  },
  pages: { children: [{ children: <Page /> }] }
};

export default story;
