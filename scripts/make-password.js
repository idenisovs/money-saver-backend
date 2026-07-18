#!/usr/bin/env node

const argon2 = require('argon2');
const { parseArgs } = require('node:util');

const usage = 'Usage: make-password [password] - This script helps to generate the Argon2 hash of given password.';

const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
        verbose: { type: 'boolean', short: 'v', default: false }
    }
});

const password = positionals[0];

if (!password) {
    console.error(usage);
    process.exit(1);
}

if (values.verbose) {
    console.log(`Hashing "${password}" with Argon2...\n`);
}

argon2.hash(password.toString())
    .then((hash) => console.log(hash))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
