import { Configurable, InstaStories, Stories } from "@react-instastories/base";

import "@react-instastories/external/index.css";
import "@react-instastories/presets/sb.css";

import React from "react";

import { UserStoriesContext, useUserStories } from "../../lib";

import configurable from "./configurable";
import { ids, stories } from "./stories";

export function SberPrimeStories() {
  const userStories = useUserStories(ids);

  return (
    <UserStoriesContext.Provider value={userStories}>
      <InstaStories
        config={{
          animation: "immediately",
          preset: "instastories-preset-sb",
          duration: 15000,
          viewer: { props: { className: "light" } }
        }}
      >
        <Configurable.Container>{configurable}</Configurable.Container>
        <Stories style={{ marginBlockStart: 0 }}>{stories}</Stories>
      </InstaStories>
    </UserStoriesContext.Provider>
  );
}

export default SberPrimeStories;
