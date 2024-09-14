import React from "react";

import { type IStory } from "../../../../..";
import Preview from "../../preview/ui";

import PoyavlusZavtra from "./ui";

const story: IStory = {
  name: "poyavluszavtra",
  preview: {
    children: <Preview id="poyavluszavtra" title="poyavluszavtra" />
  },
  pages: { children: [{ children: <PoyavlusZavtra /> }] }
};

export default story;
