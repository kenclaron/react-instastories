import React from "react";

import { type IStory } from "../../../../..";
import Preview from "../../preview/ui";

import Page from "./ui";

const story: IStory = {
  name: "store",
  preview: {
    children: <Preview id="store" title="Store" />
  },
  pages: { children: [{ children: <Page /> }] }
};

export default story;
