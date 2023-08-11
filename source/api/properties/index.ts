import { Router } from 'express';
import getProperties from './get-properties';
import saveProperties from './save-properties';

const properties = Router();

properties.get('/', getProperties);

properties.put('/', saveProperties);

export default properties;
