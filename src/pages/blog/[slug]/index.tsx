import { Post } from "@/lib/interfaces/PostInterface";
import { GetStaticPaths, GetStaticProps } from "next";

interface BlogPostProps {
  post: Post;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetch("http://localhost:5000/posts/").then((res) => res.json());
  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
};

// do I need async ({ params } : { params: { slug: string }}) >
export const getStaticProps: GetStaticProps<BlogPostProps> = async ({ params }) => {
  const slug = params?.slug as string;
  // http://localhost:5000/posts?slug=weekend-with-david json-server query

  const res = await fetch(`http://localhost:5000/posts?slug=${slug}`).then((res) => res.json());
  const post = await res[0];
  return {
    props: { post },
    revalidate: 60,
  };
};

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <div>
      <h1>Slug Page</h1>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
}
