import { Link } from "nextra-theme-docs";
import React from "react";

import { COMMON } from "../../../../../../shared";
import { Story } from "../../story";

function Girlfriend() {
  return (
    <Story
      author="Girlfriend"
      createdAt={new Date(COMMON.createdAt, 1, 21)}
      description={
        <>
          <p>
            I love <Link href="https://github.com/kenclaron">@kenclaron</Link>
          </p>
          <p>{"❤️❤️❤️❤️❤️❤️❤️❤️❤️"}</p>
          <p>{"❤️❤️❤️❤️❤️❤️❤️❤️❤️"}</p>
          <p>{"❤️❤️❤️❤️❤️❤️❤️❤️❤️"}</p>
        </>
      }
      hue={90}
      id="girlfriend"
      title="I remind everyone!"
    />
  );
}

export default Girlfriend;
