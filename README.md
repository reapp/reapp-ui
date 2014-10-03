## About

This is an experiment putting together a react app base.  Batteries included.

- webpack for bundling and development workflow
- react-router to enable isomorphic rendering
- react-style for smart style bundling
- react-cursor for immutable data

### Goal

After experimenting here and putting together something that feels nice,
the goal is to extract everything here into a separate node package that
will act as a higher layer. Bundle with a CLI and good docs so it's really
easy to get a full-featured react app going.

### TODO

- flux (fluxxor, fb-flux)
- gss for layouts with responsive solution
- data sync solution (swarm or similar)
- various helper components for building UIs
- various libraries for doing common react stuff
- react-forms
- react-time
- ...

## Installation

This section comes from [react-starter](https://github.com/webpack/react-starter):

Just clone this repo and change the `origin` git remote.

``` text
npm install
```


## Development server

``` text
npm run dev-server
http://localhost:2992/
```

The configuration is `webpack-dev-server.config.js`.

Static HTML is served from `config/dev-server-public`.

It automatically recompiles and refreshes the page when files are changed.


## Hot Module Replacement development server

``` text
npm run hot-dev-server
http://localhost:2992/
```

The configuration is `webpack-hot-dev-server.config.js`.

Static HTML is served from `config/dev-server-public`.

It automatically recompiles when files are changed. When a hot-replacement-enabled file is changed (i. e. stylesheets or React components) the module is hot-replaced. If Hot Replacement is not possible the page is refreshed.

Hot Module Replacement has a performance impact on compilation.

If you get an error EMFILE, run this:

    ulimit -n 10000; npm start


## Production compilation and server

``` text
npm run build
npm start
http://localhost:8080/
```

The configuration is `webpack-production.config.js`.

The server is at `lib/server.js`

The production setting builds two configurations: one for the client (`build/public`) and one for the serverside prerendering (`build/prerender`).

> WIP: Serverside data fetching and embedding data into served HTML.


## Build visualization

After a production build you may want to visualize you modules and chunks tree.

Use the [analyse tool](http://webpack.github.io/analyse/) with the file at `build/stats.json`.

## Loaders and file types

Many file types are preconfigured, but not every loader is installed. If you get an error like `Cannot find module "xxx-loader"`, you'll need to install the loader with `npm install xxx-loader --save` and restart the compilation.

## License

Copyright (c) 2012-2014 Tobias Koppers Gittip donate button

MIT (http://www.opensource.org/licenses/mit-license.php)

