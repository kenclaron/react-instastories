import classNames from "classnames";
import React from "react";

import { Copy, CopyProps } from "../../../../features";

import styles from "./styles.module.scss";

const enum CopyIcon {
  DONE = "done",
  ERROR = "error",
  NEUTRAL = "content_copy"
}

const TIMEOUT = 1000;

export function Command({
  content,
  className: classNameCommand
}: Pick<CopyProps, "content" | "className">) {
  const [icon, setIcon] = React.useState(CopyIcon.NEUTRAL);
  const timeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const statusClassName = React.useMemo(() => {
    switch (icon) {
      case CopyIcon.DONE:
        return styles["action-copy--success"];
      case CopyIcon.ERROR:
        return styles["action-copy--error"];
      default:
        return undefined;
    }
  }, [icon]);

  const onCopy = React.useCallback((status: CopyIcon.DONE | CopyIcon.ERROR) => {
    setIcon(status);

    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => setIcon(CopyIcon.NEUTRAL), TIMEOUT);
  }, []);

  const handleSuccess = React.useCallback(
    () => onCopy(CopyIcon.DONE),
    [onCopy]
  );

  const handleError = React.useCallback(() => onCopy(CopyIcon.ERROR), [onCopy]);

  const className = classNames(
    classNameCommand,
    styles["action-copy"],
    statusClassName,
    "nx-flex nx-gap-2 nx-text-left interactive"
  );

  return (
    <Copy
      className={className}
      content={content}
      title="Copy"
      onError={handleError}
      onSuccess={handleSuccess}
    >
      <span
        aria-label={icon}
        className={[styles["icon"], "material-icons-outlined"].join(" ")}
        role="img"
      >
        {icon}
      </span>{" "}
      <span>{content}</span>
    </Copy>
  );
}

export default Command;
