import dal from '../../dal';
import { User } from '../../shared';

export function getUserById(id: number): Promise<User> {
    return dal.users.getById(id);
}