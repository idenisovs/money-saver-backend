import { Router } from 'express';
import passport from 'passport';
import checkAuth from '../../support/middleware/auth-middleware';

import getUserAuth from './get-user-auth';
import completeAuthentication from './complete';
import logout from './logout';

const authenticate = passport.authenticate('local');

const auth = Router();

auth.get('/', getUserAuth);
auth.post('/', authenticate, completeAuthentication);
auth.get('/logout', checkAuth, logout);

export default auth;

