
import type { NextApiRequest, NextApiResponse } from "next";
import { Post } from "@/lib/interfaces/PostInterface";
import { createPost, getAllPosts, getPostBySlug } from "@/lib/repositories/postRepository";

type Data = {
	posts?: Post[];
	message?: string;
	error?: string;
	post?: Post
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	const { method } = req;

	switch (method) {
		case 'GET':
			// call fetch('/api/posts?var1=value'); in client component
			try {
				//Get Post by Slug
				const { slug } = req.query
				if (typeof slug === 'string') {
					const post = await getPostBySlug(slug);
					res.status(200).json({ post })
					break;
				} else {
					res.status(400).json({ error: 'Invalid slug' })
					break;
				}
				// Return all posts
				const response = await getAllPosts();
				const posts = await response;
				res.status(200).json({ posts });
			} catch (err) {
				res.status(500).json({ error: `Failed to fetch posts ${err}` });
			}
			break;
		case 'POST':
			try {

				// Validate required fields
				const newPost: Omit<Post, "id"> = req.body;
				const response = await createPost(newPost)
				if (!response) {
					throw new Error("Failure making post");
				}
				res.status(201).json({ posts: [response] })
			} catch (err) {
				res.status(501).json({ error: "Failure making post" + err });
				break;

			}



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