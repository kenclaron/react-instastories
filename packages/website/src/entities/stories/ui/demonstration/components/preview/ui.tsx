import React from "react";

import { Gradient } from "../gradient";
import { Icon } from "../icon";
import { TextContent } from "../text-content";

export function Preview({
  children,
  hue,
  icon,
  textProps
}: React.PropsWithChildren<{
  hue?: number;
  icon?: string;
  textProps?: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;
}>) {
  return (
    <>
      <Gradient hue={hue} />
      {icon && <Icon name={icon} />}
      <TextContent {...textProps}>{children}</TextContent>
    </>
  );
}

export default Preview;
