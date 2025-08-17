# Money Saver

This repository contains the source code and supporting materials for the backend of **Money Saver**, an open-source expense tracking application.

## Prerequisites

- [Node.js and NPM](https://nodejs.org/en)
- [Memcached](https://memcached.org/) *(optional)*

## Setup

1. Run `npm run setup`
2. Navigate to `target` directory and set the values within `.env` file:
   - `PORT` — e.g. `9001`;
   - `DATABASE` — path to the SQLite3 database file, e.g. finance.db
   - `LOGLEVEL` — one of the log levels supported by [log4js](https://github.com/log4js-node/log4js-node), such as `INFO`, `DEBUG`, or `TRACE`
   - `MEMCACHED` — set to `true` to enable Memcached support (used for storing user sessions)

## Run

Start the backend server with:

```bash
npm run start
```

By default, the server will run on the port specified in your `.env` file (e.g. http://localhost:9001).

## Frontend

The backend itself does not serve a frontend application.  

If you open the backend URL in a browser (e.g. `http://localhost:9001`), you may see an error like:

```
Error: ENOENT: no such file or directory, stat '/home/ga5xz2/Projects/money-saver/backend/target/web/index.html' 
```

This is expected — the backend only provides APIs.

To use **Money Saver** with a graphical interface, run the [Money Saver Frontend](https://github.com/idenisovs/money-saver-frontend) project separately and configure it to connect to this backend.
