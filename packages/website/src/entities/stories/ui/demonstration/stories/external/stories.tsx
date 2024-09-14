import { Link } from "nextra-theme-docs";
import React from "react";

import { Card, Preview } from "../../components";

function Stories() {
  return (
    <Preview hue={2} textProps={{ style: { height: "100%" } }}>
      <div
        className="skeleton dark nx-w-full nx-absolute nx-top-0 nx-left-0 nx-h-7"
        style={{ marginInlineStart: "-2em", position: "absolute" }}
      />
      <div style={{ flexGrow: 1 }} />
      <Card>
        <p>
          <strong>@react-instastories/external</strong>
        </p>
      </Card>
      <Card>
        <p>
          The library allows you to add the same components at different nesting
          levels without having to redefine them in each story or page. The
          library has 3 configurable levels: Viewer, Story, Page. This is
          necessary in cases where you need to use components in all stories and
          pages, regardless of their content.
        </p>
      </Card>
      <Card>
        <p>
          For example, right now you see at the top a component displaying
          pages, a timer for current page - this is a component at the Story
          configurable level.
        </p>
      </Card>
      <Card>
        <p>
          <Link href="/docs/external/controls/indicator">#indicator</Link>
          <Link href="/docs/base/configurable"> #configurable </Link>
          <Link href="/docs/base/story"> #story </Link>
          <Link href="/docs/base/contexts/timer">#timer</Link>
        </p>
      </Card>
    </Preview>
  );
}

export default Stories;
