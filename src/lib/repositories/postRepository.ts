
import { Post } from "../interfaces/PostInterface";
import { query } from "./pgHelper";



// GET BlogPost
export const getAllPosts = async (): Promise<Omit<Post, "password">[]> => {
	const { rows } = await query<Post>('SELECT * FROM post');
	return rows
}

// Get BlogPost by Slug
export const getPostBySlug = async (slug: string): Promise<Post> => {
	const { rows } = await query<Post>('SELECT * FROM post WHERE slug = $1', [slug]);
	return rows[0];
}


// GET Post by Email
export const getPostByUserId = async (id: number): Promise<Post | null> => {
	const { rows } = await query<Post>(
		`SELECT * FROM post WHERE author_id = $1`,
		[id]
	);

	return rows[0] ?? null;
}

// Post BlogPost
export const createPost = async (newPost: Omit<Post, "id">): Promise<Post | null> => {
	const { title, slug, body, authorId } = newPost;
	console.log("QUERY INSERT into:", newPost);
	const { rows } = await query<Post>(`INSERT INTO post (title, slug, body, author_id)
		VALUES ($1, $2, $3, $4)
		RETURNING *`,
		[title, slug, body, authorId]

	)
	return rows[0];
}