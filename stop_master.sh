#!/bin/bash

PID_FILE=daemon.pid

if [ -f $PID_FILE ]; then
    kill -15 $(cat $PID_FILE)

    rm -f $PID_FILE
fi
