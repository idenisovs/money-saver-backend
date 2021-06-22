import { Router } from 'express';
import getAll from './get-by-id';
import getById from './get-by-id';

const timezones = Router();

timezones.get('/', getAll);

timezones.get('/:id', getById);

export default timezones;