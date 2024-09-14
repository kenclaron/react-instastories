import { Configurable } from "@react-instastories/base";
import { Controls, Events, Preloadable } from "@react-instastories/external";

import React from "react";

import * as Instagram from "../custom";

export const configurable = [
  <Configurable.Viewer
    key="viewer"
    events={[
      Events.Keyboard.Close,
      Events.Keyboard.Stories,
      Events.Keyboard.Pages,
      Events.Focus.Timer,
      Events.Mount.AutoClose,
      Instagram.Events.Mount.Ready
    ]}
  >
    <Controls.Viewer.Close />
    <Preloadable.Stories next={Infinity} previous={Infinity} />
  </Configurable.Viewer>,
  <Configurable.Story
    key="story"
    events={[Events.Pointer.Timer, Instagram.Events.Pointer.Pages]}
  >
    <Instagram.Controls.Pages.Next />
    <Instagram.Controls.Pages.Previous />
    <Controls.Indicator />
  </Configurable.Story>,
  <Configurable.Page key="page">
    <Controls.Viewer.Close />
  </Configurable.Page>
];

export default configurable;
