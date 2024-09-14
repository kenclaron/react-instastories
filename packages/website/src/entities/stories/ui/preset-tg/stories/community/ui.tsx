import { Link } from "nextra-theme-docs";
import React from "react";

import { COMMON } from "../../../../../../shared";
import { Story } from "../../story";

function Community() {
  return (
    <Story
      author="Community"
      createdAt={new Date(COMMON.createdAt, 1, 21)}
      description={
        <>
          <p>
            Join our club and dive into engaging discussions! Each month, we
            host meetups, and share our thoughts. See how we spend our time
            together and don`t miss out on becoming part of a friendly
            community!
          </p>
          <p>
            Documentation 👉{" "}
            <Link href="/docs">{`${location.origin}/docs`}</Link>
          </p>
          <p>#react-instastories #docs #link</p>
        </>
      }
      grayscale={1}
      id="community"
      title="Vibes at Our Public Community"
    />
  );
}

export default Community;
