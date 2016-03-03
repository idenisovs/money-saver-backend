#!/bin/bash

cd Source

node daemon.js -p 9002 > /dev/null &

cd ..

echo $! > daemon.pid
