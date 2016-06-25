#!/bin/bash

cd Source

STANDALONE=false

if [[ $1 == "-s" ]]; then
	echo Running in standalone mode!
	STANDALONE=true
fi

if [[ $STANDALONE == "true" ]]; then
	node daemon.js --testable &
	TESTABLE_NODE_PID=$!
	echo Daemon launched with PID: $TESTABLE_NODE_PID
else
	echo "Running on already launched daemon!"
fi

MOCHA_BIN=../node_modules/mocha/bin/mocha

./$MOCHA_BIN -c -r chai -R spec --recursive "tests/integration/**/*.test.js" --timeout 5000

if [[ $STANDALONE == "true" ]]; then
	kill -9 $TESTABLE_NODE_PID
fi

cd ..
