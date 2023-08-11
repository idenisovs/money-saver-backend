import bcrypt from 'bcrypt';
import validatePassword from './validate-password';
import dal from '../../../dal';
import { Properties, User } from '../../../shared';

const SALT_ROUNDS = 3;

export async function saveProperties(properties: Properties, user: User): Promise<void> {
	const { password } = properties;

	validatePassword(password);

	password.hash = await bcrypt.hash(password.primary, SALT_ROUNDS);

	await dal.properties.save(properties, user);
}
