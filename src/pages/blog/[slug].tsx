import Article from "@/components/Article";
import { posts } from "./static-exports";

export async function generateStaticParams() {
  //fetch slugs from datasource:

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostThing({ params }: { params: { slug: string } }) {
  // const post = posts[params.slug as keyof typeof posts];
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div>
        <h1>Slug Page</h1>
        <h2>Post not found!</h2>
        <p>the slug comes through the</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Slug Page</h1>
      <Article post={post} />
    </div>
  );
}
