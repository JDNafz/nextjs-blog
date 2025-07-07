
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

const GETComments = async (
	req: NextApiRequest,
	res: NextApiResponse<CommentResponse | CommentListResponse>
) => {
	try {
		const { post_id } = req.query;
		if (typeof post_id === 'string') { // narrowing query format
			const postId = parseInt(post_id);

			const dbComments = await getCommentsByPostId(postId);
			const unOrderedComments = formatCommentsFromDb(dbComments);
			const comments = unOrderedComments.sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
			res.status(200).json({ data: comments });
		} else {
			res.status(400).json({ error: 'query error in /api/comments' })
		}
	} catch (error) {
		console.error('Error fetching comments:', error);
		res.status(500).json({ error: 'Failed to fetch comments' });
	}
}

const POSTcomment = async (
	req: NextApiRequest,
	res: NextApiResponse<CommentResponse | CommentListResponse>
) => {
	try {
		const newComment = req.body;
		console.log(newComment.authorId)
		const dbComment = await createComment(newComment);
		const [comment] = formatCommentsFromDb([dbComment])
		// console.log("/api/comments --> 'POST': success. Returning the comment: \n", comment, "\n")
		res.status(200).json({ data: comment })
	} catch (err) {
		res.status(400).json({ error: 'Failed to post comment, Error:' + err });
	}
}


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<CommentResponse | CommentListResponse>) {
	const { method } = req;

	switch (method) {
		case 'GET':
			await GETComments(req, res);
			break;

		case 'POST':
			await POSTcomment(req, res);
			break;

		default:
			// console.error("Ya hit the DEFAULT CASE");
			res.setHeader('Allow', ['GET', 'POST']);
			res.status(405).json({ error: `Method ${method} not allowed` });
			break;
		// fetch (api/comment, {method: 'PATCH'}) ---> Method PATCH not allowed
	}
}