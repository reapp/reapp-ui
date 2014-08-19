# Reactor Demo App

Demo isomorphic app using [reactor-core](https://github.com/natew/reactor-core) and [React](https://github.com/facebook/react).

**Warning**: This is mostly a playground, I'm breaking things often!

Shows how reactor-core helps simplify putting together the core pieces (async components, pages, routing, pushState). Adds in webpack, bower, and a simple api server to demo some of reacts abilities.

## Installation

    npm run first-run

And start it:

    npm start

And head to [localhost:3111](localhost:3111).

If you get an error regarding EMFILE, this is because browserify is trying to watch too many files for your OS. This is a temporary fix:

    ulimit -n 10000; npm start

## What it does

- Renders app from server, continues app on client
- Routing, Async Page components, pushState
- Super simple API demo
- Cortex to handle data
- Webpack to manage assets

## Todo

- Expore moving to immutable-object
- State handler to post back to API
- Better example components
- 500 pages
- Link component
- Testing
- Forms
- ...

## More Reading

- [React](http://facebook.github.io/react/) - ([NodeConf EU React Intro](https://www.youtube.com/watch?v=x7cQ3mrcKaY), [React + Meteor talk](https://www.youtube.com/watch?v=Lqcs6hPOcFw#t=3001))
- Isomorphic Apps: [blog post](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/), [tutorial app](https://github.com/spikebrehm/isomorphic-tutorial), [scaling by nodejitsu](https://blog.nodejitsu.com/scaling-isomorphic-javascript-code/)
- [Gulp](https://github.com/gulpjs/gulp) to watch and build assets

### Interesting React Projects

- [Dealing with async code in react](https://caurea.org/2014/02/04/dealing-with-asynchronous-code-in-react-components.html)
- [Computation](https://github.com/wereHamster/computation) async data fetching integration with React - [authors writeup](https://caurea.org/2014/02/04/dealing-with-asynchronous-code-in-react-components.html)
- [Avers.js](https://github.com/wereHamster/avers) attempts to be a better M for React
- [Cortex](https://github.com/mquan/cortex) Another react data solution

## License

The MIT License (MIT)

Copyright (c) 2014 Nate Wienert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.