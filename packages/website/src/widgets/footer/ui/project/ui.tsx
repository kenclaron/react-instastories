import { Link } from "nextra-theme-docs";
import React from "react";

import { useProject } from "../../lib";

export function Project() {
  const project = useProject();

  return (
    <div>
      <h3>Project</h3>
      <ul>
        <li>
          <Link href={project.links.repository}>Repository</Link>
        </li>
        <li>
          <Link href={project.links.readme}>Readme</Link>
        </li>
        <li>
          <Link href={project.links.codeOfConduct}>Code of conduct</Link>
        </li>
      </ul>
    </div>
  );
}

export default Project;
