
import type { NextApiRequest, NextApiResponse } from "next";
import { Post } from "@/lib/interfaces/PostInterface";

type Data = {
	posts?: Post[];
	message?: string;
	error?: string;
};


const API_URL = "http://localhost:5000";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	const { method } = req;

	switch (method) {
		case 'GET':
			// call fetch('/api/posts?var1=value'); in client component
			// const { var1, var2, var3 } = req.query
			// if (var1) {
			// 	const response = await 
			// }
			try {
				// Return all posts
				const response = await fetch(`${API_URL}/posts`);
				const posts = await response.json();
				res.status(200).json({ posts });
			} catch (err) {
				res.status(500).json({ error: `Failed to fetch posts ${err}` });
			}
			break;

		case 'POST':
			// TODO: Handle creating a new post
			// const { title, slug, body } = req.body;
			// Validate required fields
			// Add new post to data source
			// Return created post
			res.status(501).json({ error: 'POST method not implemented yet' });
			break;

		case 'PUT':
			// TODO: Handle updating an existing post
			// const { id } = req.query;
			// const { title, slug, body } = req.body;
			// Find and update post
			// Return updated post
			res.status(501).json({ error: 'PUT method not implemented yet' });
			break;

		case 'DELETE':
			// TODO: Handle deleting a post
			// const { id } = req.query;
			// Find and remove post from data source
			// Return success message
			res.status(501).json({ error: 'DELETE method not implemented yet' });
			break;

		default:
			res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
			res.status(405).json({ error: `Method ${method} not allowed` });
			break;
	}
}