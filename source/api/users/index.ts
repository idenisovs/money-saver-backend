import { Router } from 'express';

import getActiveUsersCount from './get-active-count';

const users = Router();

users.get('/active', getActiveUsersCount);

export default users;