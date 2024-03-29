#!/bin/bash

cd Source

STANDALONE=false

if [[ $1 == "-s" ]]; then
	echo Running in standalone mode!
	STANDALONE=true
fi

REPORTER=spec

if [[ $2 == "--junit" ]]; then
    echo Reporting to test-results.xml file!
    REPORTER=mocha-junit-reporter
    export MOCHA_FILE="../test-results.xml"
fi

if [[ $STANDALONE == "true" ]]; then

    if [[ -e ../daemon.log ]]; then
        rm -f ../daemon.log
    fi

	node daemon.js -d --testable &
	TESTABLE_NODE_PID=$!
    
    while sleep 1s
    do
        LAUNCHED=$(cat ../daemon.log | grep 'daemon started' -i)
        [[ -z $LAUNCHED ]] || break
    done

	echo Daemon launched with PID: $TESTABLE_NODE_PID
else
	echo "Running on already launched daemon!"
fi


MOCHA_BIN=../node_modules/mocha/bin/mocha

./$MOCHA_BIN -c -r chai -R $REPORTER --recursive "tests/integration/**/*.test.js" --timeout 5000 

if [[ $STANDALONE == "true" ]]; then
	kill -9 $TESTABLE_NODE_PID
fi

cd ..
