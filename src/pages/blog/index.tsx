// Dummy imports
// import { getPosts } from '@/lib/posts'
// import { Post } from '@/ui/post'

import Link from "next/link";

export default async function BlogPage() {
  // const posts = await getPosts()

  const posts = [
    {
      id: 1,
      slug: "first-post",
      title: "My First Blog Post",
      body: "This is a blog post",
    },
    {
      id: 2,
      slug: "second-post",
      title: "Another Blog Post",
      body: "This is a different Blog POSTTTTT",
    },
  ];

  return (
    <>
      <section className="blog">
        <Link href="/blog">← Back to All Posts</Link>
        <h1> This is the Blog Page </h1>
        <ul>
          {posts.map((post) => (
						<Article key={post.id} post={post} />
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
