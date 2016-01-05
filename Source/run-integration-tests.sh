#!/bin/bash


MOCHA_BIN=./node_modules/mocha/bin/mocha

./$MOCHA_BIN -c -r chai -R spec --recursive "tests/integration/**/*.test.js"
