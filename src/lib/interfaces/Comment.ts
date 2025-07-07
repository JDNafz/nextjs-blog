
export interface Comment {
	id: number;
	authorId: number;
	postId: number;
	content: string;
	createdAt: string;
	// Add other comment properties as needed
}

export interface CommentFromDb {
	id: number;
	user_id: number; 
	post_id: number; 
	content: string;
	created_at: string; 
	author: string; 
}