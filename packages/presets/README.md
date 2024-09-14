# Stylesheet presets for React Stories Library

> It is linked to the `@react-instastories/base` and `@react-instastories/external` packages in the parent directory for development purposes.

## Shared documentation

The `@react-instastories/presets` uses the base @react-instastories library and expects compatible dev/prod versions to run and deploy. How to use it with the shared library can be found here: [Shared Development Readme](../../README.md#development)

## How to use

```bash
npm install @react-instastories/base @react-instastories/presets
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

import "@react-instastories/base/index.css";
import "@react-instastories/presets/tg.css";

export function AppStoriesWithPreset() {
  return (
    <InstaStories config={{ preset: "instastories-preset-tg" }}>
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
import { AppStoriesWithPreset } from "../path/to/file";

// ... any place for render the component ...
<AppStoriesWithPreset />;
```

## Author

Maintained by [Dmitry Britov](https://github.com/kenclaron)
