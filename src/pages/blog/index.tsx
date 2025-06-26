// Dummy imports
// import { getPosts } from '@/lib/posts'
// import { Post } from '@/ui/post'

import Article from "@/components/Article";
import Link from "next/link";
import { posts } from "./static-exports";

export default function BlogPage() {
  // const posts = await getPosts()

  return (
    <>
      <section className="blog">
        <Link href="/blog">← Back to All Posts</Link>
        <h1> This is the Blog Page </h1>
        <ul>
          {posts.map((post) => (
						<Link key={post.id} href={`/blog/${post.slug}`}>
              <h3>{post.title}</h3>
            </Link>
          ))}
          <li>
            <Link href={`/blog/manual-slug`}>
              <h3>My Manual Slug Post</h3>
            </Link>
            <p> description....</p>
          </li>
        </ul>
      </section>
      <nav>
        <Link href="/about">Go to About Page</Link> |{" "}
        <Link href="/contact">Go to Contact Page</Link> | <Link href="/blog"> Go to Blog Page</Link>
      </nav>
    </>
  );
}
