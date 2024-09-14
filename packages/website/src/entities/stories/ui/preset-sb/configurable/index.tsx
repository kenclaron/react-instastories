import { Configurable } from "@react-instastories/base";
import { Controls, Events } from "@react-instastories/external";

import React from "react";

import * as SberPrime from "../custom";

export const configurable = [
  <Configurable.Viewer key="viewer" events={[Events.Mount.AutoClose]}>
    <Controls.Viewer.Background />
    <Controls.Viewer.Close />
    <SberPrime.Controls.Stories.Next />
    <SberPrime.Controls.Stories.Previous />
  </Configurable.Viewer>,
  <Configurable.Story
    key="story"
    events={[Events.Pointer.Timer, SberPrime.Events.Pointer.Pages]}
  >
    <Controls.Indicator />
  </Configurable.Story>
];

export default configurable;
