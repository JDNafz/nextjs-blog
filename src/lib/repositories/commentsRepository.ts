
import { Comment } from "../interfaces/Comment";
import { query } from "./pgHelper";



// GET Comments
export const getCommentsByPostId = async (postId: number): Promise<Comment[]> => {
	
	const { rows } = await query<Comment>(`
			SELECT 
				u.name as author,
				c.*
			FROM comment as c
				left join "user" as u on u.id = c.user_id
			WHERE c.post_id = $1;`, [postId]);
	return rows
}

// POST Comment
export const createComment = async (newComment: Omit<Comment, "id">): Promise<Comment> => {
	const {content, authorId, postId, createdAt } = newComment;
	console.log("\n ---- Values: ----- \n");
	console.log(newComment)
	const { rows } = await query<Comment>('INSERT INTO comments (content, user_id, post_id, created_at) VALUES($1, $2, $3, $4);',[content, authorId, postId, createdAt]);
	console.log("\n ------------rows: ---------------\n")
	console.log( rows);
	console.log("\n\n")
	return rows[0];
}

