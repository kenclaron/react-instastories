import { Configurable } from "@react-instastories/base";
import { Controls, Events, Preloadable } from "@react-instastories/external";

import React from "react";

import * as Telegram from "../custom";

export const configurable = [
  <Configurable.Viewer
    key="viewer"
    events={[
      Events.Keyboard.Close,
      Events.Keyboard.Pages,
      Events.Focus.Timer,
      Events.Mount.AutoClose,
      Telegram.Events.Mount.Ready
    ]}
  >
    <Controls.Viewer.Background />
    <Controls.Viewer.Close />
    <Preloadable.Stories next={Infinity} previous={Infinity} />
  </Configurable.Viewer>,
  <Configurable.Story key="story" events={[Events.Pointer.Timer]}>
    <Controls.Indicator />
    <Controls.Viewer.Close />
  </Configurable.Story>,
  <Configurable.Page key="page" events={[Telegram.Events.Pointer.Pages]} />
];

export default configurable;
