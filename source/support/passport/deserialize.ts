import { User } from '../../shared';
import dal from '../../dal';

export default function deserialize(id: number, done: (err: any, user: any) => void) {
    dal.users.getById(id).then(success).catch(error);

    function success(user: User) {
        done(undefined, clean(user));
    }

    function error(err: Error) {
        done(err, null);
    }
}

function clean(user: User) {
    const result = Object.assign({}, user);

    delete result.password;

    return result;
}
