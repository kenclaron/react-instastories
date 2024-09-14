import { Configurable } from "@react-instastories/base";
import { Controls, Events, Preloadable } from "@react-instastories/external";

import React from "react";

export const configurable = [
  <Configurable.Viewer
    key="viewer"
    events={[
      Events.Mount.Interactive,
      Events.Mount.AutoClose,
      Events.Focus.Timer,
      Events.Keyboard.Close,
      Events.Keyboard.Pages
    ]}
  >
    <Controls.Viewer.Background />
    <Controls.Viewer.Close className="close-button-viewer" />
    <Controls.Stories.Next />
    <Controls.Stories.Previous />
    <Preloadable.Stories unloadable next={1} previous={1} />
    <Preloadable.Pages unloadable next={1} previous={1} />
  </Configurable.Viewer>,
  <Configurable.Story
    key="story"
    events={[
      Events.Pointer.Timer,
      Events.Pointer.Close,
      Events.Pointer.Stories
    ]}
  >
    <Controls.Viewer.Close className="close-button-story" />
    <Controls.Indicator interactive threshold={1000} />
  </Configurable.Story>,
  <Configurable.Page key="page">
    <Controls.Pages.Next />
    <Controls.Pages.Previous />
  </Configurable.Page>
];

export default configurable;
