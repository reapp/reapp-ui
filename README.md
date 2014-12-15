A series of small react libraries pieced together into a cohesive and well-behaved app.

Each piece has been researched, considered, compared, tested, and replaced as necessary.
As the app has grown there have been new libraries and interesting and nicely compatable
libraries that have influenced decisions.

There are a few basic choices that have influenced many of the libraries used. First, data.

I've chosen to use immutable data for the stores and views, and there are many reasons
why, that are explained very well in other places. Basically, immutable data gives us
performance, safety in our view modifications and history.

Now, with immutable data you actually don't *need* flux. But, for any more than basic app
you'll want a better way to deal with actions. Flux still helps with this, but it's complex.
After trying out [Fluxxor]() and [Reflux](), as well as rolling a few interfaces on top of them,
I ended up finding and falling in love with the simplicity of [Fynx](). Fynx works with immutable data,
and is a tiny, easy to read and understand implementation of Flux. Really, it's just a way to
define actions, chain them, and organize your immutable data into one place. It's really nice.

With Fynx and Immutable you have a great base for immutable data. In order to take full
advantage of their speed, I've added a global mixin through a decorator that speeds up React
with immutable data. It comes from the excellent [Omniscient](https://github.com/omniscientjs/omniscient) library,
but we are just using the shouldComponentUpdate mixin. All it does it check your props for cursors,
and figures out whether they need to update.

One thing you'll want with Fynx is a good way to fetch data. The nice thing about Flux/Fynx
actions is that they work really well with promises. And, you'll be wanting a request library.
After a long time using [rest]() (requests) with [when]() (promises) to great effect, I ended
up substituting it for [httpinvoke]() with [bluebird](). Why? Honestly, both libraries are great.
Bluebird and invoke are both slightly more popular though, and the also aren't coupled like when
and rest. So, you can swap them out independently without affecting your bundle size.

Ok, so what do we have now?

- Structures with immutable
- Data and actions with Fynx
- shouldComponentUpdate from Omniscient
- Requests from httpinvoke
- Promises from bluebird

It's starting to shape up!

From here it was time to start looking into the actual React side of things. A few of the
smaller pieces:

- [react-router]() because it's got some great backers and a nice implementation
- [react-tap-event-plugin]() just to add in quick click support

Finally, we get to the reapp UI pieces. reapp

- [react-style]() for javascript based styles
- [react-tween-state]() to help with the animation library

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