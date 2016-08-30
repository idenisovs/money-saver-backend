# Money Saver
This is a repository of a little financial web application named _Money Saver_.

## Getting Started
To launch the application simply run:
```
npm install
npm start
```
From now, web application should be accessible by passing the following link: [http://localhost:9001] (http://localhost:9001)

Default user login is **demo1** with password **test1**.

In the case if default listening port (_9001_) is already taken by another application, it can be set in _Source/config.json_ file.

## The reason of project
Because I needed of an application, which will help me to manage my cash. As also, I wanted to learn new skills and get some more experience with building web applications by using Node.js.

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