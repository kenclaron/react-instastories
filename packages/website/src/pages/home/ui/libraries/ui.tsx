import React from "react";

import { Separator } from "../../../../shared";
import Command from "../command";

import styles from "./styles.module.scss";

export function Libraries() {
  const libraries = [
    "npm install @react-instastories/base",
    "npm install @react-instastories/external",
    "npm install @react-instastories/presets"
  ];

  return (
    <section>
      <Separator as="h2" id="libraries">
        Libraries
      </Separator>
      <ul className={styles["container"]}>
        {libraries.map((library) => (
          <li key={library}>
            <Command
              className="action-item action-item--tertiary nx-h-full"
              content={library}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Libraries;
