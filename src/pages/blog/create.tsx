import Link from "next/link";

export default function CreatePost() {
  // const posts = await getPosts()
	
  return (
    <>
      <section className="blog">
        <Link href="/">← Back to Home</Link>
        
      </section>
      <nav>
        <Link href="/">Home</Link> | <Link href="/about">Go to About Page</Link> |{" "}
        <Link href="/contact">Go to Contact Page</Link>
      </nav>
    </>
  );
}