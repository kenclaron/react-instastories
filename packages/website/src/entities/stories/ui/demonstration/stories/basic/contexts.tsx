import { usePagesContext, useViewerContext } from "@react-instastories/base";

import React from "react";

import { Card, Preview } from "../../components";

function Contexts() {
  const pages = usePagesContext();
  const viewer = useViewerContext();

  return (
    <Preview hue={2} textProps={{ style: { height: "100%" } }}>
      <Card>
        <h1>Contexts?</h1>
      </Card>
      <div style={{ flexGrow: 1 }} />
      <Card>
        <p>
          <strong>PagesContext</strong>, <strong>StoriesContext</strong>,{" "}
          <strong>ViewerContext</strong> — each unveils unique capabilities for
          creating interactive stories in your projects. Immerse yourself in the
          realm of flexibility and data management with{" "}
          <strong>@react-instastories/base</strong> library, where each context
          brings new discoveries.
        </p>
      </Card>
      <ul className="nx-mt-4">
        <li>
          <button
            className="nx-block nx-w-full nx-text-center action-item action-item--secondary interactive--force"
            onClick={() => viewer.close()}
          >
            I&apos;ve had enough... Close!
          </button>
        </li>
        <li>
          <button
            className="nx-block nx-w-full nx-text-center action-item action-item--primary interactive--force"
            onClick={() => pages.next()}
          >
            Now I can create anything I want!
          </button>
        </li>
      </ul>
    </Preview>
  );
}

export default Contexts;
