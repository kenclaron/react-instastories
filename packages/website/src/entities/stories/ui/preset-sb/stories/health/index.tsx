import React from "react";

import { type IStory } from "../../../../..";
import Preview from "../../preview/ui";

import Page from "./ui";

const story: IStory = {
  name: "health",
  preview: {
    children: (
      <Preview id="health" title="Take care of your health at any time" />
    )
  },
  pages: { children: [{ children: <Page /> }] }
};

export default story;
