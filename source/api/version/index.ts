import { Router } from 'express';
import getVersion from './get-version';

const version = Router();

version.get('/', getVersion);

export default version;
