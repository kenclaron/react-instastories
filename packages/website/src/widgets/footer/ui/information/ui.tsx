import { Link, ThemeSwitch } from "nextra-theme-docs";
import React from "react";

import { useCopyright, useProject, useShowThemeSwitch } from "../../lib";

export function Information() {
  const project = useProject();
  const copyright = useCopyright();
  const showThemeSwitch = useShowThemeSwitch();

  return (
    <div>
      <h3>{copyright}</h3>
      <ul>
        <li>
          <span>
            Maintained by{" "}
            <Link href={project.links.author} tabIndex={0}>
              {project.author.name}
            </Link>
          </span>
        </li>
        {showThemeSwitch && (
          <li>
            <ThemeSwitch className="nx-mt-2" />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Information;
