import classNames from "classnames";
import Link from "next/link";
import React from "react";

import { Separator } from "../../../../shared";
import { FEATURES } from "../../model";

import styles from "./styles.module.scss";

interface PossibilityCardProps {
  title: string;
  href: string;
  description: string;
}

function Item({ title, href, description }: PossibilityCardProps) {
  const className = classNames(styles["item"], "interactive");

  return (
    <Link
      aria-description={description}
      aria-disabled={!href}
      aria-label={title}
      className={className}
      href={href}
    >
      <div className="nx-flex nx-justify-between">
        <h2>{title}</h2>
        <span
          aria-label="launch"
          className="material-icons-outlined nx-p-1"
          role="img"
        >
          launch
        </span>
      </div>
      <span>{description}</span>
    </Link>
  );
}

export function Features() {
  return (
    <section>
      <Separator as="h2" id="features">
        Features
      </Separator>

      <ul className={styles["container"]}>
        {FEATURES.map((feature) => (
          <li key={feature.title} className="nx-flex nx-w-full">
            <Item {...feature} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Features;
