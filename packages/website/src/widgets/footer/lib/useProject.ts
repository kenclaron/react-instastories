import { useConfig } from "nextra-theme-docs";
import React from "react";

import pkg from "../../../../package.json";
import { COMMON, useAuthorLinkMailto } from "../../../shared";

export function useProject() {
  const { project } = useConfig();

  const author = useAuthorLinkMailto();

  const codeOfConduct = React.useMemo(
    () => [project.link, COMMON.files.codeOfConduct].join("/"),
    [project.link]
  );

  const readme = React.useMemo(
    () => [project.link, COMMON.files.readme].join("/"),
    [project.link]
  );

  const repository = React.useMemo(() => project.link ?? "", [project.link]);

  return React.useMemo(
    () => ({
      links: {
        author,
        codeOfConduct,
        readme,
        repository
      },
      author: pkg.author
    }),
    [author, codeOfConduct, pkg.author, project.link, readme]
  );
}
