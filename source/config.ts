import argv from './support/argv';

type ConvertFn<T> = (value: string) => T;

function toBoolean(value: string): boolean {
    return value === 'true';
}

function readEnvVar<T>(name: string, convertFn: ConvertFn<T>): T | undefined {
    const value = process.env[name];

    if (!value) {
        return undefined;
    }

    return convertFn(value);
}

const config = {
    PORT: argv.port ?? readEnvVar('PORT', Number) ?? 9001,
    DATABASE: argv.database ?? readEnvVar('DATABASE', String),
    MEMCACHED: argv.memcached ?? readEnvVar('MEMCACHED', toBoolean) ?? false,
    TESTABLE: argv.testable ?? readEnvVar('DATABASE_MODE', toBoolean) ?? false,
    VERBOSE: argv.verbose ?? false,
    DEBUG: argv.debug ?? false,
    TRACE: argv.trace ?? false,
    LOGLEVEL: readEnvVar('LOGLEVEL', String),
    SESSION_KEY: readEnvVar('SESSION_KEY', String),
    MEMCACHED_KEY: readEnvVar('MEMCACHED_KEY', String),
};

export default config;
