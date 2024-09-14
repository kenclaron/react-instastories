import { Link } from "nextra-theme-docs";
import React from "react";

import { useResources } from "../../lib";

export function Resources() {
  const resources = useResources();

  return (
    <div>
      <h3>Resources</h3>
      <ul>
        <li>
          <Link href={resources.links.documentation}>Documentation</Link>
        </li>
        <li>
          <Link href={resources.links.demonstration}>Demonstration</Link>
        </li>
        <li>
          <Link href={resources.links.showcase}>Showcase</Link>
        </li>
      </ul>
    </div>
  );
}

export default Resources;
