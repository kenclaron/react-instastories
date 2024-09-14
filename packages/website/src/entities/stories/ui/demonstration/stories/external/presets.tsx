import { Link } from "nextra-theme-docs";
import React from "react";

import { Card, Preview } from "../../components";

function Presets() {
  return (
    <Preview hue={3} textProps={{ style: { height: "100%" } }}>
      <div style={{ flexGrow: 1 }} />
      <Card>
        <p>
          <strong>@react-instastories/presets</strong>
        </p>
      </Card>
      <Card>
        <p>
          Library supports usage of presets so that you can create the most
          unique stories instead of using ui/ux solutions. You can use it based
          on existing presets, or create everything from scratch.
        </p>
      </Card>
      <Card>
        <p>
          <Link href="/docs/install"> #install </Link>
          <Link href="/docs/presets/how-to-create"> #create </Link>
          <Link href="/docs/presets/how-to-use"> #use </Link>
        </p>
      </Card>
    </Preview>
  );
}

export default Presets;
