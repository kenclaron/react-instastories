import { Link, useConfig } from "nextra-theme-docs";
import React from "react";

interface SourceLinkProps extends React.PropsWithChildren {
  path: string;
}

export function SourceLink({ children, path }: SourceLinkProps) {
  const { project } = useConfig();
  const href = React.useMemo(
    () =>
      [project.link, "/tree/", process.env.NEXT_PUBLIC_BRANCH_NAME, path].join(
        ""
      ),
    [project.link, path]
  );

  return (
    <Link className="nx-inline-flex" href={href}>
      <>{children}</>
    </Link>
  );
}

export default SourceLink;
