export interface Post {
	id: string;
	title: string;
	body: string;
	slug: string;
	authorId?: number;
}