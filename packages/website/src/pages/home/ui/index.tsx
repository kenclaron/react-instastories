import React from "react";

import { DemonstrationStories } from "../../../entities";

import Features from "./features";
import Heading from "./heading";
import Libraries from "./libraries";
import Outside from "./outside";
import Presets from "./presets";

export function HomePage() {
  return (
    <div id="home">
      <Outside />
      <Heading />
      <DemonstrationStories />
      <Features />
      <Presets />
      <Libraries />
    </div>
  );
}

export default HomePage;
