# Money Saver

This web application helps me to manage my everyday expenses. 

## Getting Started

You need to have installed [**Node.js**](https://nodejs.org/en/).

No database server is required.

To launch the application for the first time, you shall clone it to your PC:

```bash
git clone --recurse https://github.com/idenisovs/money-saver.git backend
```

Then, go inside and run the following commands:

```bash
npm run setup
npm start
```

From now, web application should be accessible by passing the following link: [http://localhost:9001](http://localhost:9001)

Default user login is `user1` with password `demo1`.

By default it is listening the port `9001`. You can change it in `Source/config.json` file.

## The reason of project

Because I wanted to get new skills and gather some more experience with development of web applications by using the technologies like **Node.js**.

## CLI syntax

In the Source directory:

```
Usage: node daemon.js [options]
-p, --port - select the port to listen;
-b, --database - give a path to the database;
-v, --verbose - run in verbose mode (by default, it will run with INFO loglevel;
-d, --debug - add some verbosity to output by setting loglevel to DEBUG;
-t, --trace - set loglevel to TRACE, extra verbosity;
--testable - run application in testable mode.
-h - show help;

As example:
node daemon.js -vd -p 8000 - will run application in verbose mode with DEBUG loglevel on port 8000;
```

**Note**: _testable_ mode means that application will use _in-memory_ SQLite3 database to store the data. Such mode is necessary to run integration tests provided with _Money Saver_ application.

## The parts of application

### Frontend (client side)

* [**Angular.js**](https://angularjs.org/) (1.x.x) and [**Bootstrap**](https://getbootstrap.com/) to make **UI**.
* [**chart.js**](https://www.chartjs.org/) to make beautifull charts.
* [**Bower**](https://bower.io/) dependency management.
* [**Grunt**](https://gruntjs.com/) to perform some routine actions, like _version management_ or _frontend files minification_.

Frontend files located under the following path: `money-saver/Source/ui`.

### Backend (server side)

* [**Node.js**](https://nodejs.org/en/) to run everything.
* [**Express**](http://expressjs.com/) to make web application on top of Node.js
* [**Memcached**](https://memcached.org/) mainly used for session storage.
* [**Passport**](http://www.passportjs.org/) authentication management.
* [**log4js**](https://www.npmjs.com/package/log4js) logging framework.

#### Backend structure

```
                     Backend application
                     +------------------------------------+    finance.db
+--------+  REST API |  +-----+      +----+      +-----+  |    +----+
| Client | ----------|->| API | <--> | BL | <--> | DAL |<-|--->| DB |
+--------+           |  +-----+      +----+      +-----+  |    +----+
     |               |                                    |
     |               |  +--------------+                  |
     +---------------|->| Static files |                  |
                     |  +--------------+                  |
                     +------------------------------------+    
```

* **API** layer modules, like `intervals` or `payments` process REST API requests, calls BL and makes responses.
    * Some pre-process and validation functions is moved to [Express middleware](http://expressjs.com/en/guide/writing-middleware.html).
* **BL** (_Business Logic_) layer has processing and calculations functions and make calls to DAL.
* **DAL** (_Data Access Layer_) perform database requests.

#### Modules

Each layer is organized in tree-like structure:  

```
                       +--- ( get-interval-by-id )
                       |
     +---- intervals---+--- ( get-latest-interval )
    /                  |
 api------ payments    +--- ( get-intervals )
    \
     +---- properties
```

The same is for BL and DAL:

```
                       +--- ( get-by-id )
                       |
     +---- intervals---+--- ( get-latest )
    /                  |
  bl------ payments    +--- ( get-all )
    \
     +---- properties
```

So, typically, any API module (like `get-interval-by-id`) may call any BL function like this:

```js
const bl = require('../../bl');

bl.intervals.getById(id, success, fail);
``` 

* In the future [async / await](https://javascript.info/async-await) approach will be applied here.  

### Database

At the moment (_2018-07-17_) no database server is required and no database server can be used by application. To store and manage the data it uses the [**SQLite3**](https://www.sqlite.org/index.html) engine.

It's database is located within `finance.db` file. It can be observerd by [SQLite CLI](https://www.sqlite.org/cli.html) application, [SQLite Studio](https://sqlitestudio.pl/index.rvt) or any modern IDE ([wiki](https://en.wikipedia.org/wiki/Integrated_development_environment)), by using appropriate plugins.

## REST API reference

REST API reference is available [here](./rest-api.md)

## Unit Tests

You may launch unit tests by running the following command:

```bash
npm test
```

### Used frameworks

0. [**Mocha**](https://mochajs.org/) - test framework.
    * [mocha-junit-reporter](https://www.npmjs.com/package/mocha-junit-reporter) - to make reports in JUnit style.
0. [**Chai**](http://www.chaijs.com/) - BDD / TDD assertion library.
    * [chai-as-promised](https://github.com/domenic/chai-as-promised) - supports assertion for Promises.
0. [**sinon**](http://sinonjs.org/) - makes standalone test spies, stubs and mocks. 
0. [**proxyquire**](https://github.com/thlorenz/proxyquire) - dependency injection for modules under testing. 

### proxyquire

Some modules, like `db` (in `Source/dal/db`) makes some action in the moment, when they are called by `require(...)` at the first time (it might be system startup, for example).

To avoid such behaviour during testing, use [**noCallThru**](https://github.com/thlorenz/proxyquire#preventing-call-thru-to-original-dependency) option of `proxyquire`.

## Integration Tests

You may launch Integration tests by running the next command:

```bash
npm run integration
```

It will run the whole application in testing mode. Tests will call the different REST API endpoints of application with differnet arguments.

## Grunt tasks

1. **build** (default) - concat and minify UI source files (JS);
    
    **--local** - build the minified version of app for running on local machine;
    
    **--testable** - for testing purposes on local machine;
    
    **--cloud** - for running in the cloud (see _config.prod.json_);
    
    By default (without any params) Grunt will build the minified version for cloud usage;
    
2. **clean:cleanup** - to remove downloaded libs, modules and _log_ files;

## License

You have a right to fork it, study it, change it, share it, blame it and use it if you're brave enough.
