import { Router } from 'express';
import log4js from 'log4js';

import auth from '../support/middleware/auth-middleware';
import intervals from './intervals';

const log = log4js.getLogger('api');

const api = Router();

api.use('/payments', auth, require('./payments'));

api.use('/intervals', auth, intervals);

api.use('/auth', require('./auth'));

api.use('/health', require('./health'));

api.use('/version', require('./version'));

api.use('/summary', auth, require('./summary'));

api.use('/properties', auth, require('./properties'));

api.use('/timezones', require('./timezones'));

api.use('/users', require('./users'));

log.debug('API module is up!');

export default api;

