import { useStoriesContext } from "@react-instastories/base";

import { Link } from "nextra-theme-docs";
import React from "react";

import { COMMON } from "../../../../../../shared";
import { Story } from "../../story";

function Friend() {
  const stories = useStoriesContext();

  return (
    <Story
      author="Friend"
      createdAt={new Date(COMMON.createdAt, 1, 14)}
      description={
        <>
          Thanks a lot to all my friends for their support! We opened a designer
          clothing store together! Everyone who orders our T-shirts this week
          will receive a 51% discount. We are waiting for you in the our{" "}
          <Link style={{ cursor: "pointer" }} onClick={() => stories.show(2)}>
            @store
          </Link>{" "}
          profile.
        </>
      }
      hue={20}
      id="friend"
      title="We've opened our own store!"
    />
  );
}

export default Friend;
