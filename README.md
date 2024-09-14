# React Stories Library

> The next generation of React Stories Library.

![Effortlessly Integrate Stories into Your Projects. React library that makes it easy to embed user and system stories in your web applications. Try it out and see for yourself how simple and effective it can be to enhance user experience.](./.docs/preview.jpg)

## Features

- Zero dependency React library;
- Customizable Stories Content;
- Small library gzip-size;
- Fast implementation in exists React projects;
- Huge possibility of customization (External Components Integration, Presets).

## How to use

You can install all `react-instastories` libraries:

```bash
npm install @react-instastories/base @react-instastories/external @react-instastories/presets
```

Import and create your first `InstaStories` component:

```tsx
// file.tsx
import {
  InstaStories,
  Page,
  Pages,
  Preview,
  Stories,
  Story
} from "@react-instastories/base";

import "@react-instastories/base/index.css";

export function AppStories() {
  return (
    <InstaStories>
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
import { AppStories } from "../path/to/file";

// ... any place for render the component ...
<AppStories />;
```

### Base

You can install only necessary components, hooks, models:

```bash
npm install @react-instastories/base
```

### External

You can install library with custom components, events, hooks:

```bash
npm install @react-instastories/base @react-instastories/external
```

### Presets

You can install library with presets of customization:

```bash
npm install @react-instastories/base @react-instastories/presets
```

## Development

> Development with this package requires a [Node.js](https://nodejs.org/) v18.18 or above.

### Download repository

```bash
git clone https://github.com/kenclaron/react-instastories.git
cd ./react-instastories
```

### Install dependencies

```bash
# Install dependencies for all microfront-ends (preferred)
npm install
```

```bash
# Or install dependencies for separated microfront-ends
npm install --ignore-scripts  # install only shared dependencies
npm run install:base          # install dependencies for "packages/base"
npm run install:presets       # install dependencies for "packages/presets"
npm run install:external      # install dependencies for "packages/external"
npm run install:website       # install dependencies for "packages/website"
```

### Start development environment

```bash
# Start all microfront-ends (preferred)
npm start
```

> In some cases, the `packages/external` builds faster than the `packages/base` and causes error. If you encounter this problem, try running the processes separately:

```bash
# Or start separated front-ends
npm run start:base     # starts "packages/base"
npm run start:presets  # starts "packages/presets"
npm run start:external # starts "packages/external"
npm run start:website  # starts "packages/website"
```

> `packages/website` starts on `http://localhost:3000` by default.

### Launch tests and autofixes

```bash
# Launch all tests (preferred)
npm test
```

```bash
# Or launch separated tests
npm run test:lint      # launches eslint
npm run test:prettier  # launches prettier
npm run test:stylelint # launches stylelint
```

### Build library

```bash
# Launch full build process (preferred)
npm run build
```

```bash
# Or launch separated build processes
npm run build:base     # builds "packages/base"
npm run build:presets  # builds "packages/presets"
npm run build:external # builds "packages/external"
npm run build:website  # builds "packages/website"
```

> Build results are in `dist` folders of packages.

### Serve website

> Requires builded website in `dist` folder.

```bash
npm run serve:website  # serves "packages/website"
```

### How to use with oldest React?

> Some functions may stop working when using the library with older versions of `react`. Please note that the potentially minimum supported version of `react` and `react-dom` is **16.14.0**.

If you need to use this library with lower versions of `react`/`react-dom`, you can add the following parameter in your project's `package.json` file:

```json
"overrides": {
    "@react-instastories/base": {
      "react": "$react",
      "react-dom": "$react-dom",
    }
}
```

or specify the required version of the libraries instead of `$react` and `$react-dom` (for example, if you are not using these libraries directly)

```json
"overrides": {
    "@react-instastories/base": {
      "react": "~16.14.0",
      "react-dom": "~16.14.0",
    }
}
```

## Author

Maintained by [Dmitry Britov](https://github.com/kenclaron)
