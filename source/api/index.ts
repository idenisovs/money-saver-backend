import { Router } from 'express';
import log4js from 'log4js';

import intervals from './intervals';
import payments from './payments';
import authApi from './auth';
import health from './health';
import version from './version';
import users from './users';
import properties from './properties';
import timezones from './timezones';
import auth from '../support/middleware/auth-middleware';

const log = log4js.getLogger('api');

const api = Router();

api.use('/payments', auth, payments);
api.use('/intervals', auth, intervals);
api.use('/auth', authApi);
api.use('/health', health);
api.use('/version', version);
api.use('/summary', auth, require('./summary'));
api.use('/properties', auth, properties);
api.use('/timezones', timezones);
api.use('/users', users);

log.debug('API module is up!');

export default api;

