import NextImage from "next/image";
import React from "react";

import { getSourceByBasePath } from "../../lib";

export function Image(props: React.ComponentProps<typeof NextImage>) {
  if (typeof props.src !== "string") {
    return <NextImage {...props} />;
  }

  const src = props.src?.startsWith("/")
    ? getSourceByBasePath(props.src)
    : props.src;

  return <NextImage {...props} src={src} />;
}

export default Image;
