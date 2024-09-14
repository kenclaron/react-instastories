import { Link } from "nextra-theme-docs";
import React from "react";

import { Card, Preview } from "../../components";

function Events() {
  return (
    <Preview hue={1} textProps={{ style: { height: "100%" } }}>
      <div style={{ flexGrow: 1 }} />
      <Card>
        <p>
          <strong>@react-instastories/external</strong>
        </p>
      </Card>
      <Card>
        <p>
          You can also create and use events that are compatible with the
          library. For example, right now you can try moving the story left or
          right by clicking and dragging it left and right. If you get tired of
          reading it, you can press the Escape key to close the viewer, or click
          on the story, move it down, and release it. Possibilities are not
          limited by the mind.
        </p>
      </Card>
      <Card>
        <p>
          <Link href="/docs/external/events"> #events </Link>
          <Link href="/docs/external/hooks/interactive"> #interactive </Link>
          <Link href="/docs/base/models/event"> #model </Link>
          <Link href="/docs/base/contets/viewer"> #viewercontext </Link>
        </p>
      </Card>
    </Preview>
  );
}

export default Events;
