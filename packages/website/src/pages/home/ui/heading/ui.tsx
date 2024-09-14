import Link from "next/link";
import React from "react";

import CurvedArrow from "../../../../../public/home/curved.svg";
import { Image } from "../../../../shared";
import Accent from "../accent";
import Command from "../command";

import styles from "./styles.module.scss";

export function Heading() {
  return (
    <section className={styles["heading"]}>
      <Accent variant="heading" />
      <Accent variant="demonstration" />

      <h1>Effortlessly Integrate Stories into Your Projects</h1>

      <div className={styles["description"]}>
        React library that makes it easy to embed user and system stories in
        your web applications. Try it out and see for yourself how simple and
        effective it can be to <strong>enhance user experience</strong>.
        <Image
          alt="Curved arrow"
          className={styles["arrow"]}
          height={144}
          src={CurvedArrow}
          width={144}
        />
      </div>

      <ul className={styles["container"]}>
        <li>
          <Link
            className="action-item action-item--primary interactive--force"
            href="/docs"
          >
            <span>Get started</span>
          </Link>
        </li>
        <li>
          <Command
            className="action-item action-item--secondary"
            content="npm install @react-instastories/base"
          />
        </li>
      </ul>
    </section>
  );
}

export default Heading;
