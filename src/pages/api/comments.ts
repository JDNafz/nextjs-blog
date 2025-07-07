
import { Comment, CommentFromDb } from "@/lib/interfaces/Comment";
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

const formatCommentsFromDb = (dbComments: CommentFromDb[]): Comment[] => {
	return dbComments.map((comment) => {
		const { user_id: authorId, post_id: postId, created_at: createdAt, ...rest } = comment;
		return {
			...rest,
			authorId,
			postId,
			createdAt
		}
	})
}

// const getComments = async (query: Partial<{
//     [key: string]: string | string[];}>) => {
// 	try {
// 		const { post_id } = query;
// 		if (typeof post_id === 'string') { // narrowing query format
// 			const postId = parseInt(post_id);

// 			const dbComments = await getCommentsByPostId(postId);
// 			const comments = formatCommentsFromDb(dbComments);
// 			return comments
// 			res.status(200).json({ data: comments });
// 		} else {
// 			res.status(400).json({ error: 'query error in /api/comments' })
// 		}
// 	} catch (error) {
// 		console.error('Error fetching comments:', error);
// 		res.status(500).json({ error: 'Failed to fetch comments' });
// 	}
// }


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
				const dbComment = await createComment(newComment);
				const [comment] = formatCommentsFromDb([dbComment])
				console.log("/api/comments --> 'POST' This is the comment returned from the DB:\n", comment, "\n")
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