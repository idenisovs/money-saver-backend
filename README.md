# Money Saver

This repository contains the source code and supporting materials for the backend of **Money Saver**, an open-source expense tracking application.

## Prerequisites

- [Node.js and NPM](https://nodejs.org/en)
- [Memcached](https://memcached.org/) *(optional)*

## Setup

1. Run `npm run setup`
2. Navigate to `target` directory and set the values within `.env` file:
   - `PORT` — e.g. `9001`;
   - `DATABASE` — path to the **SQLite3** database file, e.g. `/var/databases/finance.db`
   - `LOGGING` — one of the log levels supported by [log4js](https://github.com/log4js-node/log4js-node), such as `INFO`, `DEBUG`, or `TRACE`
   - `MEMCACHED` — set to `true` if you want to store the user sessions in **Memcached**.

That is a minimal set to run.

## Run

Start the backend server with:

```bash
npm run start
```

By default, the server will run on the port specified in your `.env` file (e.g. http://localhost:9001).

## Frontend

To use **Money Saver** with a graphical interface, run the [Money Saver Frontend](https://github.com/idenisovs/money-saver-frontend) project.

## Configuration

The backend is configured through the `.env` file. The `.env` file should be placed in same directory where the `daemon.js` file lives, typically, it is the `target/` directory. For example see the [.env.example](.env.example) file.

The `.env` file supports following options:

- `TZ` — timezone for the application, e.g. `UTC`
- `PORT` — port the server listens on, e.g. `9001`
- `DATABASE` — path to the **SQLite3** database file, e.g. `/var/databases/finance.db`
- `LOGGING` — one of the log levels supported by [log4js](https://github.com/log4js-node/log4js-node), such as `INFO`, `DEBUG`, or `TRACE`
- `MEMCACHED` — set to `true` to enable **Memcached** support in Money Saver. It is allowing to store user sessions between reboots of **daemon**
- `MEMCACHED_KEY` — secret key for **Memcached** session storage
- `SESSION_KEY` — secret key for user session storage

## Command Line Options

Some options can additionally be passed through the command line. A command line option, when passed, **overrides** the corresponding value from the `.env` file. This is intended mostly for development purposes.

The following options are available:

- `--port`, `-p` — port the server listens on (overrides `PORT`)
- `--database`, `-b` — path to the **SQLite3** database file (overrides `DATABASE`)
- `--memcached`, `-m` — enable **Memcached** support (overrides `MEMCACHED`)
- `--verbose`, `-v` — run in verbose mode, sets the log level to `INFO`
- `--debug`, `-d` — set the log level to `DEBUG`
- `--trace`, `-t` — set the log level to `TRACE`, extra verbosity level
- `--testable` — run the daemon in testable mode

For example:

```bash
npm run start -- --port 9005 --debug
```