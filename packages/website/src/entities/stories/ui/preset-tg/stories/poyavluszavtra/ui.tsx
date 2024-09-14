import { Link } from "nextra-theme-docs";
import React from "react";

import { COMMON } from "../../../../../../shared";
import { Story } from "../../story";

function PoyavlusZavtra() {
  return (
    <Story
      author="poyavluszavtra"
      createdAt={new Date(COMMON.createdAt, 1, 14)}
      description={
        <>
          <p>
            Get ready for some fresh sounds! We`re have a beat that will elevate
            your playlists. Catch a sneak peek of the track now and let us know
            what you think. Stay tuned for the new releases and get your groove
            on! Media content of poyavluszavtra can be found in the
            documentation.
          </p>
          <p>
            <Link href="https://open.spotify.com/artist/6qhpjoy6wFdgWIYFMwjZvU">
              https://open.spotify.com/artist/6qhpjoy6wFdgWIYFMwjZvU
            </Link>
          </p>
          <p>#poyavluszavtra #music #media</p>
        </>
      }
      hue={90}
      id="poyavluszavtra"
      title="Media Content for documentation provided by poyavluszavtra"
    />
  );
}

export default PoyavlusZavtra;
