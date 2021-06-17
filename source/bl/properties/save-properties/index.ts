import bcrypt from 'bcrypt'
import log4js from 'log4js';
import dal from '../../../dal';
import validatePassword from './validate-password';
import Properties from './properties';
import { User } from '../../../shared';

const log = log4js.getLogger('properties');

type PropertiesRequest = {
    user: User;
    properties: Properties;
}

function saveProperties(request: PropertiesRequest, success: Function, error: Function) {
    log.trace(request);

    const password = request.properties.password;

    if (password) {
        const validator = validatePassword(password, updateHash, error);
        bcrypt.compare(password.current, request.user.password!, validator);
        return;
    }

    updateHash(undefined, request.user.password!);

    function updateHash(err: Error|undefined, hash: string) {
        if (err) {
            return error(err);
        }

        request.properties.password.hash = hash;

        dal.properties.save(request, done);
    }

    function done(err: Error) {
        if (err) {
            return error(err);
        }

        success(request.properties);
    }
}

module.exports = saveProperties;