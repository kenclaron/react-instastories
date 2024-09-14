# External components for React Stories Library

> It is linked to the `@react-instastories/base` package in the parent directory for development purposes.

## Shared documentation

The `@react-instastories/external` uses the base @react-instastories library and expects compatible dev/prod versions to run and deploy. How to use it with the shared library can be found here: [Shared Development Readme](../../README.md#development)

## How to use

```bash
npm install @react-instastories/base @react-instastories/external
```

Import and create your first `InstaStories` component:

```tsx
// file.tsx
import {
  Configurable,
  InstaStories,
  Page,
  Pages,
  Preview,
  Stories,
  Story
} from "@react-instastories/base";
import { Controls, Events, Preloadable } from "@react-instastories/external";

import "@react-instastories/base/index.css";
import "@react-instastories/external/index.css";

export function AppStoriesWithExternal() {
  return (
    <InstaStories>
      <Configurable.Container>
        <Configurable.Viewer
          events={[
            Events.Mount.AutoClose,
            Events.Mount.Interactive,
            Events.Focus.Timer,
            Events.Keyboard.Close,
            Events.Keyboard.Stories
          ]}
        >
          <Controls.Viewer.Background />
          <Controls.Viewer.Close />
          <Controls.Stories.Next />
          <Controls.Stories.Previous />
          <Preloadable.Stories unloadable next={1} previous={1} />
          <Preloadable.Pages unloadable next={1} previous={1} />
        </Configurable.Viewer>
      </Configurable.Container>
      <Stories>
        <Story>
          <Preview>Preview Content For Story #1</Preview>
          <Pages>
            <Page>Page Content For Page #1 in Story #1</Page>
          </Pages>
        </Story>
      </Stories>
    </InstaStories>
  );
}
```

```tsx
// any-component.tsx
import { AppStoriesWithExternal } from "../path/to/file";

// ... any place for render the component ...
<AppStoriesWithExternal />;
```

## Author

Maintained by [Dmitry Britov](https://github.com/kenclaron)
