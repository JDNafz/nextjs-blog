export interface Post {
	id: number;
	title: string;
	body: string;
	slug: string;
	authorId?: number;
}