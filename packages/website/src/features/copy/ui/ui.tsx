import React from "react";

import { copy } from "../lib";

export interface CopyProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  content?: string;
  onSuccess?: () => void;
  onError?: () => void;
}

export function Copy({
  children,
  content,
  onSuccess,
  onError,
  ...props
}: CopyProps) {
  const ref = React.useRef<HTMLButtonElement>(null);

  const label = React.useMemo(
    () => ["Copy", `"${content}"`].filter(Boolean).join(" "),
    [content]
  );

  const onFinally = React.useCallback(() => ref.current?.blur(), [ref.current]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(() => {
      let text: string;

      if (content) text = content;
      else if (typeof children === "string") text = children;
      else throw new Error(`The "${Copy.name}" has no content to copy.`);

      copy(text).then(onSuccess).catch(onError).finally(onFinally);
    }, [content, children, ref.current, onSuccess, onError, onFinally]);

  return (
    <button ref={ref} aria-label={label} {...props} onClick={handleClick}>
      {children}
    </button>
  );
}

export default Copy;
