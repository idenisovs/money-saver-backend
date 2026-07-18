#!/usr/bin/env node

const bcrypt = require('bcrypt');
const { parseArgs } = require('node:util');

const usage = 'Usage: make-password [password] - This script helps to generate the bcrypted hash of given password.';

const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
        verbose: { type: 'boolean', short: 'v', default: false },
        rounds: { type: 'string', short: 'r', default: '3' }
    }
});

const password = positionals[0];

if (!password) {
    console.error(usage);
    process.exit(1);
}

const rounds = Number(values.rounds);

if (!Number.isInteger(rounds) || rounds < 1) {
    console.error(`Invalid rounds value: "${values.rounds}". Expected a positive integer.`);
    process.exit(1);
}

if (values.verbose) {
    console.log(`Hashing "${password}" with ${rounds} number of rounds!\n`);
}

bcrypt.hash(password.toString(), rounds, (err, hash) => {
    if (err) {
        console.error(err);
        process.exit(1);
    } else {
        console.log(hash);
    }
});
