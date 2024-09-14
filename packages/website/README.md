# Demonstration website for react-instastories library with documentation

> It is linked to the `@react-instastories/base`, `@react-instastories/external` and `@react-instastories/presets` packages in the parent directory for development purposes.

> Unlike the main npm libraries, when creating a website with documentation and demonstration of features, developers can use various experimental features of browsers, HTML/CSS/JavaScript-specs, or etc with warning indication or fallback features. In this project you can use different \*-alpha, \*-beta, \*-rc libraries if it is really necessary.

## Development

The website uses the base @react-instastories library and expects compatible dev/prod versions to run and deploy. How to use it with the shared library can be found here: [Shared Development Readme](../../README.md#development)

When using the npm commands below, make sure you run it from the `packages/website` folder, not the main repository folder (otherwise, use the library's `README.md` above):

### Install dependencies

```bash
npm install
```

### Start development website

```bash
npm run dev
```

### Build website

```bash
npm run build
```

### Serve website

> Requires builded website in `out` folder.

```bash
npm start
```

## License

Sorry, but `packages/website` is not under any public license at this time. You can interact with and make changes to this package and do other actions that are allowed by the git-platform where this package is officially hosted. Full use of this package outside the react-instastories repository may be limited. If you need to edit and publish this package outside the react-instastories repository, contact the author from the [package.json file](./package.json)

## Author

Maintained by [Dmitry Britov](https://github.com/kenclaron)
