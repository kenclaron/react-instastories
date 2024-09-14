import React from "react";

import { type IStory } from "../../../../..";
import Preview from "../../preview/ui";

import Page from "./ui";

const story: IStory = {
  name: "girlfriend",
  preview: {
    children: <Preview id="girlfriend" title="Girlfriend" />
  },
  pages: { children: [{ children: <Page /> }] }
};

export default story;
