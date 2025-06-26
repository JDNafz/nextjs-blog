import { Post } from "@/lib/interfaces/PostInterface";

interface ArticleProps {
  post: Post;
}

const Article: React.FC<ArticleProps> = ({ post }) => {
  return (
    <article>
			<h1> THIS IS AN ARTICLE </h1>
      <h2>{post.title}</h2>

      <p>{post.body}</p>
    </article>
  );
};
export default Article;

{
  /* <Link href={`/blog/${post.slug}`}>
  <h3>{post.title} - BlogPageLinks</h3>
</Link>; */
}
