import { getAllPosts } from "@/lib/repositories/postRepository";
import { Post } from "@/lib/interfaces/PostInterface";

import Link from "next/link";
import Nav from "../_components/Nav";
// import { posts } from "./static-exports";

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}

export default function BlogPage({ posts }: { posts: Post[] }) {
  return (
    <>
      <section className="blog">
        <Link href="/">← Back to Home</Link>
				<Link href="/blog/create">Create a new Post</Link>
        <h1> Blog Posts </h1>
        <ul className="post-list">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <h3>{post.title}</h3>
            </Link>
          ))}
        </ul>
      </section>

      <Nav />
    </>
  );
}
