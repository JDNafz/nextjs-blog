import type { NextApiRequest, NextApiResponse } from "next";
import { createUser, getUserByEmail } from "@/lib/repositories/userRepository";
import { User } from "@/lib/interfaces/User";


type AuthResponse = {
	data?: Omit<User, "password">;
	message?: string;
	error?: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<AuthResponse>
) {
	const { method } = req;

	switch (method) {
		case "POST":
			const { action, email, password, name } = req.body;
			console.log("IN POST USER")
			console.log(req.body, action, email, password, name )
			if (!action) {
				return res.status(400).json({ error: "Action parameter is required" });
			}
			try {
				switch (action) {
					case "login":
						console.log("Logging in /api/users")
						const user = await getUserByEmail(email);
						if (!user) {
							return res.status(401).json({ error: "User not found" });
						}
						if (user.password !== password) {
							return res.status(401).json({ error: "Invalid password" });
						}
						return res.status(200).json({
							data: {
								id: user.id,
								name: user.name,
								email: user.email
							}
						});

					case "register":
						const userFound = await getUserByEmail(email);
						if (userFound) {
							return res.status(400).json({ error: "User with that email already exists" });
						}
						const newUser: Omit<User, "id"> = {
							email, password, name
						}
						const registeredUser = await createUser(newUser)
						if (!registeredUser) {
							res.status(500).json({ error: "DB Failed to create User" })
						} else {
							
							// eslint-disable-next-line @typescript-eslint/no-unused-vars
							const { password, ...safeUser } = registeredUser;
							return res.status(200).json({
								data: safeUser,
								message: "Registration successful"
							});
						}

					case "logout":
						// Logout would need to be implemented when Sessions are being used later
						return res.status(200).json({ message: "Logged out" });

					default:
						return res.status(400).json({ error: "Invalid action" });
				}
			} catch (error) {
				console.error("Error at /api/user :", error);
				return res.status(500).json({ error: "Authentication failed" });
			}

		default:
			res.setHeader("Allow", ["POST"]);
			return res.status(405).json({ error: `Method ${method} not allowed` });
	}
}