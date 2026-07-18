function readEnvVar<T>(name: string, convertFn: (value: string) => T): T | undefined {
    const value = process.env[name];

    if (!value) {
        return undefined;
    }

    return convertFn(value);
}

const config = {
    SESSION_KEY: readEnvVar('SESSION_KEY', String),
    MEMCACHED_KEY: readEnvVar('MEMCACHED_KEY', String)
};

export default config;
