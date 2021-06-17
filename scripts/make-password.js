#!/usr/bin/env node

const bcrypt = require('bcrypt');
const yargs = require('yargs');

const argv = yargs
    .demandCommand(1)
    .usage('Usage: $0 [password] - This script helps to generate the bcrypted hash of given password.')
    .options({
        verbose: { alias: 'v', type: 'boolean', default: false },
        rounds: { alias: 'r', type: 'number', default: 3 }
    })
    .argv;

const rounds = argv['rounds'];
const password = argv._[0];
const verbose = argv['verbose'];

if (verbose) {
    console.log(`Hashing "${password}" with ${rounds} number of rounds!\n`);
}

bcrypt.hash(password.toString(), rounds, (err, hash) => {
    if (err) {
        console.error(err);
    } else {
        console.log(hash);
    }
});

