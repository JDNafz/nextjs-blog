import Link from "next/link";
import { posts } from "./static-exports";

export default function BlogPage() {
  // const posts = await getPosts()
	
  return (
    <>
      <section className="blog">
        <Link href="/">← Back to Home</Link>
        <h1> This is the Blog Page </h1>
        <ul>
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <h3>{post.title}</h3>
            </Link>
          ))}
        </ul>
      </section>
      <nav>
        <Link href="/">Home</Link> | <Link href="/about">Go to About Page</Link> |{" "}
        <Link href="/contact">Go to Contact Page</Link>
      </nav>
    </>
  );
}