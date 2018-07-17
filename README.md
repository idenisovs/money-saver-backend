# Money Saver
This is a repository of a little financial web application named _Money Saver_.

## Getting Started
To launch the application for first time simply run:
```bash
npm run setup
npm start
```
From now, web application should be accessible by passing the following link: [http://localhost:9001](http://localhost:9001)

Default user login is **user1** with password **demo1**.

In the case if default listening port (_9001_) is already taken by another application, it can be set in _Source/config.json_ file.

## The reason of project
Because I needed of an application which would help me to manage my expenses. As also, I wanted to learn new skills and get some more experience with building web applications by using Node.js.

## Parts of web application
Web application consist from **REST API** part (written with Node.js and Express.js) and **SPA** (generally written with AngularJS and Bootstrap UI). User and application data is stored by using SQLite3.

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
**TBD**
