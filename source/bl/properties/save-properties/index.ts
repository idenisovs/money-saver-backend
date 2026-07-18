import argon2 from 'argon2';
import validatePassword from './validate-password';
import dal from '../../../dal';
import { Properties, User } from '../../../shared';

export async function saveProperties(properties: Properties, user: User): Promise<void> {
	const { password } = properties;

	validatePassword(password);

	password.hash = await argon2.hash(password.primary);

	await dal.properties.save(properties, user);
}
