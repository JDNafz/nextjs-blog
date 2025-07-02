import { User } from "../interfaces/User";
import { query } from "./pgHelper";


// GET USERS
export const getUsersWithPasswords = async (): Promise<Omit<User, "password">[]> => {
	const { rows } = await query<User>('SELECT * FROM users');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	return rows.map(({ password, ...safeUser }) => safeUser);
}

// GET USERS - No passwords
export const getAllUsers = async (): Promise<Omit<User, "password">[]> => {
	const { rows } = await query<User>('SELECT * FROM users');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	return rows.map(({ password, ...safeUser }) => safeUser);
}

// Get USER by Id
export const getUserById = async (id: number): Promise<User> => {
	const { rows } = await query<User>('SELECT * FROM users WHERE id = $1', [id]);
	return rows[0];
}

// GET USER by Email
export const getUserByEmail = async (email: string): Promise<User | null> => {
	const { rows } = await query<User>(
		`SELECT * FROM users WHERE email = $1`,
		[email]
	);

	return rows[0] ?? null;
}

// Post USER
export const createUser = async (newUser: Omit<User, "id">): Promise<User | null> => {
	const name = newUser.name;
	const email = newUser.email;
	const password = newUser.password;
	const { rows } = await query<User>(`INSERT INTO users (name,   	email, password)
    VALUES ($1, $2, $3)
    RETURNING *`,
		[name, email, password]

	)
	return rows[0];
}