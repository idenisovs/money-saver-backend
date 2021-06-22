import dal from '../../dal';
import { Properties, User } from '../../shared';

export function getProperties(user: User): Promise<Properties> {
    return dal.properties.get(user);
}