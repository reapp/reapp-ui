## About

An experiment assembling an isomorphic React stack for all platforms.

- Webpack, Flux, GSS, react-router, react-style, UI components...

### TODO

- Finish sample HN app and other samples, refactor extensively
- Extract UI components into package
- Extract data management into package
- Extract wrapper app for automating building these styles of apps

## Installation

``` text
npm run install
```

## Development server

Configuration at: `webpack/dev.config.js`

``` text
npm run dev-server
http://localhost:8080/
```

Auto-reloads pages after save and outputs build stats.


## Hot Module Dev Server

Configuration at: `webpack/config.hot.js`

``` text
npm run hot-server
http://localhost:8080/
```

Automatically recompiles files changed. When a hot-replacement-enabled file
is changed the module is hot replaced. If hot replacement not possible, page is refreshed.

Has a performance impact on compilation.

If you get an EMFILE error:

    ulimit -n 10000; npm run hot-server


## Production Server

Configuration at `webpack/config.production.js`

``` text
npm start
http://localhost:8080/
```

Production builds two configurations:

- One for the client (`build/public`)
- One for the server (`build/prerender`)

## Notes

- Use the [analyse tool](http://webpack.github.io/analyse/) with the build stats file
`build/stats.json` to visualize your modules and chunks tree.

## Credits

- React Starter ([react-starter](https://github.com/webpack/react-starter)) for inspiration on the webpack config
- Icons for now from: http://www.pixeden.com/icon-fonts/stroke-7-icon-font-set