
import { Comment } from "@/lib/interfaces/Comment";
import { createComment, getCommentsByPostId } from "@/lib/repositories/commentsRepository";
import type { NextApiRequest, NextApiResponse } from "next";


type CommentResponse = {
	data?: Comment
	message?: string;
	error?: string;
};
type CommentListResponse = {
	data?: Comment[]
	message?: string;
	error?: string;
};



export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<CommentResponse | CommentListResponse>,
) {
	const { method, query } = req;

	switch (method) {
		case 'GET':
			try {
				const { post_id } = query;
				if (typeof post_id === 'string') {
					const postId = parseInt(post_id);
					const comments = await getCommentsByPostId(postId);
					res.status(200).json({ data: comments });
				} else {
					res.status(400).json({ error: 'query error in /api/comments' })
				}
			} catch (error) {
				console.error('Error fetching comments:', error);
				res.status(500).json({ error: 'Failed to fetch comments' });
			}
			break;

		case 'POST':
			try {
				const newComment = req.body;
				console.log(newComment.authorId)
				const comment = await createComment(newComment);
				// console.log("This one", comment, "\n")
				res.status(200).json({ data: comment })
				break;
			} catch (err) {

				res.status(400).json({ error: 'Failed to post comment, Error:' + err });
				break;
			}

		default:
			console.error("Ya hit the DEFAULT CASE");
			res.setHeader('Allow', ['GET', 'POST']);
			res.status(405).json({ error: `Method ${method} not allowed` });
			break;
		// fetch (api/comment, {method: 'PATCH'}) ---> Method PATCH not allowed
	}
}