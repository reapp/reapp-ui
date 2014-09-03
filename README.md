## Installation

    npm run first-run

And start it:

    npm start

And head to [localhost:3111](localhost:3111).

If you get an error regarding EMFILE, this is because browserify is trying to watch too many files for your OS. This is a temporary fix:

    ulimit -n 10000; npm start