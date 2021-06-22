import { Router } from 'express';
import getHealth from './get-health';

const health = Router();

health.get('/', getHealth);

export default health;

