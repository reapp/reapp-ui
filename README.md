## About

This is an experiment putting together a react app base.  Batteries included.

- webpack for bundling and development workflow
- react-router to enable isomorphic rendering
- react-style for smart style bundling
- Experiments with flux/immutable data

### Goal

After experimenting here and putting together something that feels nice,
the goal is to extract everything here into packages for ease of use.

#### Data

Put together libraries and helpers for data management. I want an easy way
to use Flux that reduces as much boilerplate code as possible. And to tie
that in with an immutable data library.

- flux (fluxxor)
- immutable (immutable-js, mori, react-cursor)

Finally, overlay the entire system with an optional and configurable sync
layer that handles syncing with a backend API (and create a demo for this).

- swarm
- ...

#### UI

Build a set of components for building application UI's. They should
by default have nice animations, touch support, complete granular reactivity.

- react-responsive
- react-gss
- rebound

On top of that, build out demos for various common things in apps:

- react-forms
- react-time
- autocomplete
- ...

#### Final State

The final state of this application would probably look like a mobile/tablet
TodoMVC style application with a UI toolkit thrown in.

Would be able to live sync state across clients, respond to different screen
sizes and platforms (themeing), and render isomorphically from server.


## Installation

This section comes partly from [react-starter](https://github.com/webpack/react-starter):

Just clone this repo and change the `origin` git remote.

``` text
npm install -g node-dev
npm install
```

## Development server

``` text
npm run dev-server
http://localhost:8080/
```

The configuration is `webpack/dev-server.config.js`.

It automatically recompiles and refreshes the page when files are changed.


## Hot Module Replacement development server

``` text
npm run hot-dev-server
http://localhost:8080/
```

The configuration is `webpack/hot-dev-server.config.js`.

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

The configuration is `webpack/production.config.js`.

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