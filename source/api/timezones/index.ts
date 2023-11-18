import { Router } from 'express';

import getAll from './get-all';
import getById from './get-by-id';

const timezones = Router();

timezones.get('/', getAll);
timezones.get('/:timezoneId(*)', getById)

export default timezones;
