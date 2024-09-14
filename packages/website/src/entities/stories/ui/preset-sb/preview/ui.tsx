import classNames from "classnames";
import React from "react";

import { Image } from "../../../../../shared";
import { useUserStory } from "../../../lib";

import styles from "./styles.module.scss";

interface PreviewProps {
  id: string;
  title: string;
}

function Preview({ id, title }: PreviewProps) {
  const userStory = useUserStory(id);

  const thumnailClassName = classNames(
    styles["thumbnail"],
    userStory?.viewed && styles["thumbnail--viewed"]
  );

  const titleClassName = classNames(
    styles["title"],
    userStory?.viewed && styles["title--viewed"],
    "nx-text-slate-900",
    "dark:nx-text-slate-100"
  );

  return (
    <>
      <picture className={thumnailClassName}>
        <Image
          alt="Icon"
          height={160}
          src={`/stories/sb/${id}.svg`}
          width={160}
        />
      </picture>
      <p className={titleClassName}>{title}</p>
    </>
  );
}

export default Preview;
