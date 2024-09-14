import React from "react";

import Icon from "../../../../public/icon.svg";
import { COMMON, Image } from "../../../shared";

import styles from "./styles.module.scss";

export function Logo() {
  return (
    <>
      <Image priority alt="Icon" className={styles["icon"]} src={Icon} />
      <h1 id="project-name">{COMMON.name}</h1>
    </>
  );
}
