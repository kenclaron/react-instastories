import { Page, Pages, Preview, Story } from "@react-instastories/base";

import React from "react";

import type IStory from "../model";

export function createStories(stories: IStory[]) {
  return stories.map(({ name, story, preview, pages }) => {
    return (
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
    );
  });
}

export default createStories;
