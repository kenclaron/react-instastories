import { Link, useConfig } from "nextra-theme-docs";
import React from "react";

interface SourceLinkProps extends React.PropsWithChildren {
  path: string;
}

export function SourceLink({ children, path }: SourceLinkProps) {
  const { project } = useConfig();

  return (
    <Link className="nx-inline-flex" href={[project.link, path].join("")}>
      {children}
    </Link>
  );
}

export default SourceLink;
