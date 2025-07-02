
import { Post } from "../interfaces/PostInterface";
import { query } from "./pgHelper";



// GET BlogPost
export const getAllPosts = async (): Promise<Omit<Post, "password">[]> => {
	const { rows } = await query<Post>('SELECT * FROM blog_posts');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	return rows
}

// Get BlogPost by Slug
export const getPostBySlug = async (slug: string): Promise<Post> => {
	const { rows } = await query<Post>('SELECT * FROM Posts WHERE slug = $1', [slug]);
	return rows[0];
}


// GET Post by Email
export const getPostByUserId = async (id: number): Promise<Post | null> => {
	const { rows } = await query<Post>(
		`SELECT * FROM blog_posts WHERE author_id = $1`,
		[id]
	);

	return rows[0] ?? null;
}

// Post BlogPost
export const createPost = async (newPost: Omit<Post, "id">): Promise<Post | null> => {
	const title = newPost.title;
	const slug = newPost.slug;
	const authorId = newPost.authorId;
	const { rows } = await query<Post>(`INSERT INTO users (title, slug, author_id)
		VALUES ($1, $2, $3)
		RETURNING *`,
		[title, slug, authorId]

	)
	return rows[0];
}