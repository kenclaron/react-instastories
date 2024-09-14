import { usePagesContext, useViewerContext } from "@react-instastories/base";

import React from "react";

import { Card, Preview } from "../../components";

function Customization() {
  const pages = usePagesContext();
  const viewer = useViewerContext();
  const waiting = React.useRef(false);

  const handleClick = React.useCallback(() => {
    viewer.close();
    waiting.current = true;
  }, [viewer.close]);

  React.useEffect(() => {
    return () => {
      if (!waiting.current) return;

      window.location.hash = "";
      window.location.hash = "showcase";
    };
  }, []);

  return (
    <Preview hue={3} textProps={{ style: { height: "100%" } }}>
      <Card>
        <h1>Configuration & Presets</h1>
      </Card>
      <Card>
        <p>
          Did you know that buttons at the bottom of this story is a custom
          component working with library page context?
        </p>
      </Card>
      <div style={{ flexGrow: 1 }} />
      <Card>
        <p>
          Empower your creativity with library! Explore seamless configuration,
          limitless customization, and powerful presets from{" "}
          <strong>@react-instastories/presets</strong>
        </p>
      </Card>
      <Card>
        <p>
          If you need to quickly obtain prepared components, you can use the{" "}
          <strong>@react-instastories/external</strong>.
        </p>
      </Card>
      <ul className="nx-mt-4">
        <li>
          <button
            className="nx-block nx-w-full nx-text-center action-item action-item--secondary interactive--force"
            onClick={handleClick}
          >
            I want to see presets...
          </button>
        </li>
        <li>
          <button
            className="nx-block nx-w-full nx-text-center action-item action-item--primary interactive--force"
            onClick={() => pages.next()}
          >
            Go to @react-instastories/external...
          </button>
        </li>
      </ul>
    </Preview>
  );
}

export default Customization;
