#!/bin/bash

MINOR=1000
node -e "process.stdout.write(require('../package.json').version);" > version
echo -n .$MINOR >> version
