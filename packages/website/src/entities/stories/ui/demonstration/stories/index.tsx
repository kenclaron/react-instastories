import { Page, Pages, Preview, Story } from "@react-instastories/base";

import React from "react";

import Basic from "./basic";
import External from "./external";
import Summary from "./summary";

export const stories = [Summary, Basic, External].map(
  ({ name, story, preview, pages }) => (
    <Story key={name} {...story?.props}>
      <Preview {...preview.props}>{preview.children}</Preview>
      <Pages {...pages.props}>
        {pages.children.map((page, index) => (
          <Page key={index} {...page.props}>
            {page.children}
          </Page>
        ))}
      </Pages>
    </Story>
  )
);

export default stories;
