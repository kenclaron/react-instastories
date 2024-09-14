import { Configurable, InstaStories, Stories } from "@react-instastories/base";

import "@react-instastories/external/index.css";
import "@react-instastories/presets/ig.css";

import React from "react";

import {
  ReadyViewerContext,
  UserStoriesContext,
  useReadyViewer,
  useUserStories
} from "../../lib";

import configurable from "./configurable";
import { ids, stories } from "./stories";

export function InstagramStories() {
  const readyViewer = useReadyViewer();
  const userStories = useUserStories(ids);

  return (
    <ReadyViewerContext.Provider value={readyViewer}>
      <UserStoriesContext.Provider value={userStories}>
        <InstaStories
          config={{
            animation: "immediately",
            preset: "instastories-preset-ig",
            duration: 5000
          }}
        >
          <Configurable.Container>{configurable}</Configurable.Container>
          <Stories>{stories}</Stories>
        </InstaStories>
      </UserStoriesContext.Provider>
    </ReadyViewerContext.Provider>
  );
}

export default InstagramStories;
