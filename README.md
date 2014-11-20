A series of small react libraries pieced together into a cohesive and well-behaved app.

Uses webpack + mach to serve.

Immutable for data structures.

Fynx for implementing Flux with immutable data structures.

Omniscient for components that automatically support immutable data.

react-router for routes, react-style for styles.

UI toolkit for app development.

#### Todo

- Finish sample HN app and other samples, refactor extensively
- Extract wrapper app for automating building these styles of apps

### Installation

``` text
npm run install
```

### Development server

Auto-reloads pages after save and outputs build stats.
Configuration at: `webpack/dev.config.js`.

``` text
npm run dev-server
http://localhost:8080/
```


### Hot Module Dev Server

Automatically recompiles files changed. When a hot-replacement-enabled file
is changed the module is hot replaced. If hot replacement not possible, page is refreshed.
Configuration at: `webpack/config.hot.js`.

``` text
npm run hot-server
http://localhost:8080/
```

If you get an EMFILE error:

    ulimit -n 10000; npm run hot-server


### Production Server

Production builds two configurations, one for the client (`build/public`) and one for the server (`build/prerender`).
Renders isomorphically. Configuration at `webpack/config.production.js`.

``` text
npm start
http://localhost:8080/
```

## Notes

- Use the [analyse tool](http://webpack.github.io/analyse/) with the build stats file
`build/stats.json` to visualize your modules and chunks tree.

## Credits

- React Starter ([react-starter](https://github.com/webpack/react-starter)) for inspiration on the webpack config
- Icons for now from: http://www.pixeden.com/icon-fonts/stroke-7-icon-font-set