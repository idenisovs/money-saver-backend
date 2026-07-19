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
