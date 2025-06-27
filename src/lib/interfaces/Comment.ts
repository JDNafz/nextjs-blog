export interface BlogComment {
	id: string,
	slug: string,
	userId?: string,
	content: string,
	timestamp: string, //Date ISO string
}