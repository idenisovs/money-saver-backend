import dal from '../../dal';
import { User } from '../../shared';

export function getUserById(id: number, success: Function, error: Function) {
    dal.users.getById(id, done);

    function done(err: Error, user: User) {
        if (err) {
            return error(err);
        }

        success(user);
    }
}