import { Strategy as LocalStrategy } from 'passport-local';

import bl from '../../../bl';

export default new LocalStrategy(bl.auth.local);
