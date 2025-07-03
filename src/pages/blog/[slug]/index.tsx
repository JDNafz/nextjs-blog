import { Post } from "@/lib/interfaces/PostInterface";
import { GetStaticPaths, GetStaticProps } from "next";
import Comment from "./comment";
import { getAllPosts, getPostBySlug } from "@/lib/repositories/postRepository";
import Nav from "@/pages/_components/

interface BlogPostProps {
  post: Post;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
};

// do I need async ({ params } : { params: { slug: string }}) >
export const getStaticProps: GetStaticProps<BlogPostProps> = async ({ params }) => {
  const slug = params?.slug as string;

  const res = await getPostBySlug(slug);
  const post = await res;
  return {
    props: { post },
    revalidate: 60,
  };
};

const BlogPost = ({ post }: BlogPostProps) => {
  return (
    <div>
      <h1>Slug Page</h1>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <ul className="comments-list">
        <Comment postId={post.id} />
      </ul>
			<Nav />
    </div>
  );
};
export default BlogPost;
