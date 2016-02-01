#!/bin/bash

cd Source

node daemon.js -b testable.db &

TESTABLE_NODE_PID=$!

MOCHA_BIN=../node_modules/mocha/bin/mocha

./$MOCHA_BIN -c -r chai -R spec --recursive "tests/integration/**/*.test.js"

kill -9 $TESTABLE_NODE_PID

cd ..